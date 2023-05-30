const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const formBtn = document.querySelector('.formBtn');
const bookListContainer = document.querySelector('.bookListContainer');

let arrayOfBooks = JSON.parse(localStorage.getItem('arrayOfBooks')) || [];

// removeBook function

function removeBook(e) {
  const parentArticle = e.currentTarget.parentElement;
  bookListContainer.removeChild(parentArticle);
  arrayOfBooks = arrayOfBooks.filter(
    (item) => item.id !== parentArticle.dataset.id,
  );
  localStorage.setItem('arrayOfBooks', JSON.stringify(arrayOfBooks));
}

// displayBook function

function displayBook() {
  bookListContainer.innerHTML = '';
  arrayOfBooks.forEach((item) => {
    const article = document.createElement('article');
    article.classList.add('bookListItems');
    const attr = document.createAttribute('data-id');
    attr.value = item.id;
    article.setAttributeNode(attr);
    article.innerHTML = `<p class="bookList">${item.title}</p>
            <p class="bookList">${item.author}</p>
            <button class="removeBtn" type="button">Remove</button>`;
    bookListContainer.appendChild(article);
    bookListContainer.style.display = 'block';
    const removeBtn = document.querySelectorAll('.removeBtn');
    removeBtn.forEach((btn) => {
      btn.addEventListener('click', removeBook);
    });
  });
}

displayBook();

// addItem function

function addItem() {
  const value1 = titleInput.value;
  const value2 = authorInput.value;
  const bookId = new Date().getTime().toString();
  if (bookListContainer.length === 0) {
    bookListContainer.style.display = 'none';
  }
  if (value1 !== '' && value2 !== '') {
    const book = {
      title: value1,
      id: bookId,
      author: value2,
    };
    arrayOfBooks.push(book);
    displayBook();
    localStorage.setItem('arrayOfBooks', JSON.stringify(arrayOfBooks));
    titleInput.value = '';
    authorInput.value = '';
  }
}
formBtn.addEventListener('click', addItem);
