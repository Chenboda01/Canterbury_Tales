import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/quiz.inline"
// @ts-ignore
import styles from "./styles/quiz.scss"

type Options = {}

export default ((opts: Options = {}) => {
  const Quiz: QuartzComponent = ({ displayClass, fileData: _fileData, cfg: _cfg }: QuartzComponentProps) => {
    return (
      <div 
        class={classNames(displayClass, "quartz-quiz")}
        data-quiz="true"
      >
        <div class="quiz-container">
          <div class="quiz-header">
            <h3>📝 Canterbury Tales Quiz</h3>
            <p class="quiz-subtitle">Test your knowledge of The Nun's Priest's Tale</p>
          </div>
          
          <div class="quiz-content">
            <div class="quiz-start-screen">
              <p>This quiz includes <strong>10 random questions</strong> from a pool of 15 questions about characters, plot, and themes.</p>
              <p>Grading: A (90-100%), B (80-89%), C (70-79%), D (60-69%), F (below 60%)</p>
              <button class="quiz-start-button">Start Quiz</button>
            </div>
            
            <div class="quiz-question-screen hidden">
              <div class="quiz-progress">
                <div class="quiz-progress-bar"></div>
                <div class="quiz-progress-text">Question <span class="quiz-current">1</span> of 10</div>
              </div>
              
              <div class="quiz-question">
                <h4 class="quiz-question-text"></h4>
                <div class="quiz-options">
                  <div class="quiz-option" data-index="0">
                    <span class="quiz-option-number">1</span>
                    <span class="quiz-option-text"></span>
                  </div>
                  <div class="quiz-option" data-index="1">
                    <span class="quiz-option-number">2</span>
                    <span class="quiz-option-text"></span>
                  </div>
                  <div class="quiz-option" data-index="2">
                    <span class="quiz-option-number">3</span>
                    <span class="quiz-option-text"></span>
                  </div>
                  <div class="quiz-option" data-index="3">
                    <span class="quiz-option-number">4</span>
                    <span class="quiz-option-text"></span>
                  </div>
                </div>
              </div>
              
              <div class="quiz-controls">
                <button class="quiz-submit-button" disabled>Submit Answer</button>
              </div>
            </div>
            
            <div class="quiz-feedback-screen hidden">
              <div class="quiz-feedback-content"></div>
              <button class="quiz-next-button">Next Question</button>
            </div>
            
            <div class="quiz-results-screen hidden">
              <div class="quiz-grade">
                <div class="quiz-grade-circle">
                  <svg class="quiz-progress-ring" width="120" height="120">
                    <circle class="quiz-progress-ring-background" cx="60" cy="60" r="54" stroke-width="8" fill="transparent"/>
                    <circle class="quiz-progress-ring-foreground" cx="60" cy="60" r="54" stroke-width="8" fill="transparent" stroke-dasharray="339.292" stroke-dashoffset="339.292"/>
                  </svg>
                  <div class="quiz-grade-percentage">0%</div>
                  <div class="quiz-grade-letter">F</div>
                </div>
                <h4 class="quiz-grade-title">Your Grade</h4>
                <p class="quiz-grade-details">You scored <span class="quiz-score">0</span> out of 10 (<span class="quiz-percentage">0%</span>)</p>
              </div>
              
              <div class="quiz-encouragement">
                <p class="quiz-encouragement-text">Ready to try again?</p>
                <button class="quiz-retry-button">I'm Ready!</button>
              </div>
            </div>
          </div>
          
          <div class="quiz-footer">
            <small>Individual quiz experience • Questions randomly selected</small>
          </div>
        </div>
      </div>
    )
  }

  Quiz.afterDOMLoaded = script
  Quiz.css = styles

  return Quiz
}) satisfies QuartzComponentConstructor<Options>