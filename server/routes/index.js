const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send("Node server is Running")
});

module.exports = router;