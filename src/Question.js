import React, { useState } from 'react'
import Answer from './Answer'
import parse from 'html-react-parser'
import { nanoid } from 'nanoid'

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = useState(generateAnswerGroup())

  function generateAnswerGroup() {
    const answerGroup = []
    for (let i = 0; i < 4; i++) {
      answerGroup.push(generateSingleAnswer(props.answers[i]))
    }
    return answerGroup
  }

  function generateSingleAnswer(answerText) {
    return {
      text: answerText,
      id: nanoid(),
      isSelected: false,
    }
  }

  function toggleSelected(id) {
    setSelectedAnswer((prevAnswer) => {
      return prevAnswer.map((answer) => {
        return answer.id === id
          ? {
              ...answer,
              isSelected: !answer.isSelected,
            }
          : answer
      })
    })
    console.log('clciked')
  }

  console.log(selectedAnswer)

  const answerElems = selectedAnswer.map((answer) => {
    // console.log(answer)
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
