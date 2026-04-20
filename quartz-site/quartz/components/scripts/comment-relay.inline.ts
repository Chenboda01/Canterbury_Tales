document.addEventListener("nav", () => {
  const container = document.querySelector(".comment-relay") as HTMLElement | null
  if (!container) return

  const port = container.dataset.relayPort ?? "3333"
  const hotkey = container.dataset.hotkey ?? "c"
  const overlay = container.querySelector(".comment-overlay") as HTMLElement
  const box = container.querySelector(".comment-box") as HTMLElement
  const input = container.querySelector(".comment-input") as HTMLTextAreaElement
  const sendBtn = container.querySelector(".comment-send") as HTMLButtonElement
  const closeBtn = container.querySelector(".comment-close") as HTMLButtonElement
  const statusEl = container.querySelector(".comment-status") as HTMLElement
  const pageLabel = container.querySelector(".comment-page-label") as HTMLElement

  let isOpen = false

  function getPageSlug(): string {
    // Get current page slug from URL or data attribute
    const path = window.location.pathname.replace(/\/$/, "").split("/").pop() || "index"
    return path
  }

  function open() {
    const slug = getPageSlug()
    pageLabel.textContent = slug
    overlay.classList.remove("hidden")
    input.value = ""
    input.focus()
    statusEl.textContent = ""
    isOpen = true
  }

  function close() {
    overlay.classList.add("hidden")
    isOpen = false
    input.value = ""
  }

  async function send() {
    const text = input.value.trim()
    if (!text) return

    const slug = getPageSlug()
    statusEl.textContent = "Sending..."
    sendBtn.disabled = true

    try {
      const res = await fetch(`http://localhost:${port}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: slug, comment: text }),
      })

      if (res.ok) {
        statusEl.textContent = "✅ Sent to OpenCode!"
        input.value = ""
        setTimeout(close, 800)
      } else {
        const err = await res.text()
        statusEl.textContent = `❌ ${err}`
      }
    } catch (e) {
      statusEl.textContent = "❌ Relay server not running. Start with ./start-wiki.sh"
    } finally {
      sendBtn.disabled = false
    }
  }

  // Hotkey listener — only when no input/textarea is focused
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    const active = document.activeElement
    const isTyping =
      active instanceof HTMLInputElement ||
      active instanceof HTMLTextAreaElement ||
      (active as HTMLElement)?.isContentEditable

    if (e.key === hotkey && !isTyping && !isOpen) {
      e.preventDefault()
      open()
    }
    if (e.key === "Escape" && isOpen) {
      e.preventDefault()
      close()
    }
  })

  // Enter to send (Shift+Enter for newline)
  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  })

  sendBtn.addEventListener("click", send)
  closeBtn.addEventListener("click", close)

  // Close on overlay background click
  overlay.addEventListener("click", (e: MouseEvent) => {
    if (e.target === overlay) close()
  })
})
