const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/register', (req, res) => {
    console.log(req.body);
    return res.send({"data": req.body });
});

module.exports = router;