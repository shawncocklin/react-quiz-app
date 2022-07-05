import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import parse from 'html-react-parser'
import Question from './Question'

function App() {
  const [allQuestions, setAllQuestions] = useState([])
  const [allAnswers, setAllAnswers] = useState([])

  // let dataLoaded = false

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

  function generateAnswerGroup() {
    const answerGroup = []
    const answers = allQuestions.map((question) => {
      return [...question.incorrect_answers, question.correct_answer]
    })
    // console.log(answers)
    for (let i = 0; i < 4; i++) {
      // console.log(allQuestions[i])
      answerGroup.push(generateSingleAnswer(answers))
    }
    return answerGroup
  }

  function generateSingleAnswer(answer, index) {
    return {
      text: answer,
      id: nanoid(),
      isSelected: false,
      isCorrect: false,
    }
  }

  useEffect(() => {
    if (allQuestions.length > 0) {
      setAllAnswers(generateAnswerGroup())
    }
  }, [allQuestions])

  const questElems = allQuestions.map((question) => {
    // shuffledAnswers = answers.sort(() => Math.random() - 0.5)

    return (
      <Question
        key={nanoid()}
        question={question.question}
        correctSelected={false}
        allAnswers={allAnswers}
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
