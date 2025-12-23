import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

const URL = 'https://script.google.com/macros/s/AKfycbz3aFm1CoXUI8m9w-pX1r_28uwdqXcS2eFDCnbra4EPKs_WuTVi3UZWyzviJFPgr_sm/exec?path=MAIN';

const Image = ({ item }) => {
  const sectionRef = useRef(null);
  const [isRendered, setIsRendered] = useState(false);

  const onIntersect = useCallback((entries) => {
    if (entries[0].isIntersecting) setIsRendered(true);
  }, []);

  useEffect(() => {
    if (sectionRef?.current) {
      const observer = new IntersectionObserver(onIntersect)
      observer.observe(sectionRef.current)

      return () => observer.disconnect();
    }
  }, [sectionRef, onIntersect]);


  return (
    <div style={{ maxHeight: '240px', width: '100%', height: '240px' }}>
      {isRendered ? (
        <img src={`${item.Folder}${item.Filename}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      ) : null}

      <div ref={sectionRef}></div>
    </div>
  )
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => setData(data?.data || []));
  }, [])

  if (!data.length) return 'Loading ...';

  return (
    <section>
      <h1>Counterfeit Currency & Document Index</h1>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        {data.map((item, index) => {
          return <Image key={index} item={item} />
        })}
      </section>
    </section>
  )
}

export default App
