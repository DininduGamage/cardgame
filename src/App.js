import React, { useState, useEffect } from 'react'
import Card from './Card'
import './App.css'

const images = ['😀', '😂', '😎', '🤩']

function App() {
  const maxAttempts = 6
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [attempts, setAttempts] = useState(0)
  const [matches, setMatches] = useState(0)

  useEffect(() => {
    resetGame()
  }, [])

  function resetGame() {
    const shuffledImages = shuffleArray(images.concat(images))
    const initialCards = shuffledImages.map((image, index) => ({
      id: index,
      image,
      flipped: false,
      matched: false,
    }))
    setCards(initialCards)
    setFlippedCards([])
    setAttempts(0)
    setMatches(0)
  }

  function shuffleArray(array) {
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
    }
    return shuffledArray
  }

  function handleCardClick(id) {
    if (flippedCards.length === 2 || flippedCards.includes(id)) return

    const newCards = cards.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    )
    setCards(newCards)
    setFlippedCards([...flippedCards, id])

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards
      const secondCard = id

      if (newCards[firstCard].image === newCards[secondCard].image) {
        setMatches(matches + 1)
        setFlippedCards([])
        newCards[firstCard].matched = true
        newCards[secondCard].matched = true
      } else {
        setTimeout(() => {
          setCards(cards.map(card =>
            card.flipped && !card.matched ? { ...card, flipped: false } : card
          ))
          setFlippedCards([])
          setAttempts(attempts + 1)
        }, 1000)
      }
    }
  }

  function handlePlayAgainClick() {
    resetGame()
  }

  const attemptsRemaining = maxAttempts - attempts
  const gameStatus = matches === images.length ? `Congratulations! You won in ${attempts} Attempts!` : attempts >= maxAttempts ? 'You Lost. Try Again!' : `Attempts Remaining: ${attemptsRemaining}`

  return (
    <div className="game">
      <div className="cards-container">
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            flipped={card.flipped}
            matched={card.matched}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <div className="status">{gameStatus}</div>
      {(matches === images.length || attempts >= maxAttempts) && (<button onClick={handlePlayAgainClick}>Play Again</button>
      )}
    </div>
  )
}

export default App;