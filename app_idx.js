
const express = require('express')

const mongoose = require('mongoose')

const app = express()

const categories = require('./Routes/categories_route')
const students = require('./Routes/students_route')
const course = require('./Routes/courses_route')

app.use(express.json())

// app.use(categories)
app.use('/categories', categories)  // --->> app.use(<default_api_link>, page_route)
// app.use(students)
app.use('/students', students)  
// app.use(course)
app.use('/courses', course)  

mongoose.connect('mongodb://127.0.0.1/EduWebsite1DB')
.then(() => console.log("Connection to the DB is Successful..."))
.catch((err) => console.error(`Couldn't connect to mongoDB .... \\ ${err}`))


const port = process.env.PORT || 3800;
app.listen(port, () => console.log(`Listening to the port :- ${port}`));

