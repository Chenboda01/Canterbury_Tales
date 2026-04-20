#!/usr/bin/env bash
# start-wiki.sh — Launch Canterbury Tales wiki with comment→opencode relay
#
# Creates:
#   tmux session "ct-opencode"  — pane 0: opencode, pane 1: relay server
#   Quartz dev server at localhost:8080
#
# Usage:
#   ./start-wiki.sh          # start everything
#   ./start-wiki.sh --stop   # kill the session

set -euo pipefail
cd "$(dirname "$0")"

SESSION="ct-opencode"
RELAY_PORT=3333
QUARTZ_DIR="./quartz-site"

if [[ "${1:-}" == "--stop" ]]; then
  tmux kill-session -t "$SESSION" 2>/dev/null && echo "Stopped $SESSION" || echo "No session to stop"
  exit 0
fi

# Kill existing session if any
tmux kill-session -t "$SESSION" 2>/dev/null || true

echo "🏰 Starting Canterbury Tales Wiki System"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Create tmux session with opencode in the Canterbury_Tales dir
echo "[1/3] Creating tmux session '$SESSION' with opencode..."
tmux new-session -d -s "$SESSION" -c "$(pwd)" -n opencode
tmux send-keys -t "$SESSION:opencode" "opencode" Enter

# Create pane for relay server
echo "[2/3] Starting comment relay server on port $RELAY_PORT..."
tmux split-window -h -t "$SESSION:opencode" -c "$(pwd)"
tmux send-keys -t "$SESSION:opencode.1" "node comment-relay-server.mjs --port $RELAY_PORT --session $SESSION" Enter

# Create window for Quartz dev server
echo "[3/3] Starting Quartz dev server..."
tmux new-window -t "$SESSION" -n quartz -c "$(pwd)/$QUARTZ_DIR"
tmux send-keys -t "$SESSION:quartz" "npm run wiki:dev" Enter

# Select back to opencode pane
tmux select-window -t "$SESSION:opencode"
tmux select-pane -t "$SESSION:opencode.0"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All systems running!"
echo ""
echo "  🌐 Wiki:      http://localhost:8080"
echo "  💬 Press 'c' on any wiki page to comment"
echo "  🤖 OpenCode:  tmux attach -t $SESSION"
echo "  🔌 Relay:     http://localhost:$RELAY_PORT/health"
echo ""
echo "  To stop:      ./start-wiki.sh --stop"
echo "  To attach:    tmux attach -t $SESSION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
