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
}

class UI {
  static createBooksHTML(arr) {
    let books = '';
    for (let i = 0; i < arr.length; i++) {
      books += ` 
        <p>${arr[i].title}</p>
        <p>${arr[i].author}</p>
        <button onclick="UI.removeBook(${i})">Remove</button>
        <hr/>
        `;
    }
    return books;
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
  
  static removeBook(i) {
    const books = LocalStorageHandler.getBooks();
    books.splice(i, 1);
    LocalStorageHandler.updateBooks(books);
    UI.displayBooks();
  }
}

const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', () => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  UI.addNewBook(title.value, author.value);
});

window.addEventListener('load', () => {
  UI.displayBooks();
});