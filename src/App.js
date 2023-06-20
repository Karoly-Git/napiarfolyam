import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { allBanks } from './js/data'
import './css/app.css'

export default function App() {

  const [dataDeviza, setDataDeviza] = useState([])
  const [currentBank, setCurrentBank] = useState('mnb')

  let isLocalServer = !true;

  let url = isLocalServer ? 'http://localhost:8000/deviza' : 'https://napiarfolyam-3e2954a40ab4.herokuapp.com/deviza';

  const fetchData = () => {
    Axios.get(url)
      .then(result => {
        setDataDeviza(result.data);
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

  let sortedData = dataDeviza
    .filter(item => item.bank === currentBank)
    .sort((a, b) => a.penznem.localeCompare(b.penznem));

  const handleBankChange = (e) => {
    const selectedBank = e.target.options[e.target.selectedIndex].getAttribute('id');
    setCurrentBank(selectedBank);
  }

  let mnbGbp = dataDeviza.find(
    item => item.bank === 'mnb' && item.penznem === 'GBP'
  );

  console.log(mnbGbp);
  return (
    <div className="App" >
      <header>
        <select onChange={handleBankChange}>
          {allBanks
            .map((item, index) => (
              <option key={index} id={item.id}>{item.bank}</option>
            ))
          }
        </select>
        <div>
          <h4>
            MNB - GBP
          </h4>
          <h4>
            {mnbGbp ? Number(mnbGbp.kozep).toFixed(2) + ' HUF' : 'Loading...'}
          </h4>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>Pénznem</th>
            <th>Vétel</th>
            <th>Közép</th>
            <th>Eladás</th>
            <th className='datum'>Dátum</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td className='penznem'>{item.penznem}</td>
              <td className='vetel'>{item.vetel ? Number(item.vetel).toFixed(2) : '-'}</td>
              <td className='kozep'>{item.kozep ? Number(item.kozep) : ((Number(item.eladas) + Number(item.vetel)) / 2).toFixed(2)}</td>
              <td className='eladas'>{item.eladas ? Number(item.eladas) : '-'}</td>
              <td className='datum'>{item.datum.split(" ")[0].split('-').join('.')}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div >
  )
}







