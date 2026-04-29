import './App.css'
import { useState, useEffect } from "react"
import { CardList } from "./assets/components/Cards.jsx"

function Blog() {
  const [filteredText, setFilteredText] = useState('')
  const [entries, setEntries] = useState([])

  function handleChange(e) {
    setFilteredText(e.target.value)
  }

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/posts')
      .then((res) => res.json())
      .then((posts) => setEntries(posts));
  }, []);

  return (
    <>
      <h1>Blog de 5to y 6to</h1>

      <div className='filter'>
        <p>Buscar: </p>
        <input 
          type='text' 
          value={filteredText} 
          onChange={handleChange} 
        />
      </div>

      <CardList entries={entries} filteredText={filteredText} />
    </>
  )
}

export default Blog