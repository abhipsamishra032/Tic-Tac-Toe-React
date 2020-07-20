import React from 'react'

export const BoardBox = props => {
  return (
    <button className="board_box" onClick={props.handleBoxClick}>
      {props.value}
    </button>
  )
}