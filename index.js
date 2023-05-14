let myLibrary = [];

function Book(title, author, publisher, ISBN){
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.ISBN = ISBN;
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
    })
}

main();