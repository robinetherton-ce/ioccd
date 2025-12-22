import { useState, useEffect } from 'react'
import './App.css'

const URL = 'https://script.google.com/macros/s/AKfycbz3aFm1CoXUI8m9w-pX1r_28uwdqXcS2eFDCnbra4EPKs_WuTVi3UZWyzviJFPgr_sm/exec?path=MAIN';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => setData(data?.data || []));
  })

  if (!data.length) return 'Loading ...';

  return (
    <section>
      <h1>Counterfeit Currency & Document Index</h1>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr'}}>
        {data.map((item, index) => {
          return (
            <div key={index} style={{ width: '100%' }}>
              <img src={`${item.Folder}${item.Filename}`} width='240px' />
            </div>
          )
        })}
      </section>
    </section>
  )
}

export default App
