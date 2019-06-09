const express = require('express');
const fs = require('fs');

const app = express();
const port = 80;

app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile('index.html'));

app.listen(port, () => console.log(`Listening on port ${port}`));
