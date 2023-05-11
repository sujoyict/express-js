const express = require('express');
const app = express();

app.use(express.json());

let books = [];

// Serve static HTML file at root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Return array of books as JSON
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a new book to the collection
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;
  const id = Date.now().toString(); // generate a unique ID
  const book = { id, title, author, publishedDate };
  books.push(book);
  res.json(book);
});

// Remove a book from the collection by ID
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: `Book with ID ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `Book with ID ${id} not found` });
  }
});

// Start the server on port 8000
app.listen(8000, () => {
  console.log('Server started on port 8000');
});
