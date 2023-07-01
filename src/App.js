import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { allBanks, currencies } from './js/data'

import './css/app.css'

const isLocalServer = true;
const url = isLocalServer ? 'http://localhost:8000/deviza' : 'https://napiarfolyam-3e2954a40ab4.herokuapp.com/deviza';

function concatDecimals(number, numOfDecimals = 2, decimalMark = ',') {
  let split = String(number).split('.');
  if (split.length === 1) {
    let tail = '';
    for (let i = 0; i < numOfDecimals; i++) {
      tail += '0';
    }
    return String(number) + decimalMark + tail;
  }
  if (split[1].length < numOfDecimals) {
    let difference = numOfDecimals - split[1].length;
    let tail = '';
    for (let i = 0; i < difference; i++) {
      tail += '0';
    }
    return split[0] + decimalMark + split[1].slice(0, numOfDecimals) + tail;
  }
  return split[0] + decimalMark + split[1].slice(0, numOfDecimals);
};

const getCurrencyData = (data, bank, currency) => {
  return data.find(item => item.bank === bank && item.penznem === currency);
};

const getDateOfLastUpdate = (data, bank, currency) => {
  return data
    .find(item => item.bank === bank && item.penznem === currency).datum
    .split(' ')[0]
    .split('-')
    .join('.');
};

const calculateMidValue = (data, bank, currency) => {
  const currencyData = getCurrencyData(data, bank, currency);
  if (currencyData) {
    const { kozep, vetel, eladas } = currencyData;
    if (kozep) {
      return kozep;
    } else {
      const midValue = (Number(vetel) + Number(eladas)) / 2;
      return midValue;
    }
  }
  return null;
};

export default function App() {

  const displayOnTop = ['GBP', 'EUR', 'USD'];
  const [midValues, setMidValues] = useState({});

  const [fetchedData, setFetchedData] = useState([]);
  const [currentBank, setCurrentBank] = useState('mnb');

  const [date, setDate] = useState(null);


  const fetchData = async () => {
    try {
      let response = await Axios.get(url);
      let result = response.data;
      setFetchedData(result);

      setDate(getDateOfLastUpdate(result, 'mnb', 'GBP'));

      let newMidValues = {};
      displayOnTop.forEach(currency => {
        let newMidValue = calculateMidValue(result, currentBank, currency);
        newMidValues[currency] = newMidValue;
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
    let selectedBank = e.target.options[e.target.selectedIndex].getAttribute('id');
    setCurrentBank(selectedBank);

    let newMidValues = {};
    displayOnTop.forEach(currency => {
      let newMidValue = calculateMidValue(fetchedData, selectedBank, currency);
      if (newMidValue) {
        newMidValues[currency] = newMidValue;
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
                <option key={'allBanks' + index} id={item.id}>{item.bank}</option>
              ))}
          </select>
          <span>{date ? date : 'Loading...'}</span>
        </div>
        <section>
          {displayOnTop.map((item, index) => (
            <div key={'displayOnTop' + index}>
              <h4>
                <img className='thumbnail' src={currencies.find(element => element.code === item).src} alt={item}></img> <span>{item}</span>
              </h4>
              <h4>
                {midValues[item] ? concatDecimals(midValues[item]) : 'Loading...'}
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
              <tr key={'fetchedData' + index}>
                <td className='penznem'>
                  <img className='thumbnail' src={currencies.find(cur => cur.code.toUpperCase() === item.penznem).src} alt={item.src} />
                  {item.penznem}
                </td>
                <td className='vetel'>
                  {item.vetel ? concatDecimals(item.vetel) : '-'}
                  {item.vetel ? <span className='huf'>HUF</span> : false}
                </td>
                <td className='kozep'>
                  {item.kozep ? concatDecimals(item.kozep) : concatDecimals((Number(item.eladas) + Number(item.vetel)) / 2)}
                  {item.kozep ? <span className='huf'>HUF</span> : false}
                </td>
                <td className='eladas'>
                  {item.eladas ? concatDecimals(item.eladas) : '-'}
                  {item.eladas ? <span className='huf'>HUF</span> : false}
                </td>
                <td className='datum'>{item.datum.split(" ")[0].split('-').join('.')}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <footer>
        <ul>
          <li>
            Powered by &nbsp;
            <a href="https://webdevme.co.uk"
              target="_blank"
              rel="noopener noreferrer"
            >webdevme.co.uk
            </a>
          </li>
          <li>
            Az árfolyamokat a &nbsp;
            <a href="https://napiarfolyam.hu"
              target="_blank"
              rel="noopener noreferrer"
            >napiárfolyam.hu
            </a>
            &nbsp;gyűjti
          </li>
        </ul>
      </footer>
    </div >
  );
}


