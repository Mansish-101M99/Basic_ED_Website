
const express = require('express')

const app = express()

const categories = require('./Routes/categories_route')

app.use(express.json())

app.use(categories)


const port = process.env.PORT || 3489;
app.listen(port, (port) => console.log(`Listening to the port :- ${port}`));

