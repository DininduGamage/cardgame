import React from 'react'

function Card({ id, image, flipped, onClick }) {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`}
      onClick={() => onClick(id)}>
      {flipped && <div className="content">{image}</div>}
    </div>
  )
}

export default Card;