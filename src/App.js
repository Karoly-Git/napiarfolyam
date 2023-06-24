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

  const [dataDeviza, setDataDeviza] = useState([]);
  const [currentBank, setCurrentBank] = useState('mnb');

  const [kozepGBP, setKozepGBP] = useState(0);
  const [kozepEUR, setKozepEUR] = useState(0);
  const [kozepUSD, setKozepUSD] = useState(0);

  let isLocalServer = !true;

  let url = isLocalServer ? 'http://localhost:8000/deviza' : 'https://napiarfolyam-3e2954a40ab4.herokuapp.com/deviza';

  const fetchData = () => {
    Axios.get(url)
      .then(result => {
        setDataDeviza(result.data);
        setKozepGBP(Number(result.data.find(item => item.bank === 'mnb' && item.penznem === 'GBP').kozep));
        setKozepEUR(Number(result.data.find(item => item.bank === 'mnb' && item.penznem === 'EUR').kozep));
        setKozepUSD(Number(result.data.find(item => item.bank === 'mnb' && item.penznem === 'USD').kozep));
      })
  }

  useEffect(() => {
    fetchData();
  }, [])


  const handleBankChange = (e) => {
    const selectedBank = e.target.options[e.target.selectedIndex].getAttribute('id');

    let vetelGBP = Number(dataDeviza.find(item => item.bank === selectedBank && item.penznem === 'GBP').vetel);
    let eladasGBP = Number(dataDeviza.find(item => item.bank === selectedBank && item.penznem === 'GBP').eladas);
    let kozepGBP = Number(dataDeviza.find(item => item.bank === selectedBank && item.penznem === 'GBP').kozep);

    let vetelEUR = Number(dataDeviza.find(item => item.bank === selectedBank && item.penznem === 'EUR').vetel);
    let eladasEUR = Number(dataDeviza.find(item => item.bank === selectedBank && item.penznem === 'EUR').eladas);
    let kozepEUR = Number(dataDeviza.find(item => item.bank === selectedBank && item.penznem === 'EUR').kozep);

    let vetelUSD = Number(dataDeviza.find(item => item.bank === selectedBank && item.penznem === 'USD').vetel);
    let eladasUSD = Number(dataDeviza.find(item => item.bank === selectedBank && item.penznem === 'USD').eladas);
    let kozepUSD = Number(dataDeviza.find(item => item.bank === selectedBank && item.penznem === 'USD').kozep);

    setKozepGBP(kozepGBP ? kozepGBP = kozepGBP : kozepGBP = (vetelGBP + eladasGBP) / 2);
    setKozepEUR(kozepEUR ? kozepEUR = kozepEUR : kozepEUR = (vetelEUR + eladasEUR) / 2);
    setKozepUSD(kozepUSD ? kozepUSD = kozepUSD : kozepUSD = (vetelUSD + eladasUSD) / 2);

    setCurrentBank(selectedBank);
  }

  let mnbEur = dataDeviza.find(
    item => item.bank === currentBank && item.penznem === 'EUR'
  );

  let mnbUsd = dataDeviza.find(
    item => item.bank === currentBank && item.penznem === 'USD'
  );

  return (
    <div className="App" >
      <header>
        <select onChange={handleBankChange}>
          {allBanks
            .map((item, index) => <option key={index} id={item.id}>{item.bank}</option>)
          }
        </select>
        <section>
          <div>
            <h4>
              <img className='thumbnail' src={gbpx} alt='GBP'></img> Font
            </h4>
            <h4>
              {kozepGBP ? Number(kozepGBP).toFixed(2).split('.').join(',') + ' HUF' : 'Loading...'}
            </h4>
          </div>
          <div>
            <h4>
              <img className='thumbnail' src={eurx} alt='EUR'></img> Euro
            </h4>
            <h4>
              {kozepEUR ? Number(kozepEUR).toFixed(2).split('.').join(',') + ' HUF' : 'Loading...'}
            </h4>
          </div>
          <div>
            <h4>
              <img className='thumbnail' src={usdx} alt='USD'></img> Dollár
            </h4>
            <h4>
              {kozepUSD ? Number(kozepUSD).toFixed(2).split('.').join(',') + ' HUF' : 'Loading...'}
            </h4>
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
                <td className='vetel'>{item.vetel ? Number(item.vetel).toFixed(2).split('.').join(',') : '-'} {item.vetel ? <span className='huf'>HUF</span> : ''}</td>
                <td className='kozep'>{item.kozep ? Number(item.kozep).toFixed(2).split('.').join(',') : ((Number(item.eladas) + Number(item.vetel)) / 2).toFixed(2).split('.').join(',')} <span className='huf'>HUF</span></td>
                <td className='eladas'>{item.eladas ? Number(item.eladas).toFixed(2).split('.').join(',') : '-'} {item.eladas ? <span className='huf'>HUF</span> : ''}</td>
                <td className='datumm'>{item.datum.split(" ")[0].split('-').join('.')}</td>
              </tr>
            ))}
        </tbody>

      </table>
    </div >
  )
}


