const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const formBtn = document.querySelector('.formBtn');
const bookListContainer = document.querySelector('.bookListContainer');

let arrayOfBooks = JSON.parse(localStorage.getItem('arrayOfBooks')) || [];

function removeBook(e) {
  const parentArticle = e.currentTarget.parentElement;
  bookListContainer.removeChild(parentArticle);
  arrayOfBooks = arrayOfBooks.filter((item) => item.id !== parentArticle.dataset.id);
  localStorage.setItem('arrayOfBooks', JSON.stringify(arrayOfBooks));
}

function displayBooks() {
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

displayBooks();

// addItem function
