class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBookToList(book){

        const list = document.getElementById('book-list');

        const row = document.createElement('tr');
    
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="" class="delete">X</a></td>
     `;
    
        list.appendChild(row);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    showAlert(message, className){

        const div = document.createElement('div');

        div.className = `alert animated fadeInDown ${className}`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');

        const form = document.getElementById('book-form');

        container.insertBefore(div, form);

        setTimeout(function(){
            document.querySelector('.alert ').remove();
        }, 2500);
    }

    clearFields(){

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

class Store {
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        
        return books;
    }
    //Display books on the UI
    static displayBook(){


    }
    // Add the book to the LS
    static addBook(book){
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static deleteBook(){

    }
};

document.addEventListener('DOMContentLoaded', Store.displayBook);

document.getElementById('book-form').addEventListener('submit', function(e){

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;


        const book = new Book(title, author, isbn);

        const ui = new UI();
        
        //validate
        if(book.title === '' || book.author ==='' || book.isbn === ''){
            ui.showAlert('Please fill in all fields', 'error');
        } else {
            ui.addBookToList(book);

            Store.addBook(book);

            ui.showAlert('Book successfully added.', 'success');

            ui.clearFields();
        }

        e.preventDefault();
})


document.getElementById('book-list').addEventListener('click', function(e){

        const ui = new UI();

        ui.deleteBook(e.target);
        if(e.target.className === 'delete'){
            ui.showAlert('Book removed.', 'success');
        }

        e.preventDefault();
})