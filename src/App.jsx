import { useEffect, useRef, useState } from 'react'
import './App.css'

export default function App() {
  const [chars, setChars] = useState([])
  const [loading, setLoading] = useState(false)
  const ref = useRef();
  const loadChars = () => {
    const controller = new AbortController();
    ref.current = controller;
    setChars([]);
    setLoading(true);
    console.log('start')
    let aborted = false;

    fetch('https://rickandmortyapi.com/api/character', { signal: ref.current.signal })
      .then(resp => resp.json())
      .then(data => {
        setChars(data.results)
      })
      .catch(e => {
        //debugger
        if (e.name == 'AbortError')
          aborted = true;
      })
      .finally((e) => {
        //debugger
        if (!aborted)
          setLoading(false)
      })
  }

  const clickHandler = () => {
    ref.current && ref.current.abort('добровольно')
    loadChars();
  }


  return (

    <main>
      <div>
        <button onClick={clickHandler}>start</button>
        {
          loading && <span>загрузка</span>
        }
      </div>
      <div>
        <button>1</button>
      </div>

      <div>
        <button>2</button>
      </div>

      <div>
        <button>3</button>
      </div>
      {
        chars.map(c => <div key={c.id}>{c.name}</div>)
      }
    </main>
  )
}
