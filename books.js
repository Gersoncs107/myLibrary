class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.saveLibrary();
    }

    removeBook(index) {
        this.books.splice(index, 1);
        this.saveLibrary();
    }

    saveLibrary() {
        localStorage.setItem('myLibrary', JSON.stringify(this.books));
    }

    loadLibrary() {
        const storedLibrary = localStorage.getItem('myLibrary');
        if (storedLibrary) {
            try {
                const parsedBooks = JSON.parse(storedLibrary);
                this.books = parsedBooks.map(book => new Book(book.title, book.author, book.pages, book.read));
            } catch (error) {
                console.error('Erro ao carregar a biblioteca:', error);
            }
        }
    }

    displayLibrary() {
        const display = document.getElementById("libraryDisplay");
        display.innerHTML = "";

        this.books.forEach((book, index) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            const title = document.createElement("p");
            title.textContent = `Título: ${book.title}`;
            bookCard.appendChild(title);

            const author = document.createElement("p");
            author.textContent = `Autor: ${book.author}`;
            bookCard.appendChild(author);

            const pages = document.createElement("p");
            pages.textContent = `Páginas: ${book.pages}`;
            bookCard.appendChild(pages);

            const readStatus = document.createElement("p");
            readStatus.textContent = `Lido: ${book.read ? 'Sim' : 'Não'}`;
            bookCard.appendChild(readStatus);

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remover";
            removeButton.addEventListener('click', () => {
                this.removeBook(index);
                this.displayLibrary();
            });
            bookCard.appendChild(removeButton);

            const toggleReadButton = document.createElement("button");
            toggleReadButton.textContent = "Alterar Status de Leitura";
            toggleReadButton.addEventListener('click', () => {
                book.toggleReadStatus();
                this.saveLibrary();
                this.displayLibrary();
            });
            bookCard.appendChild(toggleReadButton);

            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.addEventListener('click', () => this.editBook(book, index));
            bookCard.appendChild(editButton);

            display.appendChild(bookCard);
        });
    }

    editBook(book, index) {
        const bookCard = document.querySelectorAll('.book-card')[index];
        const form = document.createElement('form');

        form.innerHTML = `
            <label>Título: <input type="text" value="${book.title}" id="edit-title"></label>
            <label>Autor: <input type="text" value="${book.author}" id="edit-author"></label>
            <label>Páginas: <input type="number" value="${book.pages}" id="edit-pages"></label>
            <label>Lido: <input type="checkbox" id="edit-read" ${book.read ? 'checked' : ''}></label>
        `;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Salvar';
        saveButton.type = 'button';

        saveButton.addEventListener('click', () => {
            book.title = document.getElementById('edit-title').value;
            book.author = document.getElementById('edit-author').value;
            book.pages = document.getElementById('edit-pages').value;
            book.read = document.getElementById('edit-read').checked;

            this.saveLibrary();
            this.displayLibrary();
        });

        form.appendChild(saveButton);
        bookCard.innerHTML = '';
        bookCard.appendChild(form);
    }
}

const library = new Library();
library.loadLibrary();
library.displayLibrary();

document.getElementById('bookForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    if (!title || !author || !pages) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const newBook = new Book(title, author, pages, read);
    library.addBook(newBook);
    library.displayLibrary();

    // Limpar formulário
    document.getElementById('bookForm').reset();
});
