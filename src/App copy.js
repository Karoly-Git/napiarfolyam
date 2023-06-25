import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { allBanks, currencies } from './js/data';
import './css/app.css';

import gbpFlag from './img/flags/gbp.png';
import eurFlag from './img/flags/eur.png';
import usdx from './img/flags/usd.png';

const isLocalServer = !true;
const url = isLocalServer ? 'http://localhost:8000/deviza' : 'https://napiarfolyam-3e2954a40ab4.herokuapp.com/deviza';

const getCurrencyData = (dataDeviza, bank, currency) => {
  return dataDeviza.find(item => item.bank === bank && item.penznem === currency);
};

const calculateMidValue = (dataDeviza, bank, currency) => {
  const currencyData = getCurrencyData(dataDeviza, bank, currency);
  if (currencyData) {
    const { kozep, vetel, eladas } = currencyData;
    if (kozep) {
      return Number(kozep.toFixed(2));
    } else {
      const midValue = (Number(vetel) + Number(eladas)) / 2;
      return Number(midValue.toFixed(2));
    }
  }
  return null;
};

export default function App() {
  const displayOnTop = ['GBP', 'EUR', 'USD'];
  const [midValues, setMidValues] = useState({});
  const [dataDeviza, setDataDeviza] = useState([]);
  const [currentBank, setCurrentBank] = useState('mnb');

  const fetchData = async () => {
    try {
      const response = await Axios.get(url);
      const result = response.data;
      setDataDeviza(result);

      const newMidValues = {};
      displayOnTop.forEach(currency => {
        const newMidValue = calculateMidValue(result, currentBank, currency);
        if (newMidValue) {
          newMidValues[currency] = newMidValue;
        }
      });

      setMidValues(newMidValues);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBankChange = (e) => {
    const selectedBank = e.target.options[e.target.selectedIndex].getAttribute('id');
    setCurrentBank(selectedBank);

    const newMidValues = {};
    displayOnTop.forEach(currency => {
      const newMidValue = calculateMidValue(dataDeviza, selectedBank, currency);
      if (newMidValue) {
        newMidValues[currency] = newMidValue;
      }
    });

    setMidValues(newMidValues);
  };

  return (
    <div className="App">
      <header>
        <select onChange={handleBankChange}>
          {allBanks
            .filter(item => item.status)
            .map((item, index) => (
              <option key={index} id={item.id}>{item.bank}</option>
            ))}
        </select>
        <section>
          <div>
            <h4>
              <img className='thumbnail' src={gbpFlag} alt='GBP' /> <span>Font</span>
            </h4>
            <h4>{midValues.GBP} HUF</h4>
          </div>
          <div>
            <h4>
              <img className='thumbnail' src={eurFlag} alt='EUR' /> Euró
            </h4>
            <h4>{midValues.EUR} HUF</h4>
          </div>
          <div>
            <h4>
              <img className='thumbnail' src={usdx} alt='USD' /> Dollár
            </h4>
            <h4>{midValues.USD} HUF</h4>
          </div>
        </section>
      </header>
      <table>
        <thead>
          <tr>
            <th>Pénznem</th>
            <th>Vétel</th>
            <th>Közép</th>
            <th>Eladás</th>
            <th className='datumm'>Dátum</th>
          </tr>
        </thead>
        <tbody>
          {dataDeviza
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
                  {item.vetel && <span className='huf'>HUF</span>}
                </td>
                <td className='kozep'>
                  {item.kozep ? Number(item.kozep).toFixed(2).split('.').join(',') : ((Number(item.eladas) + Number(item.vetel)) / 2).toFixed(2).split('.').join(',')}
                  <span className='huf'>HUF</span>
                </td>
                <td className='eladas'>
                  {item.eladas ? Number(item.eladas).toFixed(2).split('.').join(',') : '-'}
                  {item.eladas && <span className='huf'>HUF</span>}
                </td>
                <td className='datumm'>{item.datum.split(" ")[0].split('-').join('.')}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
