const addedBooks = document.querySelector('.added-books');
let booksArray = [];
let removeButtonArray = [];
const addButton = document.querySelector('.add-button');
const newTitle = document.querySelector('.add-title');
const newAuthor = document.querySelector('.add-author');

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

const navList = document.querySelector('.nav-list');
const navAdd = document.querySelector('.nav-add');
const navContact = document.querySelector('.nav-contact');
const listSection = document.querySelector('.list');
const addANewSection = document.querySelector('.add-a-new-book');
const contactSection = document.querySelector('.contact');

navList.addEventListener('click', () => {
  listSection.classList.remove('hide');
  addANewSection.classList.add('hide');
  contactSection.classList.add('hide');
});

navAdd.addEventListener('click', () => {
  listSection.classList.add('hide');
  addANewSection.classList.remove('hide');
  contactSection.classList.add('hide');
});

navContact.addEventListener('click', () => {
  listSection.classList.add('hide');
  addANewSection.classList.add('hide');
  contactSection.classList.remove('hide');
});
