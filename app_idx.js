
const express = require('express')

const app = express()

app.use(express.json())



const port = process.env.PORT || 3489;
app.listen(port, (port) => console.log(`Listening to the port :- ${port}`));

