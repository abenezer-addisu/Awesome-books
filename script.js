// checking if local storage is empty

if (localStorage.getItem('Added Books') == null) {
  localStorage.setItem('Added Books', JSON.stringify([]));
}

// Store data into local storage

const storeData = JSON.parse(localStorage.getItem('Added Books'));

function updateData() {
  localStorage.setItem('Added Books', JSON.stringify(storeData));
}

function createBooks(arr) {
  let books = '';

  for (let i = 0; i < arr.length; i += 1) {
    books += ` 
        <p>${arr[i].title}</p>
        <p>${arr[i].author}</p>
        <button onclick ="removeBook(${i})">Remove</button>
        <hr/>
        `;
  }
  return books;
}

// displaying data t the UI from local storage

function displayBooks() {
  const listOfBooks = document.querySelector('.container');
  listOfBooks.innerHTML = `
    <ul class="book-ul">
    ${createBooks(storeData)}</ul>
    `;
}

// adding data inthe local storage

function addNewdata(bookTitle, bookAuthor) {
  const Book = {
    title: bookTitle,
    author: bookAuthor,
  };
  storeData.push(Book);
  updateData();
  displayBooks();
}

// Getting values from the input fields

const addBtn = document.querySelector('.add-btn');

addBtn.addEventListener('click', () => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  addNewdata(title.value, author.value);
});

// removing data from local storage

function removeBook(i) {
  storeData.splice(i, 1);
  updateData();
  displayBooks();
}
removeBook();

window.onload = displayBooks();