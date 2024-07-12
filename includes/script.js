const studentName = document.querySelector("#studentName");
const studentID = document.getElementById("studentID");
const studentEmail = document.getElementById("studentEmail");
const studentNumber = document.getElementById("studentContact");
const resetBtn = document.querySelector("#reset-btn");

const form = document.querySelector("#form");
const submitButton = document.getElementById("submit-btn");
const parentDiv = document.querySelector(".entryTable");

// 1. LOAD STUDENT FROM LOCAL STORAGE
document.addEventListener("DOMContentLoaded", loadStudents);
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => displayStudent(student));
}

// 2. FUNCTION TO SAVE NEW STUDENT
form.addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission
    saveData();
});

function saveData() {
    const student = {
        name: studentName.value,
        id: studentID.value,
        email: studentEmail.value,
        contact: studentNumber.value
    }

    // 3. VALIDATION TO AVOID EMPTY INPUT AND CHECK LENGTH
    if (!studentName.value || !studentID.value || !studentEmail.value || !studentNumber.value) {
        alert("Please fill out all fields.");
        return;
    }

    if (studentID.value.length !== 7) {
        alert("Student ID must be exactly 7 digits.");
        return;
    }

    if (studentNumber.value.length !== 10) {
        alert("Contact number must be exactly 10 digits.");
        return;
    }

    // 4. SAVING TO LOCAL STORAGE USING DEEP COPY (JSON PARSE/STRINGIFY)
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    // 5. DISPLAY NEW STUDENT
    displayStudent(student);

    // 6. FORM RESET
    form.reset();
}

// 7. FUNCTION TO DISPLAY STUDENT DATA ON PAGE
function displayStudent(student) {
    const recordRow = document.createElement("tr");
    recordRow.classList.add("recordRow");
    recordRow.innerHTML = `
        <td class="record">${student.name}</td>  
        <td class="record">${student.id}</td>
        <td class="record">${student.email}</td>
        <td class="record">${student.contact}</td>
        <td class="actionButton">
            <button class="edit-btn actionButton">
                <i class="fa-solid fa-lg fa-pen-to-square"></i>
            </button>
            <button class="delete-btn actionButton">
                <i class="fa-solid fa-lg fa-trash-can"></i>
            </button>
        </td>`;
    
    parentDiv.appendChild(recordRow);

    // 8. EDIT BUTTON
    const editBtn = recordRow.querySelector(".edit-btn");
    editBtn.addEventListener("click", function () {
        editStudent(student, recordRow);
    });

    // 9. DELETE BUTTON
    const deleteBtn = recordRow.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
        deleteStudent(student, recordRow);
    });
}

// 10. EDIT STUDENT DATA ON EDIT CLICK
function editStudent(student, recordRow) {
    studentName.value = student.name;
    studentID.value = student.id;
    studentEmail.value = student.email;
    studentNumber.value = student.contact;

    // 11. DELETE ENTRY FROM TABLE WHILE EDITING
    deleteStudent(student, recordRow);
}

// 12. DELETE STUDENT FUNCTION
function deleteStudent(student, recordRow) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(s => s.id !== student.id);
    localStorage.setItem('students', JSON.stringify(students));
    recordRow.remove();
}

// 13. RESET BUTTON FUNCTIONALITY
resetBtn.addEventListener("click", function () {
    form.reset();
});

// 14. FEATURE TO AVOID NON-NUMERIC INPUT IN STUDENT ID AND CONTACT NUMBER FIELD
document.addEventListener("DOMContentLoaded", function() {
    studentID.addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    studentNumber.addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});
