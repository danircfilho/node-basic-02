const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express() 

app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())

app.engine('handlebars', exphbs.engine()) 
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/books/insertbook', (req, res) => {

  const title = req.body.title
  const pageqty = req.body.pageqty

  const sqlbd = `INSERT INTO books (??, ??) VALUES (?, ?)` 
  const data = ['title', 'pageqty', title, pageqty]

  pool.query(sqlbd, data, function (err) {
    if (err) {
      console.log(err)
      return
    }
    res.redirect('/books')
  })
})

app.get('/books', (req, res) => {

  const sqlbd = "SELECT * FROM books"

  pool.query(sqlbd, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    const books = data
    res.render('books', { books })
  })
})

app.get('/books/:id', (req, res) => {

  const id = req.params.id

  const sqlbd = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id', id]

  pool.query(sqlbd, data, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    const bookind = data[0]    
    res.render('bookind', { bookind }) 
  })
})

app.get('/books/edit/:id', (req, res) => {

  const id = req.params.id
  const sqlbd = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id', id]

  pool.query(sqlbd, data, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    const bookind = data[0]    
    res.render('editbookind', { bookind }) 
  })
})

app.post('/books/updatebook', (req, res) => {

  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pageqty

  const sqlbd = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
  const data = ['title', title, 'pageqty', pageqty, 'id', id]

  pool.query(sqlbd, data, function (err) {
    if (err) {
      console.log(err)
      return
    }    
    res.redirect('/books') 
  })
})

app.post('/books/remove/:id', (req, res) => {

  const id = req.params.id

  const sqlbd = `DELETE FROM books WHERE ?? = ?` 
  const data = ['id', id]

  pool.query(sqlbd, data, function (err) {
    if (err) {
      console.log(err) 
    }
    res.redirect('/books') 
  })
})

//Heroku
const PORT = process.env.PORT || 3000
app.listen(PORT)

