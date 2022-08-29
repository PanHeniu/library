function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

// Book.prototype.info = function() {
//     return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
// };

let myLibrary = [];

const addButton = document.getElementById('add-book-button');
addButton.addEventListener('click', addBookToLibrary);

function addBookToLibrary() {
    const inputElementValues = document.querySelectorAll('.book-input');
    const book = new Book(inputElementValues[0].value, inputElementValues[1].value, inputElementValues[2].value, checkReadBox(inputElementValues[3]));
    myLibrary.push(book);
    displayBooks(); // generates the dispaly again after adding a new object to the array
};

function checkReadBox(boxToCheck) {
    if (boxToCheck.checked == true) {
        return true;
      } else {
        return false;
      };
};

const displayContainer = document.getElementById('display-books-field');

// shows the list of added books in a table
function displayBooks() {
    // resets the container field first to avoid duplicates
    displayContainer.textContent = ''; 
    let tr = [];

    for (let i = 0; i < myLibrary.length; i++) {
        tr[i] = document.createElement('tr');
        tr[i].className = 'book-tr';

        let td  = [];
        let buttons = []; 
        let objectElements = ['title', 'author', 'pages', 'read']
        for (let j = 0; j < 5; j++) {
            td[j] = document.createElement('td');
            if (j < 3) { // get text from the first three 'text' inputs
                td[j].textContent = myLibrary[i][objectElements[j]];
            } else if (j === 3) { // the fourth input is of type 'checkbox'
                let checkboxInsideTd = document.createElement('input');
                checkboxInsideTd.type = 'checkbox';
                checkboxInsideTd.className = 'read-checkbox';
                // to associate this DOM element with the actual object it uses a data-attribute that corresponds to the index of the myLibrary array *
                checkboxInsideTd.setAttribute('data-box-no', i);
                if (myLibrary[i].read === true) {
                    checkboxInsideTd.checked = true;
                  } else {
                    checkboxInsideTd.checked = false;
                  }
                  td[j].appendChild(checkboxInsideTd);
            } else { // not an input, creates an additional 'remove' button
                buttons[i] = document.createElement('button');
                buttons[i].className = 'x-button';
                buttons[i].setAttribute('data-object-no', i); // *
                buttons[i].textContent = 'X';
                td[j].appendChild(buttons[i]);
            }
            // adds these td's to the tr (of table)
            tr[i].appendChild(td[j]);
        };
        // and lastly adds these tr's to the tbody of the table
        displayContainer.appendChild(tr[i]);
    };

    // removes a given object from an array and thereby the display list
    // has to be done inside the displayBooks function since the tr's and buttons were created here
    const xButton = document.querySelectorAll('.x-button');
    xButton.forEach(xButton => xButton.addEventListener('click', deleteBook));
    
    function deleteBook(e) {
        let dataObjNo = parseInt(e.target.getAttribute('data-object-no'));
        myLibrary.splice(dataObjNo, 1);
        displayBooks(); // restarts the entire function to display the list of books from scratch (since an object was removed)
    };

    // changes the read checkbox of existing object elements
    const readCheckbox = document.querySelectorAll('.read-checkbox');
    readCheckbox.forEach(box => box.addEventListener('click', checkTheBox));

    function checkTheBox(e) {
        let dataBoxNo = parseInt(e.target.getAttribute('data-box-no'));
        if (myLibrary[dataBoxNo].read == false) {
            // toggle on
            myLibrary[dataBoxNo].read = true;
        } else {
            // toggle off
            myLibrary[dataBoxNo].read = false;
        }
    };
};
