// Genereert de barcodes (SVG) die in de video gebruikt worden.
const bwip = require('bwip-js');
const fs = require('fs');
const { PLAAT } = { PLAAT: { barcode: process.argv[2] || '8717662582301', nummer: process.argv[3] || 'TV-00001' } };
fs.writeFileSync('public/img/barcode-ean13.svg', bwip.toSVG({ bcid: 'ean13', text: PLAAT.barcode, scale: 3, height: 22, includetext: true, textxalign: 'center', textsize: 11 }));
fs.writeFileSync('public/img/barcode-ticket.svg', bwip.toSVG({ bcid: 'code128', text: PLAAT.nummer, scale: 2, height: 9, includetext: false }));
console.log('ok');
