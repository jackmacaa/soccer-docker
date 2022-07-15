const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const stripe = require('stripe')('sk_test_51LKd7kDVlApszjJu0noSLodcYr0mDN5TvtGUYkXFaxMyNKzV2ie4aEwpSRxpG3p3PkSR0wjsq6x9H2aiEdmMYGwU00Ig31iawe');

const PORT = 8080;
const HOST = '0.0.0.0';
const DOMAIN = 'http://localhost:8080';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views')

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/checkout', async (req, res) => {
    res.render('checkout');
});

app.get('/cancel', (req, res) => {
    res.render('cancel');
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
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancel`,
    });
    res.redirect(303, session.url);
});

app.get('/success', (req, res) => {
    res.render('success');
});

app.listen(PORT, HOST);
console.log(`NodeJs Server on http://${HOST}:${PORT}`);
