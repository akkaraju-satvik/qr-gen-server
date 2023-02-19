const qrcode = require('qrcode');
const express = require('express');
const cors = require('cors');

const v4 = require('uuid').v4;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/qr', express.static(__dirname +'/qr'));

app.post('/get-qr', async (req, res) => {
  let fileName = v4();
  if (req.body.qrType === 'textQR') {
    await qrcode.toFile(`./qr/${fileName}.png`, req.body.text);
  } else if (req.body.qrType === 'wifiQR') {
    await qrcode.toFile(`./qr/${fileName}.png`, `WIFI:T:WPA;S:${req.body.ssid};P:${req.body.password};H:false;`);
  } else if (req.body.qrType === 'urlQR') {
    await qrcode.toFile(`./qr/${fileName}.png`, req.body.url);
  }
  res.send({
    fileName: `${fileName}.png`
  });
});

app.listen(3000, () => { console.log('Server running on port 3000'); });