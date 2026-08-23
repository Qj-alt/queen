const express = require('express');
const cors = require('cors');
const midtransClient = require('midtrans-client');

const app = express();
app.use(cors());
app.use(express.json());

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY
});

app.post('/', async (req, res) => {
  
  try {
    const { order_id, gross_amount, customer_name } = req.body;
    const parameter = {
      transaction_details: { order_id, gross_amount },
      customer_details: { first_name: customer_name }
    };
    const transaction = await snap.createTransaction(parameter);
    res.json({ token: transaction.token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
