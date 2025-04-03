// Import the express library
import express from 'express'

import fs from 'fs'

// Create a new express application
const app = express()

// Define the port to listen on
const port = 3000

// Use the express.json() middleware to parse the body of the request
app.use(express.json())


app.get('/', (req, res) =>
    {
        fs.readFile('./html/home.html', 'utf8', 
        (err, html) => {
            if(err)
            {
                res.status(500).send('There was an error: ' + err)
                return 
            }
            
            console.log("Sending page...")
            res.send(html)
            console.log("Page sent!")
        })
    })

// The root route will serve the helloWorld.html file, which is located in the ./public/html directory
app.get('/person', (req, res)=>
{
    console.log("Hello server");

    const person = {
        name: "Emiliano",
        email: "a01785881@tec.mx",
        message: "Hello world from server",
    }

    res.json(person)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })