let myLibrary = [];
const bookContainer = document.getElementById("book-container");

function Book(id, title, author, publisher, numPages, ISBN){
    this.id = id;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.numPages = numPages;
    this.ISBN = ISBN;   
    this.read = false;
}

Book.prototype.checkRead = function(){
    this.read = !this.read;
}

Book.prototype.isRead = function(){
    return this.read;
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

    const numPages = document.createElement("td");
    numPages.appendChild(document.createTextNode(`${book.numPages}`));
    item.appendChild(numPages);

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
    if(!book.isRead())
        readButton.setAttribute("class", "not-read");
    else{
        readButton.textContent = "✅";
        readButton.setAttribute("class", "read");
    }
    readButton.onclick = () => {
        if(readButton.getAttribute("class") === "not-read"){
            readButton.setAttribute("class", "read");
            readButton.textContent = "✅";
            book.checkRead();
        }
        else{
            readButton.setAttribute("class", "not-read");
            readButton.textContent = "";
            book.checkRead();
        }
    };

    const readButtonContainer = document.createElement("td");
    readButtonContainer.appendChild(readButton)
    item.appendChild(readButtonContainer);

    const rmButtonContainer = document.createElement("td");
    rmButtonContainer.appendChild(rmButton)
    item.appendChild(rmButtonContainer);

    bookContainer.appendChild(item);
}

function addBookToLibrary(title, author, publisher, numPages, ISBN){
   const newBook = new Book(myLibrary.length + 1, title, author, publisher, numPages, ISBN);
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

    const numPages = document.createElement("th");
    numPages.appendChild(document.createTextNode("#Pages"));
    headerRow.append(numPages);

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
    loadBooks();
    const bookForm = document.getElementById("book-form");
    bookForm.addEventListener("submit", e => {
        e.preventDefault();
        const bookData = {};
        console.log("adding book....");
        let flag = true;
        Object.keys(bookForm.elements).forEach(key => {
            let element = bookForm.elements[key];
            if(element.value === ""){
                flag = false;
                return;
            }
            if(element.type != "submit"){
                bookData[element.name] = element.value;
            }
        });
        
        if(flag)
            addBookToLibrary(bookData["title"], bookData["author"], bookData["publisher"], bookData["numPages"], bookData["ISBN"]);
        loadBooks();
        bookForm.reset();
    })

}

main();