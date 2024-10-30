const myLibrary = []

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = () => {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
}

function addBookToLibrary(){
   const title = document.getElementById('title').value
   const author = document.getElementById('author').value
   const pages = document.getElementById("pages").value
   const read = document.getElementById("read").checked
    
   const newBook = new Book(title, author, pages, read)

   myLibrary.push(newBook)
   saveLibrary()
   displayLibrary()

    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("pages").value = '';
    document.getElementById("read").checked = false;


}

function displayLibrary(){
    const display = document.getElementById("libraryDisplay")
    display.innerHTML = ""

    myLibrary.forEach( (book, index) => {
        const bookCard = document.createElement("div")
        bookCard.classList.add("book-card")

        const title = document.createElement("p")
        title.textContent = `Título: ${book.title}`
        bookCard.appendChild(title)

        const author = document.createElement("p")
        author.textContent = `Autor: ${book.author}`
        bookCard.appendChild(author)

        const pages = document.createElement("p")
        pages.textContent = `Páginas: ${book.pages}`
        bookCard.appendChild(pages)

        const readStatus = document.createElement("p")
        readStatus.textContent = `Lido: ${book.read? 'sim' : 'não'}`
        bookCard.appendChild(readStatus)

        const removeButton = document.createElement("button")
        removeButton.textContent = "Remover"
        removeButton.addEventListener('click', () => {
            myLibrary.splice(index, 1)
            saveLibrary()
            displayLibrary()
        })
        bookCard.appendChild(removeButton)

        const toggleReadButton = document.createElement("button")
        toggleReadButton.textContent = "Alterar status da leitura"
        toggleReadButton.addEventListener("click", () => {
            book.read = ! book.read
            saveLibrary()
            displayLibrary()
        })
        bookCard.appendChild(toggleReadButton)

        display.appendChild(bookCard)
    })
}

function saveLibrary(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

function loadLibrary(){
    const storedLibrary = localStorage.getItem('myLibrary')
    if(storedLibrary){
        // myLibrary = JSON.parse(storedLibrary)
        myLibrary.push(...JSON.parse(storedLibrary))
    }
}

window.onload = function(){
    loadLibrary()
    displayLibrary()
}


const button = document.getElementById('btn')
button.addEventListener('submit', addBookToLibrary)


console.log(myLibrary)