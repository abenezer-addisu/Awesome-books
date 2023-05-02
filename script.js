
const addedBooks = document.querySelector('.added-books'); // In this div the html wil be created dinamically
let booksArray = []; // In this array all the new books will be added
let removeButtonArray = []; // It will contain all the remove buttons
const addButton = document.querySelector('.add-button');

const newTitle = document.querySelector('.add-title'); // User input
const newAuthor = document.querySelector('.add-author'); // User input

class LocalStorageHandler {
  static getBooks() {
    if (!localStorage.getItem('Added Books')) {
      localStorage.setItem('Added Books', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('Added Books'));
  }
  
  static updateBooks(books) {
    localStorage.setItem('Added Books', JSON.stringify(books));
  }
}

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  
  static addBook() {
    if (newTitle.value !== '' && newAuthor.value !== '') {
      const book = new Book(newTitle.value, newAuthor.value);
      booksArray.push(book);
      localStorage.setItem('added-books', JSON.stringify(booksArray));
      newTitle.value = '';
      newAuthor.value = '';
    }
  }
  
  static displayBooks() {
    const listOfBooks = document.querySelector('.container');
    listOfBooks.innerHTML = `
      <ul class="book-ul">
      ${UI.createBooksHTML(LocalStorageHandler.getBooks())}
      </ul>
    `;
  }
  
  static addNewBook(bookTitle, bookAuthor) {
    const newBook = new Book(bookTitle, bookAuthor);
    const books = LocalStorageHandler.getBooks();
    books.push(newBook);
    LocalStorageHandler.updateBooks(books);
    UI.displayBooks();
  }
  
  static removeBook(index) {
    booksArray.splice(index, 1);
    localStorage.setItem('added-books', JSON.stringify(booksArray));
  }

  static render() {
    addedBooks.innerHTML = '';
    for (let i = 0; i < booksArray.length; i += 1) {
      const html = `
        <div class="book">
          <div class="book-details">
            <div class="title">"${booksArray[i].title}" by&nbsp;</div>
            <div class="author"> ${booksArray[i].author}</div>
          </div>
          <div class="remove-container">
            <button class="remove-book">Remove</button>
          </div>
        </div>
      `;
      addedBooks.innerHTML += html;
    }

    removeButtonArray = document.querySelectorAll('.remove-book');
    for (let i = 0; i < removeButtonArray.length; i += 1) {
      removeButtonArray[i].addEventListener('click', () => {
        Book.removeBook(i);
        Book.render();
      });
    }
  }

}

window.addEventListener('load', () => {
  if (localStorage.getItem('added-books')) {
    booksArray = JSON.parse(localStorage.getItem('added-books'));
    Book.render();
  }
});

const alertMessage = document.querySelector('.alert-message');
addButton.addEventListener('click', () => {
  let theBookAlreadyExists = false;
  for (let i = 0; i < booksArray.length; i += 1) {
    if (booksArray[i].title === newTitle.value && booksArray[i].author === newAuthor.value) {
      theBookAlreadyExists = true;
      alertMessage.innerHTML = 'That book already exists, please add another title or author';
      newTitle.addEventListener('click', () => {
        newTitle.value = '';
      });
      newAuthor.addEventListener('click', () => {
        newAuthor.value = '';
      });
    }
  }
  if (!theBookAlreadyExists) {
    Book.addBook();
    alertMessage.innerHTML = '';
  }
  Book.render();
  removeButtonArray = document.querySelectorAll('.remove-book');
});




const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', () => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  UI.addNewBook(title.value, author.value);
});

window.addEventListener('load', () => {
  UI.displayBooks();
});