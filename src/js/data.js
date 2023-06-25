import gbpFlag from '../img/flags/gbp.png';
import eurFlag from '../img/flags/eur.png';
import usdFlag from '../img/flags/usd.png';
import audFlag from '../img/flags/aud.png';
import bgnFlag from '../img/flags/bgn.png';
import cadFlag from '../img/flags/cad.png';
import chfFlag from '../img/flags/chf.png';
import czkFlag from '../img/flags/czk.png';
import dkkFlag from '../img/flags/dkk.png';
import hrkFlag from '../img/flags/hrk.png';
import jpyFlag from '../img/flags/jpy.png';
import nokFlag from '../img/flags/nok.png';
import plnFlag from '../img/flags/pln.png';
import ronFlag from '../img/flags/ron.png';
import rsdFlag from '../img/flags/rsd.png';
import rubFlag from '../img/flags/rub.png';
import sekFlag from '../img/flags/sek.png';
import tryFlag from '../img/flags/try.png';
import uahFlag from '../img/flags/uah.png';

export const allBanks = [
    //the most important banks on the top of the list
    { status: true, id: 'mnb', bank: 'Magyar Nemzeti Bank' },
    { status: true, id: 'raiffeisen', bank: 'Raiffeisen Bank' },
    { status: true, id: 'erste', bank: 'Erste Bank' },
    //and the rest
    { status: true, id: 'akcenta', bank: 'Akcenta' },
    { status: false, id: 'allianz', bank: 'Allianz Bank' },
    { status: false, id: 'banco', bank: 'Banco' },
    { status: false, id: 'bb', bank: 'Budapest Bank' },
    { status: false, id: 'b3takarek', bank: 'B3 Takarék Bank' },
    { status: true, id: 'cib', bank: 'CIB Bank' },
    { status: false, id: 'citybank', bank: 'Citibank' },
    { status: false, id: 'commerz', bank: 'Commerzbank' },
    { status: false, id: 'dtbank', bank: 'DT Bank' },
    { status: false, id: 'evo', bank: 'EVO Bank' },
    { status: false, id: 'fhb', bank: 'FHB Bank' },
    { status: true, id: 'granit', bank: 'Granit Bank' },
    { status: false, id: 'hanwha', bank: 'Hanwha Bank' },
    { status: false, id: 'ing', bank: 'ING Bank' },
    { status: true, id: 'kdb', bank: 'KDB Bank' },
    { status: true, id: 'kh', bank: 'Kereskedelmi és Hitelbank' },
    { status: false, id: 'kinizsi', bank: 'Kinizsi Bank' },
    { status: true, id: 'magnet', bank: 'Magnet Bank' },
    { status: true, id: 'mfb', bank: 'Magyar Fejlesztési Bank' },
    { status: true, id: 'mkb', bank: 'Magyar Külkereskedelmi Bank' },
    { status: false, id: 'mtb', bank: 'MTB Bank' },
    { status: false, id: 'nhb', bank: 'NHB Bank' },
    { status: true, id: 'oberbank', bank: 'Oberbank' },
    { status: true, id: 'otp', bank: 'OTP Bank' },
    { status: true, id: 'polgari', bank: 'Polgári Bank' },
    { status: false, id: 'sberbank', bank: 'Sberbank' },
    { status: false, id: 'sopron', bank: 'Sopron Bank' },
    { status: false, id: 'szechenyi', bank: 'Széchenyi Bank' },
    { status: true, id: 'unicredit', bank: 'UniCredit Bank' },
    { status: false, id: 'volksbank', bank: 'Volksbank' },
];

export const currencies = [
    { code: "AUD", name: "Australian Dollar", src: audFlag },
    { code: "BGN", name: "Bulgarian Lev", src: bgnFlag },
    { code: "CAD", name: "Canadian Dollar", src: cadFlag },
    { code: "CHF", name: "Swiss Franc", src: chfFlag },
    { code: "CZK", name: "Czech Koruna", src: czkFlag },
    { code: "DKK", name: "Danish Krone", src: dkkFlag },
    { code: "EUR", name: "Euro", src: eurFlag },
    { code: "GBP", name: "British Pound", src: gbpFlag },
    { code: "HRK", name: "Croatian Kuna", src: hrkFlag },
    { code: "JPY", name: "Japanese Yen", src: jpyFlag },
    { code: "NOK", name: "Norwegian Krone", src: nokFlag },
    { code: "PLN", name: "Polish Zloty", src: plnFlag },
    { code: "RON", name: "Romanian Leu", src: ronFlag },
    { code: "RSD", name: "Serbian Dinar", src: rsdFlag },
    { code: "RUB", name: "Russian Ruble", src: rubFlag },
    { code: "SEK", name: "Swedish Krona", src: sekFlag },
    { code: "TRY", name: "Turkish Lira", src: tryFlag },
    { code: "UAH", name: "Ukrainian Hryvnia", src: uahFlag },
    { code: "USD", name: "United States Dollar", src: usdFlag }
];

