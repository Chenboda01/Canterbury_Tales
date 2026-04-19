interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

class CanterburyTalesChatbot {
  private container: HTMLElement
  private messagesContainer: HTMLElement
  private input: HTMLTextAreaElement
  private sendButton: HTMLButtonElement
  private controlButtons: NodeListOf<HTMLButtonElement>
  private apiKey: string
  private model: string
  private systemPrompt: string
    private conversation: ChatMessage[] = []
  



   constructor(container: HTMLElement) {
     this.container = container
     this.apiKey = container.dataset.apiKey || ''
     this.model = container.dataset.model || 'qwen3.5-pro-max'
     this.systemPrompt = container.dataset.systemPrompt || ''

      this.messagesContainer = container.querySelector('.chatbot-messages')!
      this.input = container.querySelector('.chatbot-input')!
      this.sendButton = container.querySelector('.chatbot-send')!
      this.controlButtons = container.querySelectorAll('.chatbot-control-button')

     this.init()
    }

  private init() {
    this.applyAppearancePreference('color', this.container.dataset.chatbotColor || 'gray')
    this.applyAppearancePreference('size', this.container.dataset.chatbotSize || 'small')

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

    this.controlButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const controlType = button.dataset.chatbotControl
        const value = button.dataset.value

        if (controlType === 'color' || controlType === 'size') {
          this.applyAppearancePreference(controlType, value || '')
        }
      })
    })

    this.conversation.push({
      role: 'system',
      content: this.systemPrompt,
      timestamp: new Date()
    })
  }

  private applyAppearancePreference(type: 'color' | 'size', value: string) {
    const allowedValues = type === 'color'
      ? ['red', 'blue', 'green', 'white', 'gray']
      : ['small', 'medium', 'large', 'extra-large']
    const fallbackValue = type === 'color' ? 'gray' : 'small'
    const nextValue = allowedValues.includes(value) ? value : fallbackValue
    const prefix = type === 'color' ? 'chatbot-color-' : 'chatbot-size-'
    const dataKey = type === 'color' ? 'chatbotColor' : 'chatbotSize'

    allowedValues.forEach((option) => {
      this.container.classList.remove(`${prefix}${option}`)
    })

    this.container.classList.add(`${prefix}${nextValue}`)
    this.container.dataset[dataKey] = nextValue

    this.controlButtons.forEach((button) => {
      const isMatchingType = button.dataset.chatbotControl === type
      if (!isMatchingType) return

      const isActive = button.dataset.value === nextValue
      button.classList.toggle('is-active', isActive)
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false')
    })
  }










  private async sendMessage() {
    const message = this.input.value.trim()
    if (!message) return

    this.input.value = ''
    this.input.style.height = 'auto'

    this.addMessage('user', message)



    // Handle regular chat
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
      const response = await fetch('https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions', {
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
      console.error('Qwen API error:', error)
      return this.getRuleBasedResponse(userMessage)
    }
  }

  private getRuleBasedResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase().trim()
    


    
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
        keywords: ['story', 'plot', 'summary', 'happens', 'scene'],
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
      },
      {
        keywords: ['help', 'what can you do'],
        response: 'I answer questions about The Canterbury Tales. Try: "Who is Chanticleer?" or "What happens in the story?"'
      }
    ]

    for (const {keywords, response} of responses) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return response
      }
    }

    return 'I can only answer questions about The Canterbury Tales. Try asking about characters, plot, themes, or the author.'
  }



  private addMessage(role: 'user' | 'assistant' | 'system', content: string) {
    const messageDiv = document.createElement('div')
    messageDiv.className = `chatbot-message chatbot-${role}`

    const avatar = document.createElement('div')
    avatar.className = 'chatbot-avatar'
    
    if (role === 'assistant' || role === 'system') {
      const gradientDiv = document.createElement('div')
      gradientDiv.style.width = '32px'
      gradientDiv.style.height = '32px'
      gradientDiv.style.borderRadius = '50%'
      gradientDiv.style.background = 'linear-gradient(135deg, #FF6B35 0%, #4ECDC4 50%, #FF6B9D 100%)'
      gradientDiv.style.display = 'flex'
      gradientDiv.style.alignItems = 'center'
      gradientDiv.style.justifyContent = 'center'
      gradientDiv.style.color = 'white'
      gradientDiv.style.fontWeight = 'bold'
      gradientDiv.style.fontSize = '14px'
      gradientDiv.textContent = 'AI'
      avatar.appendChild(gradientDiv)
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
