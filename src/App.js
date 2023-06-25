import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { allBanks, currencies } from './js/data'
import './css/app.css'

import gbpFlag from './img/flags/gbp.png';
import eurFlag from './img/flags/eur.png';
import usdFlag from './img/flags/usd.png';

const flags = [gbpFlag, eurFlag, usdFlag];

const isLocalServer = !true;
const url = isLocalServer ? 'http://localhost:8000/deviza' : 'https://napiarfolyam-3e2954a40ab4.herokuapp.com/deviza';

export default function App() {

  const displayOnTop = ['GBP', 'EUR', 'USD'];
  const [midValues, setMidValues] = useState({});

  const [fetchedData, setFetchedData] = useState([]);
  const [currentBank, setCurrentBank] = useState('mnb');

  const [date, setDate] = useState(null);


  const fetchData = async () => {
    try {
      const response = await Axios.get(url);
      const result = await response.data;
      setFetchedData(result);
      let lastUpdate = result
        .find(item => item.bank === 'mnb' && item.penznem === 'GBP').datum
        .split(' ')[0]
        .split('-')
        .join('.')
      setDate(lastUpdate);

      let newMidValues = {};
      displayOnTop.forEach((currency, index) => {
        let newKozep = Number(result.find(item => item.bank === currentBank && item.penznem === currency).kozep);
        if (newKozep) {
          newMidValues[currency] = Number(newKozep.toFixed(2));
        } else {
          let newVetel = Number(result.find(item => item.bank === currentBank && item.penznem === currency).vetel);
          let newEladas = Number(result.find(item => item.bank === currentBank && item.penznem === currency).eladas);
          newMidValues[currency] = Number(((newVetel + newEladas) / 2).toFixed(2));
        }
      });

      setMidValues(newMidValues);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleBankChange = (e) => {
    const selectedBank = e.target.options[e.target.selectedIndex].getAttribute('id');
    setCurrentBank(selectedBank);

    let newMidValues = {};
    displayOnTop.forEach((currency, index) => {
      let newKozep = Number(fetchedData.find(item => item.bank === selectedBank && item.penznem === currency).kozep);
      if (newKozep) {
        newMidValues[currency] = Number(newKozep.toFixed(2));
      } else {
        let newVetel = Number(fetchedData.find(item => item.bank === selectedBank && item.penznem === currency).vetel);
        let newEladas = Number(fetchedData.find(item => item.bank === selectedBank && item.penznem === currency).eladas);
        newMidValues[currency] = Number(((newVetel + newEladas) / 2).toFixed(2));
      }
    });

    setMidValues(newMidValues);
  }

  return (
    <div className="App" >
      <header>
        <div className='line-1'>
          <select onChange={handleBankChange}>
            {allBanks
              .filter(item => item.status)
              .map((item, index) => (
                <option key={index} id={item.id}>{item.bank}</option>
              ))}
          </select>
          <span>{date ? date : 'Loading...'}</span>
        </div>
        <section>
          {displayOnTop.map((item, index) => (
            <div key={index}>
              <h4>
                <img className='thumbnail' src={flags[index]} alt={item}></img> <span>{item}</span>
              </h4>
              <h4>
                {midValues[item] ? String(midValues[item]).split('.').join(',') : 'Loading...'}
              </h4>
            </div>
          ))}
        </section>
      </header>
      <table>
        <thead>
          <tr>
            <th>Deviza</th>
            <th>Vétel</th>
            <th>Közép</th>
            <th>Eladás</th>
            <th className='datum'>Dátum</th>
          </tr>
        </thead>

        <tbody>
          {fetchedData
            .filter(item => item.bank === currentBank)
            .sort((a, b) => a.penznem.localeCompare(b.penznem))
            .map((item, index) => (
              <tr key={index}>
                <td className='penznem'>
                  <img className='thumbnail' src={currencies.find(cur => cur.code.toUpperCase() === item.penznem).src} alt={item.src} />
                  {item.penznem}
                </td>
                <td className='vetel'>
                  {item.vetel ? Number(item.vetel).toFixed(2).split('.').join(',') : '-'}
                  {item.vetel ? <span className='huf'>HUF</span> : false}
                </td>
                <td className='kozep'>
                  {item.kozep ? Number(item.kozep).toFixed(2).split('.').join(',') : ((Number(item.eladas) + Number(item.vetel)) / 2).toFixed(2).split('.').join(',')}
                  {item.kozep ? <span className='huf'>HUF</span> : false}
                </td>
                <td className='eladas'>
                  {item.eladas ? Number(item.eladas).toFixed(2).split('.').join(',') : '-'}
                  {item.eladas ? <span className='huf'>HUF</span> : false}
                </td>
                <td className='datum'>{item.datum.split(" ")[0].split('-').join('.')}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div >
  );
}


