import React, { useState, useEffect } from 'react';

const Draw = ({ deck }) => {
  const [deckCount, setDeckCount] = useState(deck.remaining)
  const [pile, setPile] = useState([])

  const drawCard = () => {
    const url = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
    fetch(url)
      .then(res => res.json())
      .then(data => { 
        setPile(data.cards[0].images.svg)
        setDeckCount(data.remaining)
      })
  }

  return(
    <div>
      {deckCount === 0 
        ? (<div>
            <button>Get a new deck</button>
            <h1>No more Cards!</h1>
          </div>)
        
        : (<div>
            <button onClick={drawCard}>Draw a Card</button>
            <img src={pile} alt='card'/>
          </div>)
      }
    </div>
  )
}

export default Draw