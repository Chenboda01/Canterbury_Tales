#!/usr/bin/env node
/**
 * Comment Relay Server
 * Receives comments from the Quartz wiki frontend and pipes them
 * into a dedicated tmux session running opencode.
 *
 * Usage:  node comment-relay-server.mjs [--port 3333] [--session ct-opencode]
 */

import http from "node:http"
import { execSync, exec } from "node:child_process"

const PORT = parseInt(process.argv.find((_, i, a) => a[i - 1] === "--port") ?? "3333")
const SESSION = process.argv.find((_, i, a) => a[i - 1] === "--session") ?? "ct-opencode"

function tmuxSendKeys(text) {
  // Escape single quotes for shell
  const escaped = text.replace(/'/g, "'\\''")
  // Send text to the tmux session's opencode pane
  try {
    execSync(`tmux send-keys -t ${SESSION} '${escaped}' Enter`, { stdio: "ignore" })
    return true
  } catch (e) {
    console.error(`[relay] tmux send-keys failed: ${e.message}`)
    return false
  }
}

function sessionExists() {
  try {
    execSync(`tmux has-session -t ${SESSION} 2>/dev/null`)
    return true
  } catch {
    return false
  }
}

const server = http.createServer((req, res) => {
  // CORS headers for local Quartz dev server
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    res.writeHead(204)
    return res.end()
  }

  if (req.method === "POST" && req.url === "/comment") {
    let body = ""
    req.on("data", (chunk) => (body += chunk))
    req.on("end", () => {
      try {
        const { page, comment } = JSON.parse(body)
        if (!comment?.trim()) {
          res.writeHead(400)
          return res.end("Empty comment")
        }

        if (!sessionExists()) {
          res.writeHead(503)
          return res.end(`tmux session '${SESSION}' not found. Run ./start-wiki.sh first.`)
        }

        // Format the message for opencode
        const msg = `[Wiki comment on ${page || "unknown"}] ${comment.trim()}`
        console.log(`[relay] ${new Date().toISOString()} → ${msg}`)

        if (tmuxSendKeys(msg)) {
          res.writeHead(200, { "Content-Type": "application/json" })
          res.end(JSON.stringify({ ok: true, page, preview: msg.slice(0, 80) }))
        } else {
          res.writeHead(500)
          res.end("Failed to send to tmux session")
        }
      } catch (e) {
        res.writeHead(400)
        res.end("Invalid JSON")
      }
    })
    return
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" })
    return res.end(JSON.stringify({
      ok: true,
      session: SESSION,
      sessionAlive: sessionExists(),
    }))
  }

  res.writeHead(404)
  res.end("Not found")
})

server.listen(PORT, () => {
  console.log(`[relay] Comment relay server listening on http://localhost:${PORT}`)
  console.log(`[relay] Target tmux session: ${SESSION}`)
  console.log(`[relay] Health check: http://localhost:${PORT}/health`)
})
