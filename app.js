const express = require('express');
const app = express();
// const data = 
// {
//   "data": []
// }
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send(`Server is running. Please navigate to the proper url endpoint.`)
  console.log(req.body);
})

module.exports = app;