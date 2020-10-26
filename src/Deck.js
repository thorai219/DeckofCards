import React, { useState, useEffect } from 'react';
import Draw from './Draw'

const Deck = () => {
  const [deck, setDeck] = useState([])
  
  useEffect(() => {
    getDeck();
  }, []);

  const getDeck = () => {
    let url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setDeck(data)
      })
  }

  return(
    <div>
      <Draw deck={deck} />
    </div>
  )
}

export default Deck