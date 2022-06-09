const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json())   // assuming we receive data in a json object

// helper function changes csv data to json object array
const helper = (filename) =>
{
  let jsonArr = []
  let bookData = fs.readFileSync(filename, 'utf8')
  bookData = bookData.split("\n")
  bookData.shift()  // shift removes first element of array because we don't need headers

  for (let i in bookData) {   // you want the index not the element
    bookData[i] = bookData[i].split(`,`)
    // console.log(`Printing at this book: ${i}: ${bookData[i]}`);
    let temp = {
      id: parseInt(bookData[i][0].replaceAll(`\"`, ``)),
      title: bookData[i][1].replaceAll(`\"`, ``),
      author: bookData[i][2].replaceAll(`\"`, ``),
      cover: bookData[i][3].replaceAll(`\"`, ``)
    }
    jsonArr.push(temp)
  }
  return jsonArr;
}

app.get('/', (req, res) => {
  res.status(200).send(`<h2>Hello World!</h2>`)
})

app.get('/books', (req, res) => {  
  let result = helper('./dummy.csv')
  res.status(200).send(result)
})

app.post('/books', (req, res) => {
  let bookInArr = false;
  let index = (req.body.id-1)
  console.log(index);
  let temp = helper(`dummy.csv`);
  if (temp.length > index)
    bookInArr = true;
  if (!bookInArr)
  {
    let newBookStr = `"${req.body.id}","${req.body.title}","${req.body.author}","${req.body.cover}"`
    fs.appendFileSync('dummy.csv', "\n" + newBookStr)   // for dummy.csv
    fs.writeFileSync(`./data/${req.body.id}.csv`, newBookStr)   // for new csv   
    res.status(201).send(newBookStr);  
    
  } else {
    res.status(402).send({message: 'something did not work'});
  }
  
})

app.get('/books/:id', (req, res) => {
  console.log(`Retrieving book with id: ${req.params.id}`)
  res.status(200).send(helper(`./data/${req.params.id}.csv`))
})

app.patch('/books/:id', (req, res) => {
  console.log(`Updating book with id: ${req.params.id}`)
  let updatedBook = `"${req.body.id}","${req.body.title}","${req.body.author}","${req.body.cover}"`
  fs.writeFileSync(`./data/${req.params.id}.csv`, updatedBook)   

  let prePatchData = helper('dummy.csv')
  prePatchData[req.params.id-1] = req.body
  let headers = `"id","title","author","cover"`;

  for (let book of prePatchData) {
    let csvVersion = `\n"${book.id}","${book.title}","${book.author}","${book.cover}"`
    headers += csvVersion
  }
  fs.writeFileSync(`dummy.csv`, headers) 
  res.status(201).send(prePatchData[req.params.id-1])
})

app.delete('/books/:id', (req, res) => {
  console.log(`Deleting book with id: ${req.params.id}`)
  let preDeleteData = helper('dummy.csv')
  let index = (req.params.id-1)
  let startArr = preDeleteData.slice(0, index);   // slice: first param is inclusive, second param is exclusive
  let endArr = preDeleteData.slice(index + 1)   // if you leave end blank it will get the rest of the array
  let resultArr = startArr.concat(endArr);  
  console.log(resultArr)
  let headers = `"id","title","author","cover"`;
  for (let book of resultArr) {
    let csvVersion = `\n"${book.id}","${book.title}","${book.author}","${book.cover}"`
    headers += csvVersion
  }
  fs.writeFileSync(`dummy.csv`, headers) 
  res.status(200).send(preDeleteData[req.params.id-1])

  fs.unlink(`./data/${req.params.id}.csv`, (err) => {
    if (err) {
      throw err;
    }
  })
})




module.exports = app;