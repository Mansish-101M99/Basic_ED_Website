
const express = require('express')

const mongoose = require('mongoose')

const app = express()

const categories = require('./Routes/categories_route')

app.use(express.json())

app.use(categories)

mongoose.connect('mongodb://127.0.0.1/EduWebsite1DB')
.then(() => console.log("Connection to the DB is Successful..."))
.catch((err) => console.error(`Couldn't connect to mongoDB .... \\ ${err}`))


const port = process.env.PORT || 3800;
app.listen(port, () => console.log(`Listening to the port :- ${port}`));

