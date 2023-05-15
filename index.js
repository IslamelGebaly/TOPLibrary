let myLibrary = [];
const bookContainer = document.getElementById("book-container");

function Book(title, author, publisher, ISBN){
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.ISBN = ISBN;
}

function displayBook(book){
    const item = document.createElement("div");
    item.appendChild(document.createElement("label").appendChild(document.createTextNode(`Title : ${book.title}`)));
    item.appendChild(document.createElement("label").appendChild(document.createTextNode(`Author : ${book.author}`)));
    item.appendChild(document.createElement("label").appendChild(document.createTextNode(`Publisher : ${book.publisher}`)));
    item.appendChild(document.createElement("label").appendChild(document.createTextNode(`ISBN : ${book.ISBN}`)));

    bookContainer.appendChild(item);
}

function addBookToLibrary(title, author, publisher, ISBN){
   const newBook = new Book(title, author, publisher, ISBN);
   myLibrary.push(newBook);  
}

function loadBooks(){
    bookContainer.replaceChildren();
    for(let book of myLibrary){
        displayBook(book);
    }
}

function main(){

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