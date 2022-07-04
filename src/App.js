import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Question from './Question'

function App() {
  const [allQuestions, setAllQuestions] = useState([])

  useEffect(() => {
    async function getQuizData() {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=5&type=multiple'
      )
      const result = await response.json()
      setAllQuestions(result.results)
    }
    getQuizData()
  }, [])

  const questElems = allQuestions.map((question) => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer]
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5)

    return (
      <Question
        key={nanoid()}
        question={question.question}
        answers={shuffledAnswers}
        correctAnswer={question.correct_answer}
        correctSelected={false}
      />
    )
  })

  return (
    <main className="flow">
      {questElems}
      <div className="flex justify-center check">
        <button className="btn btn-primary fw-semibold fs fs-100">
          Check Answers
        </button>
      </div>
    </main>
  )
}

export default App
