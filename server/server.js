
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 6969;

app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log("Local server is running, time to chat :)")
})