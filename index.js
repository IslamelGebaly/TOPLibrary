let myLibrary = [];

function Book(title, author, publisher, ISBN){
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.ISBN = ISBN;
}

function displayBooks(title, author, publisher, ISBN){
    const item = document.createElement("div");
    item.appendChild(document.createElement("label").appendChild(document.createTextNode(`Title : ${title}`)));
    item.appendChild(document.createElement("label").appendChild(document.createTextNode(`Author : ${author}`)));
    item.appendChild(document.createElement("label").appendChild(document.createTextNode(`Publisher : ${publisher}`)));
    item.appendChild(document.createElement("label").appendChild(document.createTextNode(`ISBN : ${ISBN}`)));

    document.body.appendChild(item);
}

function addBookToLibrary(title, author, publisher, ISBN){
   const newBook = new Book(title, author, publisher, ISBN);
   myLibrary.push(newBook);  
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
        for(const book of myLibrary){
            displayBooks(book.title, book.author, book.publisher, book.ISBN);
        }
    })


}

main();