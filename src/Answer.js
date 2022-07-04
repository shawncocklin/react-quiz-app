import React from 'react'
import { nanoid } from 'nanoid'

export default function Answer(props) {
  return (
    <button
      key={nanoid()}
      id={props.id}
      type="button"
      className={`${props.isSelected ? 'selected' : ''} btn answer fs-200`}
      onClick={() => props.toggleSelected(props.id)}
    >
      {props.answer}
    </button>
  )
}
