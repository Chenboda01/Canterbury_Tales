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
  private quizMode = false
  private currentQuizQuestion = 0
  private quizScore = 0
  private quizAnswers: number[] = []
  private throbberElement: HTMLElement | null = null
  
  private quizQuestions = [
    {
      id: 1,
      question: "Who is the main protagonist in 'The Nun's Priest's Tale'?",
      options: ["The Widow", "Chanticleer (the rooster)", "Pertelote (the hen)", "The Fox (Don Russel)"],
      correctAnswer: 1,
      explanation: "Chanticleer, the proud rooster, is the main protagonist whose dream and capture drive the story.",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "What does Chanticleer dream about?",
      options: ["Finding a golden egg", "Being attacked by a beast/fox", "Flying away from the farm", "Becoming human"],
      correctAnswer: 1,
      explanation: "Chanticleer dreams of a beast threatening him, which Pertelote dismisses but later comes true when the fox captures him.",
      difficulty: "easy"
    },
    {
      id: 3,
      question: "How does Pertelote respond to Chanticleer's dream?",
      options: [
        "She believes it's prophetic and warns him",
        "She dismisses it as indigestion and recommends herbs",
        "She suggests they leave the farm immediately",
        "She laughs and tells him he's being silly"
      ],
      correctAnswer: 1,
      explanation: "Pertelote dismisses the dream as meaningless, attributing it to indigestion and recommending herbal remedies.",
      difficulty: "medium"
    },
    {
      id: 4,
      question: "How does the fox capture Chanticleer?",
      options: ["By digging under the fence", "By flattering him into singing", "By disguising himself as a farmer", "By attacking at night"],
      correctAnswer: 1,
      explanation: "The fox flatters Chanticleer, asking to hear his beautiful singing voice, and when Chanticleer closes his eyes to sing, the fox grabs him.",
      difficulty: "medium"
    },
    {
      id: 5,
      question: "How does Chanticleer escape from the fox?",
      options: [
        "He pecks the fox's eyes",
        "He tricks the fox into opening his mouth to speak",
        "The widow rescues him with a broom",
        "He flies to a tree branch"
      ],
      correctAnswer: 1,
      explanation: "Chanticleer tells the fox to taunt his pursuers, and when the fox opens his mouth to speak, Chanticleer escapes.",
      difficulty: "medium"
    },
    {
      id: 6,
      question: "What is the widow's socioeconomic status?",
      options: ["Wealthy noblewoman", "Middle-class merchant", "Poor but content peasant", "Royal court member"],
      correctAnswer: 2,
      explanation: "The widow is poor but content, living simply with her two daughters in a humble cottage.",
      difficulty: "easy"
    },
    {
      id: 7,
      question: "What literary genre best describes 'The Nun's Priest's Tale'?",
      options: ["Romance", "Beast fable", "Epic poem", "Tragedy"],
      correctAnswer: 1,
      explanation: "The tale is a beast fable—animals act like humans to teach moral lessons—mixed with philosophical debate.",
      difficulty: "hard"
    },
    {
      id: 8,
      question: "What theme does the tale primarily explore?",
      options: ["The dangers of pride and flattery", "The importance of wealth", "The joys of country life", "The power of love"],
      correctAnswer: 0,
      explanation: "The tale explores pride (Chanticleer's vanity), flattery (the fox's deception), and the relationship between dreams and reality.",
      difficulty: "medium"
    },
    {
      id: 9,
      question: "What medieval debate does the story engage with?",
      options: [
        "Nature vs. nurture",
        "Free will vs. predestination",
        "Dream interpretation vs. rational explanation",
        "Church vs. state"
      ],
      correctAnswer: 2,
      explanation: "The tale engages with medieval debates about whether dreams are prophetic (as Chanticleer believes) or just bodily disturbances (as Pertelote argues).",
      difficulty: "hard"
    },
    {
      id: 10,
      question: "In what century was The Canterbury Tales written?",
      options: ["12th century", "14th century", "16th century", "18th century"],
      correctAnswer: 1,
      explanation: "Geoffrey Chaucer wrote The Canterbury Tales in the late 14th century (circa 1387-1400).",
      difficulty: "easy"
    },
    {
      id: 11,
      question: "How many tales are originally planned in The Canterbury Tales?",
      options: ["24", "120", "100", "30"],
      correctAnswer: 1,
      explanation: "Chaucer originally planned 120 tales (two per pilgrim), but only completed 24.",
      difficulty: "medium"
    },
    {
      id: 12,
      question: "What is the framing device of The Canterbury Tales?",
      options: ["A royal banquet", "A pilgrimage to Canterbury", "A ship voyage", "A court trial"],
      correctAnswer: 1,
      explanation: "The tales are told by pilgrims traveling from London to Canterbury Cathedral to visit the shrine of Thomas Becket.",
      difficulty: "easy"
    },
    {
      id: 13,
      question: "Which character tells 'The Nun's Priest's Tale'?",
      options: ["The Nun's Priest", "The Knight", "The Wife of Bath", "The Pardoner"],
      correctAnswer: 0,
      explanation: "As the title indicates, 'The Nun's Priest's Tale' is told by the Nun's Priest, who accompanies the Prioress.",
      difficulty: "easy"
    },
    {
      id: 14,
      question: "What is the moral of 'The Nun's Priest's Tale' according to the narrator?",
      options: [
        "Never trust flatterers",
        "Dreams are meaningless",
        "Women are always wrong",
        "Pride goes before a fall"
      ],
      correctAnswer: 0,
      explanation: "The explicit moral is to beware of flatterers, though the tale contains multiple layers of meaning.",
      difficulty: "medium"
    },
    {
      id: 15,
      question: "What animal besides Chanticleer is mentioned as part of the widow's livestock?",
      options: ["A horse", "A sheep named Mally", "A dog", "A cat"],
      correctAnswer: 1,
      explanation: "The widow owns a sheep named Mally, along with three cows, three pigs, and Chanticleer's hens.",
      difficulty: "hard"
    }
  ]

  private selectedQuizQuestions: any[] = []

  constructor(container: HTMLElement) {
    this.apiKey = container.dataset.apiKey || ''
    this.model = container.dataset.model || 'qwen3.5-plus'
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

  private shuffleQuestions() {
    // Select 10 random questions from the pool for individual quiz experience
    const pool = [...this.quizQuestions]; // copy
    this.selectedQuizQuestions = [];
    
    // Fisher-Yates shuffle to pick random 10 questions
    for (let i = 0; i < 10 && i < pool.length; i++) {
      const j = i + Math.floor(Math.random() * (pool.length - i));
      [pool[i], pool[j]] = [pool[j], pool[i]];
      this.selectedQuizQuestions.push(pool[i]);
    }
    
    // Shuffle the selected questions for random order
    for (let i = this.selectedQuizQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.selectedQuizQuestions[i], this.selectedQuizQuestions[j]] = [this.selectedQuizQuestions[j], this.selectedQuizQuestions[i]];
    }
  }

  private startQuiz() {
    this.quizMode = true
    this.currentQuizQuestion = 0
    this.quizScore = 0
    this.quizAnswers = []
    
    // Shuffle questions for individual experience
    this.shuffleQuestions()
    
    this.addMessage('assistant', '📝 **Canterbury Tales Quiz Started!**\n\nI\'ll ask you 10 multiple-choice questions. Answer with the number (1-4) or letter (A-D) of your choice.\n\n**Grading:** A (90-100%), B (80-89%), C (70-79%), D (60-69%), F (below 60%)\n\n*No E grade because "E stands for excellent" in this system!*\n\nReady? Here\'s question 1:')
    this.displayQuizQuestion(0)
  }

  private displayQuizQuestion(questionIndex: number) {
    if (questionIndex >= this.selectedQuizQuestions.length) {
      this.endQuiz()
      return
    }

    const question = this.selectedQuizQuestions[questionIndex]
    let questionText = `**Question ${questionIndex + 1}/${this.selectedQuizQuestions.length}** (${question.difficulty})\n${question.question}\n\n`
    
    question.options.forEach((option, index) => {
      questionText += `${index + 1}. ${option}\n`
    })
    
    questionText += `\nAnswer with: 1, 2, 3, or 4`
    this.addMessage('assistant', questionText)
  }

  private handleQuizAnswer(answer: string) {
    const question = this.selectedQuizQuestions[this.currentQuizQuestion]
    let answerIndex = -1
    
    // Parse answer: could be "1", "A", "a", "option 1", etc.
    const cleanAnswer = answer.trim().toLowerCase()
    if (cleanAnswer.match(/^[1-4]$/)) {
      answerIndex = parseInt(cleanAnswer) - 1
    } else if (cleanAnswer.match(/^[a-d]$/)) {
      answerIndex = cleanAnswer.charCodeAt(0) - 'a'.charCodeAt(0)
    } else if (cleanAnswer.includes('1') || cleanAnswer.includes('one') || cleanAnswer.includes('first')) {
      answerIndex = 0
    } else if (cleanAnswer.includes('2') || cleanAnswer.includes('two') || cleanAnswer.includes('second')) {
      answerIndex = 1
    } else if (cleanAnswer.includes('3') || cleanAnswer.includes('three') || cleanAnswer.includes('third')) {
      answerIndex = 2
    } else if (cleanAnswer.includes('4') || cleanAnswer.includes('four') || cleanAnswer.includes('fourth')) {
      answerIndex = 3
    }

    if (answerIndex < 0 || answerIndex > 3) {
      this.addMessage('assistant', 'Please answer with a number 1-4 or letter A-D.')
      return false
    }

    this.quizAnswers.push(answerIndex)
    const isCorrect = answerIndex === question.correctAnswer
    
    if (isCorrect) {
      this.quizScore++
      this.addMessage('assistant', `✅ **Correct!** ${question.explanation}`)
    } else {
      const correctOption = question.options[question.correctAnswer]
      this.addMessage('assistant', `❌ **Incorrect.** The correct answer is: ${question.correctAnswer + 1}. ${correctOption}\n\n${question.explanation}`)
    }

    this.currentQuizQuestion++
    
    if (this.currentQuizQuestion < this.selectedQuizQuestions.length) {
      setTimeout(() => this.displayQuizQuestion(this.currentQuizQuestion), 1000)
    } else {
      setTimeout(() => this.endQuiz(), 1000)
    }
    
    return true
  }

  private calculateGrade(): {letter: string, percentage: number} {
    const percentage = (this.quizScore / this.selectedQuizQuestions.length) * 100
    
    if (percentage >= 90) return {letter: 'A', percentage}
    if (percentage >= 80) return {letter: 'B', percentage}
    if (percentage >= 70) return {letter: 'C', percentage}
    if (percentage >= 60) return {letter: 'D', percentage}
    return {letter: 'F', percentage}
  }

  private async endQuiz() {
    this.quizMode = false
    const grade = this.calculateGrade()
    const displayPercentage = grade.percentage  // Actual score for display
    const finalPercentage = 100                 // Always animate to 100%
    
    this.showThrobber(0)
    
    const animationDurationMs = 2000
    const animationStartTime = Date.now()
    const animationStartPercentage = 0
    
    const animateProgress = () => {
      const elapsed = Date.now() - animationStartTime
      const progress = Math.min(elapsed / animationDurationMs, 1)
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentPercentage = animationStartPercentage + (finalPercentage - animationStartPercentage) * easeOutCubic
      
      this.updateThrobber(currentPercentage)
      
      if (progress < 1) {
        requestAnimationFrame(animateProgress)
      } else {
        setTimeout(() => {
          this.removeThrobber()
          
          let resultMessage = `📊 **Quiz Complete!**\n\n`
          resultMessage += `**Score:** ${this.quizScore}/${this.selectedQuizQuestions.length} (${displayPercentage.toFixed(1)}%)\n`
          resultMessage += `**Grade:** ${grade.letter}\n\n`
          
          if (grade.letter === 'A') {
            resultMessage += `🏆 **Excellent!** You\'re a Canterbury Tales expert!`
          } else if (grade.letter === 'B') {
            resultMessage += `👍 **Good job!** You know the tale well.`
          } else if (grade.letter === 'C') {
            resultMessage += `👌 **Not bad!** You have a basic understanding.`
          } else if (grade.letter === 'D') {
            resultMessage += `📚 **Keep studying!** Review the story and try again.`
          } else {
            resultMessage += `📖 **Time to re-read!** The Nun's Priest's Tale awaits you.`
          }
          
          if (grade.letter !== 'A') {
            const encouragementMessages = [
              "I'm ready to try again!",
              "I'm ready for another attempt!",
              "Let me try again - I'm prepared now!",
              "Ready for round two!"
            ]
            const randomEncouragement = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
            resultMessage += `\n\n${randomEncouragement}`
          }
          
          resultMessage += `\n\nSay "start quiz" to try again!`
          
          this.addMessage('assistant', resultMessage)
        }, 500)
      }
    }
    
    requestAnimationFrame(animateProgress)
  }

  private showThrobber(initialPercentage: number = 0): void {
    if (this.throbberElement) {
      this.throbberElement.remove()
    }

    const throbberDiv = document.createElement('div')
    throbberDiv.className = 'chatbot-throbber'
    
    const containerDiv = document.createElement('div')
    containerDiv.className = 'chatbot-throbber-container'
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('class', 'chatbot-throbber-svg')
    svg.setAttribute('viewBox', '0 0 36 36')
    
    const circleBg = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circleBg.setAttribute('class', 'chatbot-throbber-circle-bg')
    circleBg.setAttribute('cx', '18')
    circleBg.setAttribute('cy', '18')
    circleBg.setAttribute('r', '15.9155')
    
    const circleProgress = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circleProgress.setAttribute('class', 'chatbot-throbber-circle-progress')
    circleProgress.setAttribute('cx', '18')
    circleProgress.setAttribute('cy', '18')
    circleProgress.setAttribute('r', '15.9155')
    circleProgress.setAttribute('stroke-dasharray', '100')
    circleProgress.setAttribute('stroke-dashoffset', '100')
    
    svg.appendChild(circleBg)
    svg.appendChild(circleProgress)
    
    const percentageDiv = document.createElement('div')
    percentageDiv.className = 'chatbot-throbber-percentage'
    percentageDiv.textContent = `${Math.round(initialPercentage)}%`
    
    const textDiv = document.createElement('div')
    textDiv.className = 'chatbot-throbber-text'
    textDiv.textContent = 'Calculating score...'
    
    containerDiv.appendChild(svg)
    containerDiv.appendChild(percentageDiv)
    
    throbberDiv.appendChild(containerDiv)
    throbberDiv.appendChild(textDiv)
    
    this.messagesContainer.appendChild(throbberDiv)
    this.throbberElement = throbberDiv
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    
    this.updateThrobber(initialPercentage)
  }

  private updateThrobber(percentage: number): void {
    if (!this.throbberElement) return
    
    const circleProgress = this.throbberElement.querySelector('.chatbot-throbber-circle-progress') as SVGElement
    const percentageDiv = this.throbberElement.querySelector('.chatbot-throbber-percentage') as HTMLElement
    
    if (circleProgress) {
      const offset = 100 - percentage
      circleProgress.setAttribute('stroke-dashoffset', offset.toString())
    }
    
    if (percentageDiv) {
      percentageDiv.textContent = `${Math.round(percentage)}%`
    }
  }

  private removeThrobber(): void {
    if (this.throbberElement) {
      this.throbberElement.remove()
      this.throbberElement = null
    }
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

    // Handle quiz mode
    if (this.quizMode) {
      this.conversation.push({
        role: 'user',
        content: message,
        timestamp: new Date()
      })
      this.handleQuizAnswer(message)
      return
    }

    // Handle regular chat
    this.conversation.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    })

    this.setLoading(true)

    try {
      const response = await this.getAIResponse(message)
      
      // Check for special quiz start command
      if (response === 'QUIZ_MODE:START') {
        this.startQuiz()
      } else {
        this.addMessage('assistant', response)
        this.conversation.push({
          role: 'assistant',
          content: response,
          timestamp: new Date()
        })
      }
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
    
    // More precise quiz detection - only for explicit quiz commands
    const quizCommands = ['start quiz', 'take quiz', 'begin quiz', 'test me', 'quiz me', 'i\'m ready', 'ready', 'try again', 'restart quiz', 'again', 'let\'s go']
    
    const isExactQuizCommand = lowerMessage === 'quiz' || quizCommands.some(cmd => lowerMessage === cmd)
    const startsWithQuizCommand = quizCommands.some(cmd => 
      lowerMessage.startsWith(cmd + ' ') || 
      lowerMessage.startsWith(cmd + '!') || 
      lowerMessage.startsWith(cmd + '?')
    )
    
    if (isExactQuizCommand || startsWithQuizCommand) {
      return 'QUIZ_MODE:START'
    }
    
    // Allow canceling quiz during quiz mode
    if (this.quizMode && (lowerMessage.includes('cancel') || lowerMessage.includes('stop') || lowerMessage.includes('exit'))) {
      this.quizMode = false
      return 'Quiz canceled. You can ask me questions about The Canterbury Tales again.'
    }
    
    // Handle quiz help separately
    if (lowerMessage.includes('quiz help') || lowerMessage.includes('help quiz')) {
      return 'To start a quiz, say "start quiz". I\'ll ask 10 multiple-choice questions. During quiz, answer with numbers 1-4. Say "cancel quiz" to exit.'
    }
    
    const responses: Array<{keywords: string[], response: string}> = [
      {
        keywords: ['hello', 'hi', 'hey', 'greetings'],
        response: 'Hello! I\'m your Canterbury Tales assistant. Ask me about the story, characters, or themes. Say "start quiz" for a knowledge test.'
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
        response: 'I answer questions about The Canterbury Tales. Try: "Who is Chanticleer?" or "What happens in the story?" Say "start quiz" for a knowledge test.'
      }
    ]

    for (const {keywords, response} of responses) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return response
      }
    }

    return 'I can only answer questions about The Canterbury Tales. Try asking about characters, plot, themes, or the author. Say "start quiz" for a knowledge test.'
  }

  private handleQuizCommand(command: string): string {
    if (command.includes('start') || command.includes('begin')) {
      return 'QUIZ_MODE:START'
    } else if (command.includes('help') || command.includes('how')) {
      return 'To start a quiz, say "start quiz". I\'ll ask you 10 multiple-choice questions about The Canterbury Tales and grade your answers (A/B/C/D/F).'
    }
    return 'I can administer a quiz about The Canterbury Tales. Say "start quiz" to begin!'
  }

  private addMessage(role: 'user' | 'assistant' | 'system', content: string) {
    const messageDiv = document.createElement('div')
    messageDiv.className = `chatbot-message chatbot-${role}`

    const avatar = document.createElement('div')
    avatar.className = 'chatbot-avatar'
    
    if (role === 'assistant' || role === 'system') {
      const img = document.createElement('img')
      img.src = '/static/Gemini_PROOF.png'
      img.alt = 'AI Avatar'
      img.width = 32
      img.height = 32
      img.style.borderRadius = '50%'
      img.style.objectFit = 'cover'
      avatar.appendChild(img)
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