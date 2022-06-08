const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send(`hello world`)
  console.log(req.body);
})

app.get('/books', (req, res) => {  
  let result = []
  let bookData = fs.readFileSync('./dummy.csv', 'utf8')
  bookData = bookData.split("\n")
  bookData.shift()  // shift removes first element of array because we don't need headers

  for (let i in bookData) {   // you want the index not the element
    bookData[i] = bookData[i].split(`,`)
    let temp = {
      id: parseInt(bookData[i][0].replaceAll(`\"`, ``)),
      title: bookData[i][1].replaceAll(`\"`, ``),
      author: bookData[i][2].replaceAll(`\"`, ``),
      cover: bookData[i][3].replaceAll(`\"`, ``)
    }
    result.push(temp)
  }

  res.status(200).send(result)
})


app.post('/books', (req, res) => {
 
  
})

module.exports = app;