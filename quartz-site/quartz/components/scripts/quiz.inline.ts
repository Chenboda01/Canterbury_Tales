console.log('Quiz script loaded');
class Quiz {
  private quizQuestions = [
     {
       id: 1,
       question: "Who is the main protagonist in 'The Nun's Priest's Tale'?",
       options: ["The Widow", "Chanticleer (the rooster)", "Pertelote (the hen)", "The Fox (Don Russel)"],
       correctAnswer: 1,
       explanation: "Chanticleer, the proud rooster, is the main protagonist whose dream and capture drive the story.",
       difficulty: "easy",
       scenes: Array.from({length: 35}, (_, i) => i)
     },
     {
       id: 2,
       question: "What does Chanticleer dream about?",
       options: ["Finding a golden egg", "Being attacked by a beast/fox", "Flying away from the farm", "Becoming human"],
       correctAnswer: 1,
       explanation: "Chanticleer dreams of a beast threatening him, which Pertelote dismisses but later comes true when the fox captures him.",
       difficulty: "easy",
       scenes: Array.from({length: 35}, (_, i) => i)
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
       difficulty: "medium",
       scenes: Array.from({length: 35}, (_, i) => i)
     },
    {
      id: 4,
      question: "How does the fox capture Chanticleer?",
      options: ["By digging under the fence", "By flattering him into singing", "By disguising himself as a farmer", "By attacking at night"],
      correctAnswer: 1,
      explanation: "The fox flatters Chanticleer, asking to hear his beautiful singing voice, and when Chanticleer closes his eyes to sing, the fox grabs him.",
      difficulty: "medium",
      scenes: Array.from({length: 35}, (_, i) => i)
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
      difficulty: "medium",
      scenes: Array.from({length: 35}, (_, i) => i)
    },
    {
      id: 6,
      question: "What is the widow's socioeconomic status?",
      options: ["Wealthy noblewoman", "Middle-class merchant", "Poor but content peasant", "Royal court member"],
      correctAnswer: 2,
      explanation: "The widow is poor but content, living simply with her two daughters in a humble cottage.",
      difficulty: "easy",
      scenes: Array.from({length: 35}, (_, i) => i)
    },
    {
      id: 7,
      question: "What literary genre best describes 'The Nun's Priest's Tale'?",
      options: ["Romance", "Beast fable", "Epic poem", "Tragedy"],
      correctAnswer: 1,
      explanation: "The tale is a beast fable—animals act like humans to teach moral lessons—mixed with philosophical debate.",
      difficulty: "hard",
      scenes: Array.from({length: 35}, (_, i) => i)
    },
    {
      id: 8,
      question: "What theme does the tale primarily explore?",
      options: ["The dangers of pride and flattery", "The importance of wealth", "The joys of country life", "The power of love"],
      correctAnswer: 0,
      explanation: "The tale explores pride (Chanticleer's vanity), flattery (the fox's deception), and the relationship between dreams and reality.",
      difficulty: "medium",
      scenes: Array.from({length: 35}, (_, i) => i)
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
      difficulty: "hard",
      scenes: Array.from({length: 35}, (_, i) => i)
    },
    {
      id: 10,
      question: "In what century was The Canterbury Tales written?",
      options: ["12th century", "14th century", "16th century", "18th century"],
      correctAnswer: 1,
      explanation: "Geoffrey Chaucer wrote The Canterbury Tales in the late 14th century (circa 1387-1400).",
      difficulty: "easy",
      scenes: Array.from({length: 35}, (_, i) => i)
    },
    {
      id: 11,
      question: "How many tales are originally planned in The Canterbury Tales?",
      options: ["24", "120", "100", "30"],
      correctAnswer: 1,
      explanation: "Chaucer originally planned 120 tales (two per pilgrim), but only completed 24.",
      difficulty: "medium",
      scenes: Array.from({length: 35}, (_, i) => i)
    },
    {
      id: 12,
      question: "What is the framing device of The Canterbury Tales?",
      options: ["A royal banquet", "A pilgrimage to Canterbury", "A ship voyage", "A court trial"],
      correctAnswer: 1,
      explanation: "The tales are told by pilgrims traveling from London to Canterbury Cathedral to visit the shrine of Thomas Becket.",
      difficulty: "easy",
      scenes: Array.from({length: 35}, (_, i) => i)
    },
    {
      id: 13,
      question: "Which character tells 'The Nun's Priest's Tale'?",
      options: ["The Nun's Priest", "The Knight", "The Wife of Bath", "The Pardoner"],
      correctAnswer: 0,
      explanation: "As the title indicates, 'The Nun's Priest's Tale' is told by the Nun's Priest, who accompanies the Prioress.",
      difficulty: "easy",
      scenes: Array.from({length: 35}, (_, i) => i)
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
      difficulty: "medium",
      scenes: Array.from({length: 35}, (_, i) => i)
    },
    {
      id: 15,
      question: "What animal besides Chanticleer is mentioned as part of the widow's livestock?",
      options: ["A horse", "A sheep named Mally", "A dog", "A cat"],
      correctAnswer: 1,
      explanation: "The widow owns a sheep named Mally, along with three cows, three pigs, and Chanticleer's hens.",
      difficulty: "hard",
      scenes: Array.from({length: 35}, (_, i) => i)
    }
  ]

  private selectedQuizQuestions: any[] = []
  private currentQuizQuestion = 0
  private quizScore = 0
  private quizAnswers: number[] = []
  private isQuizActive = false

  private container: HTMLElement
  private slug: string
  private startScreen: HTMLElement
  private questionScreen: HTMLElement
  private feedbackScreen: HTMLElement
  private resultsScreen: HTMLElement
  private startButton: HTMLElement
  private questionText: HTMLElement
  private optionElements: NodeListOf<HTMLElement>
  private submitButton: HTMLElement
  private nextButton: HTMLElement
  private feedbackContent: HTMLElement
  private progressBar: HTMLElement
  private progressText: HTMLElement
  private currentQuestionSpan: HTMLElement
  private gradePercentage: HTMLElement
  private gradeLetter: HTMLElement
  private quizScoreSpan: HTMLElement
  private quizPercentageSpan: HTMLElement
  private retryButton: HTMLElement
  private progressRingForeground: SVGCircleElement | null
  private throbber: HTMLElement
  private boundKeydownHandler: (e: KeyboardEvent) => void

  constructor(container: HTMLElement) {
    console.log('Quiz constructor called for container:', container);
    (window as any)._quizInstance = this;
    this.container = container
    this.slug = container.getAttribute('data-slug') || ''
    console.log('Quiz slug:', this.slug)
    this.startScreen = container.querySelector('.quiz-start-screen')!
    this.questionScreen = container.querySelector('.quiz-question-screen')!
    this.feedbackScreen = container.querySelector('.quiz-feedback-screen')!
    this.resultsScreen = container.querySelector('.quiz-results-screen')!
    this.startButton = container.querySelector('.quiz-start-button')!
    this.questionText = container.querySelector('.quiz-question-text')!
    this.optionElements = container.querySelectorAll('.quiz-option')
    this.submitButton = container.querySelector('.quiz-submit-button')!
    this.nextButton = container.querySelector('.quiz-next-button')!
    this.feedbackContent = container.querySelector('.quiz-feedback-content')!
    this.progressBar = container.querySelector('.quiz-progress-bar')!
    this.progressText = container.querySelector('.quiz-progress-text')!
    this.currentQuestionSpan = container.querySelector('.quiz-current')!
    this.gradePercentage = container.querySelector('.quiz-grade-percentage')!
    this.gradeLetter = container.querySelector('.quiz-grade-letter')!
    this.quizScoreSpan = container.querySelector('.quiz-score')!
    this.quizPercentageSpan = container.querySelector('.quiz-percentage')!
    this.retryButton = container.querySelector('.quiz-retry-button')!
    this.throbber = container.querySelector('.quiz-throbber')!
    this.progressRingForeground = container.querySelector('.quiz-progress-ring-foreground')
    console.log('Quiz throbber element:', this.throbber)

    try {
      this.init()
    } catch (error) {
      console.error('Quiz initialization error:', error)
    }
  }

  private init() {
    console.log('Quiz init called, startButton:', this.startButton);
    this.startButton.addEventListener('click', () => this.startQuiz())
    this.submitButton.addEventListener('click', () => this.submitAnswer())
    this.nextButton.addEventListener('click', () => this.nextQuestion())
    this.retryButton.addEventListener('click', () => this.retryQuiz())

    this.optionElements.forEach((option, index) => {
      option.addEventListener('click', () => this.selectOption(index))
    })

    // Add tabindex to make container focusable for keyboard navigation
    this.container.setAttribute('tabindex', '-1')
    this.container.addEventListener('keydown', (e) => this.handleKeydown(e))
    
    // Also listen on document for Enter key regardless of focus
    this.boundKeydownHandler = (e: KeyboardEvent) => this.handleKeydown(e)
    document.addEventListener('keydown', this.boundKeydownHandler)
  }

   private shuffleQuestions() {
    // Extract scene number from slug (e.g., "Scene-00" -> 0)
    let sceneNumber = -1
    if (this.slug.startsWith('Scene-')) {
      const sceneStr = this.slug.replace('Scene-', '')
      sceneNumber = parseInt(sceneStr, 10)
      if (isNaN(sceneNumber)) sceneNumber = -1
    }
    
    // Filter questions for this scene
    let pool = [...this.quizQuestions]
    if (sceneNumber >= 0) {
      pool = pool.filter(q => {
        // If question has scenes property, check if it includes this scene
        if (q.scenes && Array.isArray(q.scenes)) {
          return q.scenes.includes(sceneNumber)
        }
        // If no scenes property, include for all scenes
        return true
      })
    }
    
    // If filtered pool is empty, use all questions
    if (pool.length === 0) {
      pool = [...this.quizQuestions]
    }
    
    this.selectedQuizQuestions = []
    
    // Select up to 10 questions from filtered pool
    for (let i = 0; i < 10 && i < pool.length; i++) {
      const j = i + Math.floor(Math.random() * (pool.length - i))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
      this.selectedQuizQuestions.push(pool[i])
    }
    
    // Shuffle the selected questions
    for (let i = this.selectedQuizQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.selectedQuizQuestions[i], this.selectedQuizQuestions[j]] = [this.selectedQuizQuestions[j], this.selectedQuizQuestions[i]]
    }
  }

  private startQuiz() {
    this.shuffleQuestions()
    this.currentQuizQuestion = 0
    this.quizScore = 0
    this.quizAnswers = []
    this.isQuizActive = true

    this.startScreen.classList.add('hidden')
    this.questionScreen.classList.remove('hidden')
    this.feedbackScreen.classList.add('hidden')
    this.resultsScreen.classList.add('hidden')

    this.displayQuestion(0)
  }

  private displayQuestion(index: number) {
    if (index >= this.selectedQuizQuestions.length) {
      this.endQuiz()
      return
    }

    const question = this.selectedQuizQuestions[index]
    this.questionText.textContent = question.question
    this.currentQuestionSpan.textContent = (index + 1).toString()
    this.progressBar.style.width = `${((index) / this.selectedQuizQuestions.length) * 100}%`

    this.optionElements.forEach((optionEl, i) => {
      const optionText = optionEl.querySelector('.quiz-option-text')
      if (optionText) optionText.textContent = question.options[i] || ''
      optionEl.classList.remove('selected', 'correct', 'incorrect')
    })

    this.submitButton.disabled = true
    this.submitButton.textContent = 'Submit Answer'
  }

  private selectOption(index: number) {
    this.optionElements.forEach(option => option.classList.remove('selected'))
    this.optionElements[index].classList.add('selected')
    this.submitButton.disabled = false
  }

  private submitAnswer() {
    const selectedOption = Array.from(this.optionElements).findIndex(option => option.classList.contains('selected'))
    if (selectedOption === -1) return

    const question = this.selectedQuizQuestions[this.currentQuizQuestion]
    const isCorrect = selectedOption === question.correctAnswer

    this.quizAnswers.push(selectedOption)
    if (isCorrect) this.quizScore++

    this.showFeedback(isCorrect, question, selectedOption)
  }

  private showFeedback(isCorrect: boolean, question: any, selectedIndex: number) {
    this.questionScreen.classList.add('hidden')
    this.feedbackScreen.classList.remove('hidden')

    let feedbackHTML = ''
    if (isCorrect) {
      feedbackHTML = `<div class="quiz-feedback-correct">✅ <strong>Correct!</strong></div>`
    } else {
      feedbackHTML = `<div class="quiz-feedback-incorrect">❌ <strong>Incorrect.</strong></div>`
    }
    feedbackHTML += `<p>${question.explanation}</p>`
    
    this.feedbackContent.innerHTML = feedbackHTML
  }

  private nextQuestion() {
    this.currentQuizQuestion++
    if (this.currentQuizQuestion < this.selectedQuizQuestions.length) {
      this.feedbackScreen.classList.add('hidden')
      this.questionScreen.classList.remove('hidden')
      this.displayQuestion(this.currentQuizQuestion)
    } else {
      this.endQuiz()
    }
  }

  private calculateGrade(): {letter: string, percentage: number} {
    // Handle case where quiz hasn't started or has no questions
    if (this.selectedQuizQuestions.length === 0) {
      return {letter: 'F', percentage: 0}
    }
    const percentage = (this.quizScore / this.selectedQuizQuestions.length) * 100
    if (percentage >= 90) return {letter: 'A', percentage}
    if (percentage >= 80) return {letter: 'B', percentage}
    if (percentage >= 70) return {letter: 'C', percentage}
    if (percentage >= 60) return {letter: 'D', percentage}
    return {letter: 'F', percentage}
  }

  private endQuiz() {
    console.warn('endQuiz called');
    try {
      this.isQuizActive = false
      // Show throbber for loading effect
      this.showThrobber()
      
      const grade = this.calculateGrade()
      
      this.questionScreen.classList.add('hidden')
      this.feedbackScreen.classList.add('hidden')
      
      // After a short delay, show results and hide throbber
      setTimeout(() => {
        this.hideThrobber()
        this.resultsScreen.classList.remove('hidden')
        
        this.quizScoreSpan.textContent = this.quizScore.toString()
        this.quizPercentageSpan.textContent = `${grade.percentage.toFixed(1)}%`
        this.gradePercentage.textContent = `${grade.percentage.toFixed(1)}%`
        this.gradeLetter.textContent = grade.letter

        this.animateGradeCircle(grade.percentage)
      }, 800)
    } catch (error) {
      console.error('Error in endQuiz:', error)
    }
  }

  private showThrobber() {
    console.warn('showThrobber called, throbber:', this.throbber)
    // Reset any inline styles
    this.throbber.style.opacity = ''
    this.throbber.style.transform = ''
    this.throbber.classList.remove('hidden')
    console.warn('hidden class removed, current classes:', this.throbber.className)
    // Force reflow to ensure transition works
    void this.throbber.offsetWidth
    console.warn('throbber shown')
  }

  private hideThrobber() {
    console.warn('hideThrobber called')
    // Start fade out
    this.throbber.style.opacity = '0'
    console.warn('opacity set to 0')
    setTimeout(() => {
      console.warn('adding hidden class')
      this.throbber.classList.add('hidden')
      // Reset opacity for next show
      this.throbber.style.opacity = ''
    }, 300) // Wait for transition to complete
  }

  private animateGradeCircle(targetPercentage: number) {
    if (!this.progressRingForeground) return
    
    const circumference = 2 * Math.PI * 54
    const targetOffset = circumference - (targetPercentage / 100) * circumference
    
    this.progressRingForeground.style.transition = 'stroke-dashoffset 2s ease-out'
    this.progressRingForeground.style.strokeDashoffset = targetOffset.toString()
  }

  private retryQuiz() {
    this.resultsScreen.classList.add('hidden')
    this.startScreen.classList.remove('hidden')
    this.hideThrobber()
  }

  private handleKeydown(e: KeyboardEvent) {
    console.log('Quiz keydown:', e.key, 'isQuizActive:', this.isQuizActive, 'questionScreen hidden:', this.questionScreen.classList.contains('hidden'), 'feedbackScreen hidden:', this.feedbackScreen.classList.contains('hidden'))
    if (e.key === 'Enter') {
      e.preventDefault() // Prevent default form submission behavior
      if (!this.questionScreen.classList.contains('hidden') && !this.submitButton.disabled) {
        console.log('Enter key: submitting answer')
        this.submitAnswer()
      } else if (!this.feedbackScreen.classList.contains('hidden')) {
        console.log('Enter key: moving to next question')
        this.nextQuestion()
      }
    }
  }
}

// Export Quiz class to window for debugging
(window as any).Quiz = Quiz;

function initQuiz() {
  console.log('Quiz init function called');
  const containers = document.querySelectorAll<HTMLElement>('[data-quiz="true"]')
  console.log('Found quiz containers:', containers.length);
  containers.forEach((container, i) => {
    console.log('Creating Quiz instance for container', i);
    new Quiz(container);
  })
}

// Try multiple initialization strategies
document.addEventListener('nav', initQuiz);

// Fallback for static pages without nav event
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQuiz);
} else {
  // DOM already loaded, initialize immediately
  setTimeout(initQuiz, 0);
}