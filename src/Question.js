import React, { useState } from 'react'
import Answer from './Answer'
import parse from 'html-react-parser'
import { nanoid } from 'nanoid'

export default function Question(props) {
  const [allAnswers, setAllAnswers] = useState(generateAnswerGroup())

  function generateAnswerGroup() {
    const answerGroup = []
    for (let i = 0; i < 4; i++) {
      answerGroup.push(generateSingleAnswer(props.answers[i]))
    }
    return answerGroup
  }

  function generateSingleAnswer(answerText) {
    return {
      text: parse(answerText),
      id: nanoid(),
      isSelected: false,
      isCorrect: answerText === props.correctAnswer ? true : false,
    }
  }

  console.log(allAnswers)

  function toggleSelected(id) {
    setAllAnswers((prevAnswer) => {
      return prevAnswer.map((answer) => {
        return answer.id === id
          ? {
              ...answer,
              isSelected: !answer.isSelected,
            }
          : {
              ...answer,
              isSelected: false,
            }
      })
    })
  }

  const answerElems = allAnswers.map((answer) => {
    return (
      <Answer
        key={nanoid()}
        id={answer.id}
        type="button"
        answer={answer.text}
        isSelected={answer.isSelected}
        className="btn answer fs-200"
        toggleSelected={toggleSelected}
      />
    )
  })

  return (
    <div className="flow">
      <p className="fs-400 fw-bold ff-headings">{parse(props.question)}</p>
      <div className="answer-group flex">{answerElems}</div>
    </div>
  )
}
