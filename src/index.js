const express = require('express')
const app = express()
require('../src/db/Connection')
const router = require('../src/Router/Student')
const cors = require('cors')

const PORT = process.env.PORT || 3100

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (req,res)=>{
    res.send("Hello world");
})

app.listen(PORT, ()=>{
    console.log(`Server is connected on ${PORT}`);
})