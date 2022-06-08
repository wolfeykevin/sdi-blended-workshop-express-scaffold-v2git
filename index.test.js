const req = require('supertest');
const app = require('./app')


describe('/books endpoint', () => {
  test('GET /books should return an array of all books', (done)  => {

    req(app)
      .get('/books')
      .expect(200)    // this expect is asyncronous
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).toBeInstanceOf(Array)   // this expect is synchronous
        done()
      })
  })
})




const temp = [
  {
      "id": 1,
      "title": "1984",
      "author": "George Orwell",
      "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532714506i/40961427.jpg"
  },
  {
      "id": 2,
      "title": "Crime and Punishment",
      "author": "Fyodor Dostoevsky",
      "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1382846449i/7144.jpg"
  },
  {
      "id": 3,
      "title": "Of Mice and Men",
      "author": "John Steinbeck",
      "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511302904i/890.jpg"
  },
  {
      "id": 4,
      "title": "The Count of Monte Cristo",
      "author": "Alexandre Dumas",
      "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1611834134i/7126.jpg"
  },
  {
      "id": 5,
      "title": "Catch-22",
      "author": "Joseph Heller",
      "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463157317i/168668.jpg"
  },
  {
      "id": 6,
      "title": "The Grapes of Wrath",
      "author": "John Steinbeck",
      "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1511302892i/4395.jpg"
  },
  {
      "id": 7,
      "title": "All Quiet on the Western Front",
      "author": "Erich Maria Remarque",
      "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1632027397i/355697.jpg"
  },
  {
      "id": 8,
      "title": "For Whom the Bell Tolls",
      "author": "Ernest Hemingway",
      "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1492591524i/46170.jpg"
  },
  {
      "id": 9,
      "title": "Fahrenheit 451",
      "author": "Ray Bradbury",
      "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1383718290i/13079982.jpg"
  },
  {
      "id": 10,
      "title": "Lord of the Flies",
      "author": "William Golding",
      "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1385473931i/18964701.jpg"
  }
]