const express = require('express');
const stripe = require('stripe')('sk_test_51LKd7kDVlApszjJu0noSLodcYr0mDN5TvtGUYkXFaxMyNKzV2ie4aEwpSRxpG3p3PkSR0wjsq6x9H2aiEdmMYGwU00Ig31iawe');
const app = express();
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');

const PORT = 8080;
const HOST = '0.0.0.0';
const YOUR_DOMAIN = 'http://localhost:8080';

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

app.get('/cancel', async (req, res) => {
    res.render('cancel');
});

app.get('/success', async (req, res) => {
    res.render('success');
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
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
    });
    res.redirect(303, session.url);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);