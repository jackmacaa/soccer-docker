const express = require('express');
const stripe = require('stripe')('sk_test_51LKd7kDVlApszjJu0noSLodcYr0mDN5TvtGUYkXFaxMyNKzV2ie4aEwpSRxpG3p3PkSR0wjsq6x9H2aiEdmMYGwU00Ig31iawe');
const app = express();
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const mysql      = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pass',
  database : 'db'
});

connection.connect();
 
connection.query('select * from fees', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const YOUR_DOMAIN = 'http://localhost:8080';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views')

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/checkout', (req, res) => {
    res.render('checkout');
});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: req.body.fees,
        quantity: 1,
      }
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.redirect(303, session.url);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);