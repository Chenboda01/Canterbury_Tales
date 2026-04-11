interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

class CanterburyTalesChatbot {
  private toggleButton: HTMLButtonElement
  private closeButton: HTMLButtonElement
  private window: HTMLElement
  private messagesContainer: HTMLElement
  private input: HTMLTextAreaElement
  private sendButton: HTMLButtonElement
  private apiKey: string
  private model: string
  private systemPrompt: string
  private conversation: ChatMessage[] = []
  private isOpen = false

  constructor(container: HTMLElement) {
    this.apiKey = container.dataset.apiKey || ''
    this.model = container.dataset.model || 'gpt-4o-mini'
    this.systemPrompt = container.dataset.systemPrompt || ''

    this.toggleButton = container.querySelector('.chatbot-toggle')!
    this.closeButton = container.querySelector('.chatbot-close')!
    this.window = container.querySelector('.chatbot-window')!
    this.messagesContainer = container.querySelector('.chatbot-messages')!
    this.input = container.querySelector('.chatbot-input')!
    this.sendButton = container.querySelector('.chatbot-send')!

    this.init()
  }

  private init() {
    this.toggleButton.addEventListener('click', () => this.toggleWindow())
    this.closeButton.addEventListener('click', () => this.closeWindow())
    this.sendButton.addEventListener('click', () => this.sendMessage())
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        this.sendMessage()
      }
    })

    this.input.addEventListener('input', () => {
      this.input.style.height = 'auto'
      this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px'
    })

    this.conversation.push({
      role: 'system',
      content: this.systemPrompt,
      timestamp: new Date()
    })
  }

  private toggleWindow() {
    this.isOpen = !this.isOpen
    if (this.isOpen) {
      this.window.classList.remove('hidden')
      this.input.focus()
    } else {
      this.window.classList.add('hidden')
    }
  }

  private closeWindow() {
    this.isOpen = false
    this.window.classList.add('hidden')
  }

  private async sendMessage() {
    const message = this.input.value.trim()
    if (!message) return

    this.input.value = ''
    this.input.style.height = 'auto'

    this.addMessage('user', message)
    this.conversation.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    })

    this.setLoading(true)

    try {
      const response = await this.getAIResponse(message)
      this.addMessage('assistant', response)
      this.conversation.push({
        role: 'assistant',
        content: response,
        timestamp: new Date()
      })
    } catch (error) {
      console.error('Chatbot error:', error)
      this.addMessage('assistant', 'Sorry, I encountered an error. Please try again.')
    } finally {
      this.setLoading(false)
    }
  }

  private async getAIResponse(userMessage: string): Promise<string> {
    if (!this.apiKey) {
      return this.getRuleBasedResponse(userMessage)
    }

    const messages = [
      { role: 'system', content: this.systemPrompt },
      ...this.conversation.filter(m => m.role !== 'system').map(m => ({
        role: m.role,
        content: m.content
      }))
    ]

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages.slice(-10),
          max_tokens: 500,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`API error: ${error}`)
      }

      const data = await response.json()
      return data.choices[0].message.content.trim()
    } catch (error) {
      console.error('OpenAI API error:', error)
      return this.getRuleBasedResponse(userMessage)
    }
  }

  private getRuleBasedResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase()
    
    const responses: Array<{keywords: string[], response: string}> = [
      {
        keywords: ['hello', 'hi', 'hey', 'greetings'],
        response: 'Hello! I\'m your Canterbury Tales assistant. Ask me about the story, characters, or themes.'
      },
      {
        keywords: ['chanticleer', 'rooster', 'cock'],
        response: 'Chanticleer is the proud rooster protagonist in "The Nun\'s Priest\'s Tale." He has a prophetic dream about a fox, debates with his wife Pertelote about dreams, and is eventually captured by the fox but escapes using his wits.'
      },
      {
        keywords: ['pertelote', 'hen', 'wife'],
        response: 'Pertelote is Chanticleer\'s favorite hen and wife. She dismisses his dream as meaningless, attributing it to indigestion, and urges him to take herbal remedies instead.'
      },
      {
        keywords: ['fox', 'don russel', 'russel'],
        response: 'The fox (Don Russel) is the cunning antagonist who flatters Chanticleer into singing, then captures him. He represents deception and worldly cunning in the tale.'
      },
      {
        keywords: ['widow'],
        response: 'The widow is a poor but content woman who owns Chanticleer and the other animals. She lives a simple life with her two daughters in a cottage.'
      },
      {
        keywords: ['dream', 'prophecy', 'prophetic'],
        response: 'Chanticleer dreams of a beast threatening him, which Pertelote dismisses. The dream comes true when the fox captures him, illustrating medieval debates about dream interpretation.'
      },
      {
        keywords: ['story', 'plot', 'summary', 'happens'],
        response: 'In "The Nun\'s Priest\'s Tale," Chanticleer the rooster has a nightmare about being attacked. His wife Pertelote dismisses it. Later, a fox flatters Chanticleer into singing, captures him, but Chanticleer tricks the fox into letting him go.'
      },
      {
        keywords: ['theme', 'moral', 'meaning'],
        response: 'The tale explores themes of pride, flattery, dreams vs. reality, and the relationship between men and women. It\'s both a beast fable and a philosophical debate.'
      },
      {
        keywords: ['chaucer', 'author'],
        response: 'Geoffrey Chaucer wrote The Canterbury Tales in the late 14th century. "The Nun\'s Priest\'s Tale" is one of the most famous, blending comedy, philosophy, and animal fable.'
      },
      {
        keywords: ['animal', 'farm', 'yard'],
        response: 'The story takes place in the widow\'s farmyard, with animals that can talk and reason like humans—a common device in medieval beast fables.'
      }
    ]

    for (const {keywords, response} of responses) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return response
      }
    }

    return 'I can only answer questions about The Canterbury Tales. Try asking about characters like Chanticleer or Pertelote, the plot, themes, or the author Geoffrey Chaucer.'
  }

  private addMessage(role: 'user' | 'assistant' | 'system', content: string) {
    const messageDiv = document.createElement('div')
    messageDiv.className = `chatbot-message chatbot-${role}`

    const avatar = document.createElement('div')
    avatar.className = 'chatbot-avatar'
    
    if (role === 'assistant' || role === 'system') {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('viewBox', '0 0 100 100')
      svg.setAttribute('width', '32')
      svg.setAttribute('height', '32')
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', '50')
      circle.setAttribute('cy', '50')
      circle.setAttribute('r', '45')
      circle.setAttribute('fill', 'url(#chatbot-gradient)')
      
      svg.appendChild(circle)
      avatar.appendChild(svg)
    } else {
      avatar.textContent = '👤'
    }

    const contentDiv = document.createElement('div')
    contentDiv.className = 'chatbot-content'
    
    const p = document.createElement('p')
    p.textContent = content
    contentDiv.appendChild(p)

    messageDiv.appendChild(avatar)
    messageDiv.appendChild(contentDiv)

    this.messagesContainer.appendChild(messageDiv)
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
  }

  private setLoading(loading: boolean) {
    this.sendButton.disabled = loading
    this.sendButton.innerHTML = loading
      ? '<div class="chatbot-spinner"></div>'
      : '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>'
  }
}

document.addEventListener('nav', () => {
  const chatbotContainers = document.querySelectorAll('.quartz-chatbot')
  
  chatbotContainers.forEach(container => {
    new CanterburyTalesChatbot(container as HTMLElement)
  })
})