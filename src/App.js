import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { allBanks } from './js/data'
import './css/app.css'

import audx from './img/flags/aud.png';
import bgnx from './img/flags/bgn.png';
import cadx from './img/flags/cad.png';
import chfx from './img/flags/chf.png';
import czkx from './img/flags/czk.png';
import dkkx from './img/flags/dkk.png';
import eurx from './img/flags/eur.png';
import gbpx from './img/flags/gbp.png';
import hrkx from './img/flags/hrk.png';
import jpyx from './img/flags/jpy.png';
import nokx from './img/flags/nok.png';
import plnx from './img/flags/pln.png';
import ronx from './img/flags/ron.png';
import rsdx from './img/flags/rsd.png';
import rubx from './img/flags/rub.png';
import sekx from './img/flags/sek.png';
import tryx from './img/flags/try.png';
import uahx from './img/flags/uah.png';
import usdx from './img/flags/usd.png';

let currencies = [
  { code: "AUD", name: "Australian Dollar", src: audx },
  { code: "BGN", name: "Bulgarian Lev", src: bgnx },
  { code: "CAD", name: "Canadian Dollar", src: cadx },
  { code: "CHF", name: "Swiss Franc", src: chfx },
  { code: "CZK", name: "Czech Koruna", src: czkx },
  { code: "DKK", name: "Danish Krone", src: dkkx },
  { code: "EUR", name: "Euro", src: eurx },
  { code: "GBP", name: "British Pound", src: gbpx },
  { code: "HRK", name: "Croatian Kuna", src: hrkx },
  { code: "JPY", name: "Japanese Yen", src: jpyx },
  { code: "NOK", name: "Norwegian Krone", src: nokx },
  { code: "PLN", name: "Polish Zloty", src: plnx },
  { code: "RON", name: "Romanian Leu", src: ronx },
  { code: "RSD", name: "Serbian Dinar", src: rsdx },
  { code: "RUB", name: "Russian Ruble", src: rubx },
  { code: "SEK", name: "Swedish Krona", src: sekx },
  { code: "TRY", name: "Turkish Lira", src: tryx },
  { code: "UAH", name: "Ukrainian Hryvnia", src: uahx },
  { code: "USD", name: "United States Dollar", src: usdx }
];


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
            GBP/HUF
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
              <td className='penznem'>
                <img src={currencies.find(cur => cur.code.toUpperCase() === item.penznem).src} alt={item.src} />
                {item.penznem}
              </td>
              <td className='vetel'>{item.vetel ? Number(item.vetel).toFixed(2) : '-'} {item.vetel ? <span className='huf'>HUF</span> : ''}</td>
              <td className='kozep'>{item.kozep ? Number(item.kozep).toFixed(2) : ((Number(item.eladas) + Number(item.vetel)) / 2).toFixed(2)} <span className='huf'>HUF</span></td>
              <td className='eladas'>{item.eladas ? Number(item.eladas).toFixed(2) : '-'} {item.eladas ? <span className='huf'>HUF</span> : ''}</td>
              <td className='datum'>{item.datum.split(" ")[0].split('-').join('.')}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div >
  )
}


