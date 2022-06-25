function Book(bookName, author, publishYear, isbn) {
  this.bookName = bookName;
  this.author = author;
  this.publishYear = publishYear;
  this.isbn = isbn;
}
function UI() {}

//UI Methods
UI.prototype.switchBetweenBtns = function () {
  document.querySelector(".form-container").style.display = "none";
  document.querySelector(".form").reset();
  document.querySelector(".search").style.display = "block";
};
UI.prototype.addBookToTable = function (bookInfo) {
  const tableBody = document.querySelector("#book-list"),
    tableRow = document.createElement("tr");
  tableRow.className = "table-row";
  tableRow.innerHTML = `<td>${bookInfo.bookName}</td>
                        <td>${bookInfo.author}</td>
                        <td>${bookInfo.publishYear}</td>
                        <td>${bookInfo.isbn}</td>`;
  tableBody.appendChild(tableRow);
};
UI.prototype.cancelbtn = function () {
  submit.style.display = "none";
  const form = document.querySelector(".form");
  form.reset();
};
UI.prototype.showAlert = function (message) {
  const msgContainer = document.querySelector(".msg-container");
  const msg = document.querySelector(".msg");
  msg.innerText = message;
  msgContainer.appendChild(msg);
};
UI.prototype.find = function () {
  const userInput = document.querySelector(".search-input");
  const text = userInput.value.toLowerCase();
  document.querySelectorAll(".table-row").forEach(function (data) {
    const tableData = data.textContent;
    if (tableData.toLowerCase().indexOf(text) != -1) {
      data.style.display = "";
    } else {
      data.style.display = "none";
    }
  });
};
UI.prototype.deleteAllBooks = function () {
  document.querySelectorAll("td").forEach(function (data) {
    data.parentNode.remove();
  });
};
UI.prototype.hide = function () {
  document.querySelector(".search").style.display = "none";
};
UI.prototype.displayBooks = function () {
  const store = new Store();
  const ui = new UI();
  const books = store.getBooksFromStorage();
  books.forEach(ui.addBookToTable);
};
//Variables
const addBook = document.querySelector(".btn-green"),
  search = document.querySelector(".btn-orange"),
  closeSearch = document.querySelector(".fa-close"),
  deleteAll = document.querySelector(".btn-red"),
  submit = document.querySelector(".form-container"),
  cancel = document.querySelector(".cancel-btn"),
  ui = new UI();

//Event Listeners
document.addEventListener("DOMContentLoaded", ui.displayBooks);
addBook.addEventListener("click", addNewBook);
search.addEventListener("click", findBooks);
deleteAll.addEventListener("click", deleteBooks);
submit.addEventListener("click", submitBooks);
cancel.addEventListener("click", cancelSubmit);
closeSearch.addEventListener("click", hideSearchBar);
// Store in LocalStorage
function Store() {}
Store.prototype.getBooksFromStorage = function () {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
};
Store.prototype.storeBook = function (book) {
  const store = new Store();
  const books = store.getBooksFromStorage();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
};
Store.prototype.deleteFromStorage = function () {
  localStorage.clear();
};
//function declarations
function addNewBook(e) {
  submit.style.display = "block";
  document.querySelector(".search").style.display = "none";
  e.preventDefault();
}
function findBooks(e) {
  const ui = new UI();
  ui.switchBetweenBtns();
  const userInput = document.querySelector(".search-input");
  userInput.focus();
  userInput.addEventListener("keyup", function () {
    ui.showAlert("");
    ui.find();
  });
  e.preventDefault();
}
function hideSearchBar(e) {
  const ui = new UI();
  ui.hide();
  e.preventDefault();
}
function deleteBooks(e) {
  const tableBody = document.querySelector("#book-list");
  const ui = new UI();
  const store = new Store();
  if (tableBody.rows.length == 0) {
    ui.showAlert("There are no items to delete!");
  } else {
    ui.deleteAllBooks();
    store.deleteFromStorage();
  }
  e.preventDefault();
}
function submitBooks(e) {
  const form = document.querySelector(".form"),
    bookName = document.querySelector("#book-name").value,
    author = document.querySelector("#author").value,
    publishYear = document.querySelector("#pulish-year").value,
    isbn = document.querySelector("#isbn").value,
    book = new Book(bookName, author, publishYear, isbn),
    ui = new UI(),
    store = new Store();
  if (e.target.classList.contains("submit-btn")) {
    if (bookName === "" || author === "" || publishYear === "" || isbn === "") {
      ui.showAlert("Please make sure to fill out all the fields correctly!");
    } else {
      ui.showAlert("");
      ui.addBookToTable(book);
      store.storeBook(book);
      form.reset();
    }
  }
  e.preventDefault();
}

function cancelSubmit(e) {
  const ui = new UI();
  ui.cancelbtn();
  ui.showAlert("");
  e.preventDefault();
}