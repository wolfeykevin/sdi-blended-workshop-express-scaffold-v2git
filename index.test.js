const req = require('supertest');
const app = require('./app')
const fs = require('fs')


describe('/books endpoint', () => {
    beforeEach(()=> {
        // resets dummy.csv after each test completes
        let temp = fs.readFileSync(`dummy copy.csv`, 'utf8')
        fs.writeFileSync('dummy.csv', temp)
        
        // resets individual id.csv file after each test completes
        fs.rmSync('./data', { recursive: true, force: true })
        fs.cpSync('./data-copy', './data' , {force: true, recursive: true})     // recursive and force mean keep trying and overwrite existing file/dir
        

    })
  test('should return an array of all books using GET request on /books endpoint', (done)  => {
    req(app)
      .get('/books')
      .expect(200)    // this expect is asyncronous
      .end((err, res) => {
        if (err) throw err;
        expect(res.body).toBeInstanceOf(Array)   // this expect is synchronous
        done()
      })
  })

  // POST adds something to server
  test('should append a new book to dummy.csv and create a new csv using POST request on /books endpoint', (done)  => {
    const oldData = fs.readFileSync('dummy.csv', 'utf8')
    req(app)
      .post('/books')
      .send(newBook)
      .expect(201)    // this expect is asyncronous
      .end((err, res) => {
        if (err) throw err;
        const newData = fs.readFileSync('dummy.csv', 'utf8');
        expect(oldData.length < newData.length).toBe(true);
        done()
      })
  })
  
  test('should retrieve data on specified book in GET request', (done) => {
      req(app)
        .get('/books/1')
        .expect(200)
        .end((err, res) => {
            if (err) throw err;
            done()  // test completion
        })
  })

    test('should update a book using PATCH request on /books/:id endpoint and send back updated book', (done) => {
        req(app)
        .patch('/books/1')
        .send(temp[0])
        .expect(201)     
        .end((err, res) => {
            if (err) throw err;
            done()  
      })
    })

    test('should delete a book using DELETE request on /books/:id endpoint and send back a confirmation message', (done) => {
        req(app)
        .delete('/books/5')
        .expect(200)     
        .end((err, res) => {
            if (err) throw err;
            done()  
        })
    })
})

const newBook = {
    "id" : 11,
    "title" : "The Hobbit",
    "author" : "J.R.R Tolkien",
    "genre" : "Fantasy",
    "synopsis" : "If you care for journeys there and back, out of the comfortable Western world, over the edge of the Wild, and home again, and can take an interest in a humble hero (blessed with a little wisdom and a little courage and considerable good luck), here is a record of such a journey and such a traveler.",
    "cover" : "https://images-na.ssl-images-amazon.com/images/I/419UGp1CsQL._SX331_BO1,204,203,200_.jpg"
}

const patchedBook =   {
    "id": 2,
    "title": "Ender Game",
    "author": "Ryan Guinter",
    "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532714506i/40961427.jpg"
}


const temp = 
[
  {
      "id": 1,
      "title": "1984",
      "author": "Orwell, George ",
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