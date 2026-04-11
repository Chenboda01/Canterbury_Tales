---
title: "AI Chatbot"
---

# AI Chatbot Assistant

**Topic-restricted AI assistant for The Canterbury Tales**

![Chatbot Logo](assets/scenes/scene-00.jpg)

## Features

- **Topic-Restricted**: Only answers questions about Geoffrey Chaucer's *The Canterbury Tales*, specifically *The Nun's Priest's Tale*
- **Gradient Logo**: Orange → Blue → Pink → Purple gradient design (inspired by Gemini)
- **Dual Mode**: Rule-based responses + optional OpenAI API integration
- **Interactive Interface**: Floating chat window with message history
- **Responsive Design**: Works on mobile and desktop devices

## How to Use

1. Click the floating chatbot button in the bottom-right corner of any page
2. Ask questions about:
   - Characters (Chanticleer, Pertelote, Fox, Widow, etc.)
   - Plot summary and themes
   - Historical context and author (Geoffrey Chaucer)
   - Animal fable conventions in medieval literature

## Examples

**Try asking:**
- "Who is Chanticleer?"
- "What happens in The Nun's Priest's Tale?"
- "What is the moral of the story?"
- "Tell me about the widow"

## Technology

- **Frontend**: React component integrated into Quartz 4 layout
- **Backend**: Rule-based system with optional OpenAI GPT-4 integration
- **Styling**: Custom CSS with gradient animations
- **Searchable**: This page appears in site search results for "chatbot" or "AI"

## Implementation Details

The chatbot is implemented as a Quartz component (`Chatbot.tsx`) with:
- Orange (#FF6B35) → Blue (#4ECDC4) → Pink (#FF6B9D) → Purple (#6A0572) gradient
- Responsive chat interface with toggle functionality
- Message history and typing indicators
- Fallback to rule-based responses when API unavailable

## Related Pages

- [[Home]]
- [[Characters-and-Roles]]
- [[Story-Outline]]
- [[Scene-Index]]

---

*The chatbot helps students and enthusiasts explore The Canterbury Tales through interactive conversation.*