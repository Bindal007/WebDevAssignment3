// Title constructor function that creates a Title object
function Title(title) {
    this.myTitle = title;
}

Title.prototype.getName = function () {
    return this.myTitle;
}

// Object for social media links
var socialMedia = {
    facebook: 'http://facebook.com',
    twitter: 'http://twitter.com',
    flickr: 'http://flickr.com',
    youtube: 'http://youtube.com'
};

var title = new Title("CONNECT WITH ME!");

// Function to add event listeners
function addEventListeners() {
    // Add event listeners to all checkboxes and images
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

    // Hide "Delete" and "Edit" columns initially
    var deleteEditCells = document.querySelectorAll('th:last-child, th:nth-last-child(2), td:last-child, td:nth-last-child(2)');
    deleteEditCells.forEach(function (cell) {
        cell.style.display = 'none';
    });
}

addEventListeners();

// Initialize a counter for newly added students
var studentCounter = 4;

// Function to add a new student row
function addNewStudent() {
    var table = document.getElementById('myTable');

    // Create a new row for student data
    var studentDataRow = table.insertRow(-1);
    studentDataRow.setAttribute("student-number", studentCounter);

    // Create cells for the student data row
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

    // Create a new row for award details
    var awardDetailsRow = table.insertRow(-1);

    // Add class to the student data row
    awardDetailsRow.className = 'dropDownTextArea';

    // Create a cell for the award details row
    var awardDetailsCell = awardDetailsRow.insertCell(0);
    awardDetailsCell.colSpan = 8;

    // Set content for the award details cell
    awardDetailsCell.innerHTML = `
        Advisor: Advisor ${studentCounter}<br /><br />
        Award Details<br />
        Summer 1-2014(TA)<br />
        Budget Number: <br />
        Tuition Number: <br />
        Comments:<br /><br /><br />
        Award Status:<br /><br /><br />
    `;

    // Increment the counter for the next student
    studentCounter++;

    // Display a success message
    alert('Student ' + (studentCounter - 1) + ' Record added successfully');
    addEventListeners();
}

// Add event listener to the "Add New Student" button
var addButton = document.getElementById('add');
addButton.addEventListener('click', function () {
    addNewStudent();
});

// Function to toggle the visibility of "Delete" and "Edit" columns when a checkbox is clicked
function toggleDeleteEditColumns(checkbox) {
    var row = checkbox.parentElement.parentElement; // Get the parent row
    var deleteCell = row.querySelector('td:last-child'); // Get the last cell (Delete column)
    var editCell = row.querySelector('td:nth-last-child(2)'); // Get the previous cell (Edit column)
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

// Function to toggle the visibility of "dropDownTextArea" rows when the image is clicked
function toggleDropDown(image) {
    var row = image.parentElement.parentElement; // Get the parent row
    var dropDownRow = row.nextElementSibling; // Get the next row (dropDownTextArea)
    var childNode = dropDownRow.children[0];
    if (dropDownRow.style.display === 'none' || dropDownRow.style.display === '') {
        dropDownRow.style.display = 'table-row';
        childNode.style.display = 'table-cell';
    } else {
        dropDownRow.style.display = 'none';
        childNode.style.display = 'none';
    }
}

// Function to delete a row
function deleteRow(button) {
    if (window.confirm("Are you sure, you want to delete this record? ")) {
        const row = button.parentElement.parentElement; // Get the grandparent row
        const childRow = row.nextElementSibling;
        const stu = row.cells[1].innerHTML;
        row.remove();
        childRow.remove();
        alert(`Record for ${stu} is deleted!`);
        addEventListeners();
    }
}

// Function to edit a row (you can implement your edit logic here)
function editRow(button) {
    // Get the row containing the Edit button
    var row = button.parentElement.parentElement;
    // Get the student number from the row (assuming it's stored in a data attribute)
    var studentNumber = parseInt(row.getAttribute('student-number'));

    // Display the edit popup for the selected student
    showEditPopup(studentNumber, row);
}

// Function to display the edit popup
function showEditPopup(studentNumber, row) {
    var popup = document.getElementById('editPopup');
    var title = document.getElementById('popupTitle');
    var studentDetails = document.getElementById('studentDetails');

    // Set the title of the edit popup
    title.textContent = 'Edit details of Student ' + studentNumber;

    // Get the student details from the corresponding row
    var cells = row.querySelectorAll('td');
    var tableHead = document.getElementById('table-head');
    var headCells = tableHead.querySelectorAll('th');
    var detailsHTML = '<div class="edit-details"><div>';

    for (var i = 1; i < cells.length - 2; i++) {
        detailsHTML += headCells[i].textContent + ':&nbsp;<br>';
    }

    detailsHTML += "</div><div>";

    for (var i = 1; i < cells.length - 2; i++) {
        detailsHTML += cells[i].textContent + '<br>';
    }

    detailsHTML += "</div></div>"

    studentDetails.innerHTML = detailsHTML;

    // Show the edit popup
    popup.style.display = 'block';
}

// Function to hide the edit popup
function hideEditPopup() {
    var popup = document.getElementById('editPopup');
    popup.style.display = 'none';
}

// Add event listeners to all Edit buttons
var editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Get the student number from the button's student-number attribute
        var studentNumber = parseInt(button.getAttribute('student-number'));
        showEditPopup(studentNumber);
    });
});

// Add event listener to the Update button in the edit popup
var updateButton = document.getElementById('updateButton');
updateButton.addEventListener('click', function () {
    // Close the edit popup
    hideEditPopup();
    // Display a success message
    alert('Student data updated successfully');
});

// Add event listener to the Cancel button in the edit popup
var cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click', function () {
    // Close the edit popup
    hideEditPopup();
});
