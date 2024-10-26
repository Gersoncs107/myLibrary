const myLibrary = []

function Book(title, author, pages, read){
    this.title = title,
    this.author = author,
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

    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("pages").value = '';
    document.getElementById("read").checked = false;

}

const button = document.getElementById('btn')
button.addEventListener('submit', addBookToLibrary)

const livro1 = new Books('Dias melhores virão', 'Max Lucado', 96, 'Lido')
const livro2 = new Books('O fim da ansiedade', 'Max Lucado', 223, 'Não Lido')

addBookToLibrary(livro1)
addBookToLibrary(livro2)

console.log(myLibrary)