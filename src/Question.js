import React, { useState } from 'react'
import Answer from './Answer'
import parse from 'html-react-parser'
import { nanoid } from 'nanoid'

export default function Question(props) {
  function toggleSelected(id) {
    props.setAllAnswers((prevAnswer) => {
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

  // console.log(props.allAnswers)

  const answerElems = props.allAnswers.map((answer, index) => {
    console.log(answer)
    let answerText
    answer.text.map((item) => (answerText = item[index + 1]))
    return (
      <Answer
        key={nanoid()}
        id={answer.id}
        type="button"
        answer={answerText}
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
