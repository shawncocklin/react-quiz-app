import React from 'react'
import parse from 'html-react-parser'

export default function Question(props) {
  const answers = props.answers.map((answer) => {
    return (
      <button
        type="button"
        className="btn answer fs-200"
      >
        {parse(answer)}
      </button>
    )
  })

  return (
    <div className="flow">
      <p className="fs-400 fw-bold ff-headings">{parse(props.question)}</p>
      <div className="answer-group flex">{answers}</div>
    </div>
  )
}
