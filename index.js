let myLibrary = [];
const bookContainer = document.getElementById("book-container");

function Book(title, author, publisher, ISBN, id){
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.ISBN = ISBN;
    this.id = id;
}

function displayBook(book){
    const item = document.createElement("tr");
    
    item.setAttribute("id", book.id);
    const title = document.createElement("td");
    title.appendChild(document.createTextNode(`${book.title}`));
    item.appendChild(title);

    const author = document.createElement("td");
    author.appendChild(document.createTextNode(`${book.author}`));
    item.appendChild(author);

    const publisher = document.createElement("td");
    publisher.appendChild(document.createTextNode(`${book.publisher}`));
    item.appendChild(publisher);

    const isbn = document.createElement("td");
    isbn.appendChild(document.createTextNode(`${book.ISBN}`));
    item.appendChild(isbn);
    
    const rmButton = document.createElement("button");
    rmButton.appendChild(document.createTextNode("-"));
    rmButton.onclick = () => {
        let index = myLibrary.indexOf(myLibrary.find(element => element.id === Number.parseInt(item.getAttribute("id"))));
        myLibrary.splice(index, 1);
        loadBooks();
    };

    const readButton = document.createElement("button");
    readButton.appendChild(document.createTextNode("read"));
    readButton.setAttribute("class", "not-read");
    readButton.onclick = () => {
        if(readButton.getAttribute("class") === "not-read")
            readButton.setAttribute("class", "read");
        else
            readButton.setAttribute("class", "not-read");
    };

    
    item.appendChild((document.createElement("td")).appendChild(readButton));
    item.appendChild((document.createElement("td")).appendChild(rmButton));
    bookContainer.appendChild(item);
}

function addBookToLibrary(title, author, publisher, ISBN){
   const newBook = new Book(title, author, publisher, ISBN, myLibrary.length + 1);
   myLibrary.push(newBook);  
}

function loadBooks(){

    bookContainer.replaceChildren();
    const headerRow = document.createElement("tr");

    const title = document.createElement("th");
    title.appendChild(document.createTextNode("Title"));
    headerRow.append(title);

    const author = document.createElement("th");
    author.appendChild(document.createTextNode("Author"));
    headerRow.append(author);

    const publisher = document.createElement("th");
    publisher.appendChild(document.createTextNode("Publisher"));
    headerRow.append(publisher);

    const isbn = document.createElement("th");
    isbn.appendChild(document.createTextNode("ISBN"));
    headerRow.append(isbn);

    const  read = document.createElement("th");
    read.appendChild(document.createTextNode("Read"));
    headerRow.append(read);

    const remove = document.createElement("th");
    remove.appendChild(document.createTextNode("Remove"));
    headerRow.append(remove);

    
    bookContainer.appendChild(headerRow);
    
    for(let book of myLibrary){
        displayBook(book);
    }
}

function main(){
    loadBooks()
    const bookForm = document.getElementById("book-form");
    bookForm.addEventListener("submit", e => {
        e.preventDefault();
        const bookData = {};
        console.log("adding book....");
        Object.keys(bookForm.elements).forEach(key => {
            let element = bookForm.elements[key];
            if(element.type != "submit"){
                bookData[element.name] = element.value;
            }
        });
        console.log(bookData);
        addBookToLibrary(bookData["title"], bookData["author"], bookData["publisher"], bookData["ISBN"]);
        loadBooks();
    })

}

main();