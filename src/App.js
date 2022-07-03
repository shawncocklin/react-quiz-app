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
        isSelectedCorrect={false}
      />
    )
  })
  return <main className="flow">{questElems}</main>
}

export default App
