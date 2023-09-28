// Title constructor function
function Title(title) {
    this.myTitle = title;
}

Title.prototype.getName = function () {
    return this.myTitle;
};

// Social media links object
var socialMedia = {
    facebook: 'http://facebook.com',
    twitter: 'http://twitter.com',
    flickr: 'http://flickr.com',
    youtube: 'http://youtube.com'
};

var title = new Title("CONNECT WITH ME!");

// Function to add event listeners
function addEventListeners() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var images = document.querySelectorAll('img[src="down.png"]');

    checkboxes.forEach(function (checkbox, index) {
        checkbox.addEventListener('click', function () {
            toggleDeleteEditColumns(checkbox);
        });

        images[index].addEventListener('click', function () {
            toggleDropDown(images[index]);
        });
    });

    var deleteEditCells = document.querySelectorAll('th:last-child, th:nth-last-child(2), td:last-child, td:nth-last-child(2)');
    deleteEditCells.forEach(function (cell) {
        cell.style.display = 'none';
    });
}

addEventListeners();

var studentCounter = 4;

// Function to add a new student row
function addNewStudent() {
    var table = document.getElementById('myTable');
    var studentDataRow = table.insertRow(-1);
    studentDataRow.setAttribute("student-number", studentCounter);

    var cellContents = [
        '<input type="checkbox" /><br /><br /><img src="down.png" width="25px" />',
        'Student ' + studentCounter,
        'Teacher ' + studentCounter,
        'Approved',
        'Fall',
        'TA',
        12345 + studentCounter - 1,
        '100%',
        '',
        ''
    ];

    for (var i = 0; i < cellContents.length; i++) {
        var cell = studentDataRow.insertCell(i);
        cell.innerHTML = cellContents[i];
    }

    var awardDetailsRow = table.insertRow(-1);
    awardDetailsRow.className = 'dropDownTextArea';
    var awardDetailsCell = awardDetailsRow.insertCell(0);
    awardDetailsCell.colSpan = 8;

    awardDetailsCell.innerHTML = `
        Advisor: Advisor ${studentCounter}<br /><br />
        Award Details<br />
        Summer 1-2014(TA)<br />
        Budget Number: <br />
        Tuition Number: <br />
        Comments:<br /><br /><br />
        Award Status:<br /><br /><br />
    `;

    studentCounter++;
    alert('Student ' + (studentCounter - 1) + ' Record added successfully');
    addEventListeners();
}

var addButton = document.getElementById('add');
addButton.addEventListener('click', function () {
    addNewStudent();
});

function toggleDeleteEditColumns(checkbox) {
    var row = checkbox.parentElement.parentElement;
    var deleteCell = row.querySelector('td:last-child');
    var editCell = row.querySelector('td:nth-last-child(2)');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var deleteEditColumns = document.querySelectorAll('.delete-edit-column');

    var isAnyCheckboxChecked = Array.from(checkboxes).some(function (checkbox) {
        return checkbox.checked;
    });

    var submitButton = document.getElementById('button');
    submitButton.disabled = !isAnyCheckboxChecked;
    row.style.backgroundColor = checkbox.checked ? 'yellow' : 'white';

    deleteEditColumns.forEach(function (column) {
        column.style.display = isAnyCheckboxChecked ? 'table-cell' : 'none';
    });

    if (checkbox.checked) {
        if (deleteCell.innerHTML.trim() === '') {
            deleteCell.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
        }

        if (editCell.innerHTML.trim() === '') {
            editCell.innerHTML = '<button onclick="editRow(this)">Edit</button>';
        }

        deleteCell.style.display = 'table-cell';
        editCell.style.display = 'table-cell';
    } else {
        deleteCell.innerHTML = '';
        editCell.innerHTML = '';
        deleteCell.style.display = 'none';
        editCell.style.display = 'none';
    }
}

function toggleDropDown(image) {
    var row = image.parentElement.parentElement;
    var dropDownRow = row.nextElementSibling;
    var childNode = dropDownRow.children[0];
    if (dropDownRow.style.display === 'none' || dropDownRow.style.display === '') {
        dropDownRow.style.display = 'table-row';
        childNode.style.display = 'table-cell';
    } else {
        dropDownRow.style.display = 'none';
        childNode.style.display = 'none';
    }
}

function deleteRow(button) {
    if (window.confirm("Are you sure, you want to delete this record? ")) {
        const row = button.parentElement.parentElement;
        const childRow = row.nextElementSibling;
        const stu = row.cells[1].innerHTML;
        row.remove();
        childRow.remove();

        var checkboxes = document.querySelectorAll('input[type="checkbox"]');

        var isAnyCheckboxChecked = Array.from(checkboxes).some(function (checkbox) {
            return checkbox.checked;
        });

        var submitButton = document.getElementById('button');
        submitButton.disabled = !isAnyCheckboxChecked;
        alert(`Record for ${stu} is deleted!`);
        addEventListeners();
    }
}

function editRow(button) {
    var row = button.parentElement.parentElement;
    var studentNumber = parseInt(row.getAttribute('student-number'));
    console.log(studentNumber);
}
