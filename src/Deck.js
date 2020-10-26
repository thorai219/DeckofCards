import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Card from './Card'

const URL = 'https://deckofcardsapi.com/api/deck'

const Deck = () => {

  const [deck, setDeck] = useState(null)
  const [pile, setPile] = useState([])
  const [autoDraw, setAutoDraw] = useState(false)
  const timerRef = useRef(null)
  
  useEffect(() => {
    async function getData() {
      let newDeck = await axios.get(`${URL}/new/shuffle/`)
      setDeck(newDeck.data)
    }
    getData();
  }, [setDeck]);

  useEffect(() => {
    async function drawCard() {
      let {deck_id} = deck
      try {
        let draw = await axios.get(`${URL}/${deck_id}/draw`)

        if (draw.data.remaining === 0) {
          setAutoDraw(false);
          throw new Error('no more cards')
        }

        const card = draw.data.cards[0];

        setPile(p => [
          ...p,
          {
            id: card.code,
            name: card.suit + ' ' + card.value,
            image: card.image
          }
        ])
      } catch(err) {
        alert(err)
      }
    }

    if (autoDraw && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        await drawCard()
      }, 1000)
    }

    return () => {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [autoDraw, setAutoDraw, deck])

  const toggleAutoDraw = () => {
    setAutoDraw(auto => !auto)
  }

  const cards = pile.map(p => (
    <Card key={p.id} name ={p.name} image={p.image} />
  ))

  return(
    <div>
      {deck
        ? (<button onClick={toggleAutoDraw}>
            { autoDraw ? "Stop Drawing" : "Keep Drawing"}
          </button>)
        : null
      }
      <div>{cards}</div>
    </div>
  )
}

export default Deck