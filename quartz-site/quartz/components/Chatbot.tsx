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
    const model = opts.model || "qwen3.5-pro-max"
    const systemPrompt = opts.systemPrompt || defaultSystemPrompt

     return (
       <div 
         class={classNames(displayClass, "quartz-chatbot", "chatbot-embedded")}
         data-api-key={apiKey}
         data-model={model}
         data-system-prompt={systemPrompt}
        >
          <div class="chatbot-throbber hidden"></div>
          <div class="chatbot-container">
           <div class="chatbot-window">
             <div class="chatbot-header">
              <div class="chatbot-title">
                  <div 
                    class="chatbot-logo-css chatbot-logo-small"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(90deg, #FF6B35 0%, #4ECDC4 33%, #FF6B9D 66%, #6A0572 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                  >
                    CT
                  </div>
                <span>Canterbury Tales AI Assistant</span>
              </div>
            </div>
            
            <div class="chatbot-messages">
              <div class="chatbot-message chatbot-system">
                <div class="chatbot-avatar">
                    <div 
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FF6B35 0%, #4ECDC4 50%, #FF6B9D 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      AI
                    </div>
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
              <small>Powered by QWEN 3.5 PRO MAX • Only answers Canterbury Tales questions</small>
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