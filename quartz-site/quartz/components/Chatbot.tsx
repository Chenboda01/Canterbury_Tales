import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/chatbot.inline"
// @ts-ignore
import styles from "./styles/chatbot.scss"

type Options = {
  apiKey?: string
  model?: string
  systemPrompt?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}

const defaultSystemPrompt = `You are a knowledgeable assistant specialized in Geoffrey Chaucer's "The Canterbury Tales," specifically "The Nun's Priest's Tale." Your purpose is to help users understand the story, characters, themes, and historical context.

IMPORTANT RULES:
1. ONLY answer questions about "The Canterbury Tales" by Geoffrey Chaucer
2. If asked about other topics, politely decline and redirect to Canterbury Tales
3. Use information from the provided wiki content when relevant
4. Be educational and engaging
5. Keep answers concise but informative

Available characters: Chaucer, Chanticleer (rooster), Pertelote (hen), Fox (Don Russel), The Widow, Daughters, Hens, Farm Animals.
The story involves Chanticleer's prophetic dream, his debate with Pertelote, and his capture by the fox.

Respond in a friendly, scholarly tone suitable for students and literature enthusiasts.`

export default ((opts: Options) => {
  const Chatbot: QuartzComponent = ({ displayClass, fileData: _fileData, cfg: _cfg }: QuartzComponentProps) => {
    const apiKey = opts.apiKey || ""
    const model = opts.model || "gpt-4o-mini"
    const systemPrompt = opts.systemPrompt || defaultSystemPrompt
    const position = opts.position || "bottom-right"

    const positionClasses = {
      "bottom-right": "chatbot-bottom-right",
      "bottom-left": "chatbot-bottom-left", 
      "top-right": "chatbot-top-right",
      "top-left": "chatbot-top-left"
    }

    return (
      <div 
        class={classNames(displayClass, "quartz-chatbot", positionClasses[position])}
        data-api-key={apiKey}
        data-model={model}
        data-system-prompt={systemPrompt}
      >
        <div class="chatbot-container">
          <button class="chatbot-toggle" aria-label="Open Chatbot">
             <img 
  class="chatbot-logo" 
  src="/static/Gemini_PROOF.png" 
  alt="Canterbury Tales AI Logo"
  width="40"
  height="40"
  style={{ borderRadius: '50%', objectFit: 'cover' }}
/>
          </button>
          
          <div class="chatbot-window hidden">
            <div class="chatbot-header">
              <div class="chatbot-title">
                 <img 
                   class="chatbot-logo-small" 
                   src="/static/Gemini_PROOF.png" 
                   alt="Canterbury Tales AI Logo"
                   width="24"
                   height="24"
                   style={{ borderRadius: '50%', objectFit: 'cover' }}
                 />
                <span>Canterbury Tales AI</span>
              </div>
              <button class="chatbot-close" aria-label="Close Chatbot">×</button>
            </div>
            
            <div class="chatbot-messages">
              <div class="chatbot-message chatbot-system">
                <div class="chatbot-avatar">
                   <img 
                     src="/static/Gemini_PROOF.png" 
                     alt="AI Avatar"
                     width="32"
                     height="32"
                     style={{ borderRadius: '50%', objectFit: 'cover' }}
                   />
                </div>
                <div class="chatbot-content">
                  <p>Hello! I'm your Canterbury Tales assistant. Ask me anything about Geoffrey Chaucer's classic work, characters, or themes.</p>
                  <p class="chatbot-hint">Try: "Who is Chanticleer?" or "What happens in The Nun's Priest's Tale?"</p>
                </div>
              </div>
            </div>
            
            <div class="chatbot-input-area">
              <textarea 
                class="chatbot-input" 
                placeholder="Ask about Canterbury Tales..." 
                rows={2}
              ></textarea>
              <button class="chatbot-send" aria-label="Send message">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
            
            <div class="chatbot-footer">
              <small>Powered by AI • Only answers Canterbury Tales questions</small>
            </div>
          </div>
        </div>
      </div>
    )
  }

  Chatbot.afterDOMLoaded = script
  Chatbot.css = styles

  return Chatbot
}) satisfies QuartzComponentConstructor<Options>