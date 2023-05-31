class BookList {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.arrayOfBooks = JSON.parse(localStorage.getItem('arrayOfBooks')) || [];
    this.titleInput = document.querySelector('#title');
    this.authorInput = document.querySelector('#author');
    this.formBtn = document.querySelector('.formBtn');
    this.bookListContainer = document.querySelector('.bookListContainer');
    this.formBtn.addEventListener('click', this.addItem.bind(this));
  }

  removeBook(e) {
    const parentArticle = e.currentTarget.parentElement;
    this.bookListContainer.removeChild(parentArticle);
    this.arrayOfBooks = this.arrayOfBooks.filter(
      (item) => item.id !== parentArticle.dataset.id,
    );
    localStorage.setItem('arrayOfBooks', JSON.stringify(this.arrayOfBooks));
  }

  displayBooks() {
    this.bookListContainer.innerHTML = '';
    this.arrayOfBooks.forEach((book) => {
      const article = document.createElement('article');
      article.classList.add('bookListItems');
      const attr = document.createAttribute('data-id');
      attr.value = book.id;
      article.setAttributeNode(attr);
      article.innerHTML = `<p class="bookList">"${book.title}" by "${book.author}"</p>
              <button class="removeBtn" type="button">Remove</button>`;
      this.bookListContainer.appendChild(article);
      this.bookListContainer.style.display = 'block';
      const removeBtn = document.querySelectorAll('.removeBtn');
      removeBtn.forEach((btn) => {
        btn.addEventListener('click', this.removeBook.bind(this));
      });
    });
  }

  addItem() {
    const value1 = this.titleInput.value;
    const value2 = this.authorInput.value;
    const bookId = new Date().getTime().toString();

    if (this.bookListContainer.length === 0) {
      this.bookListContainer.style.display = 'none';
    }

    if (value1 !== '' && value2 !== '') {
      const book = {
        title: value1,
        id: bookId,
        author: value2,
      };
      this.arrayOfBooks.push(book);
      this.displayBooks();
      localStorage.setItem('arrayOfBooks', JSON.stringify(this.arrayOfBooks));
      this.titleInput.value = '';
      this.authorInput.value = '';
    }
  }
}

const bookList = new BookList();
bookList.displayBooks();
