const myLibrary = []

function Books(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages
    this.read = read
    this.info = () => {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
}

function addBookToLibrary(book){
    return myLibrary.push(book)
}


const livro1 = new Books('Dias melhores virão', 'Max Lucado', 96, 'Lido')
const livro2 = new Books('O fim da ansiedade', 'Max Lucado', 223, 'Não Lido')

addBookToLibrary(livro1)
addBookToLibrary(livro2)

console.log(myLibrary)