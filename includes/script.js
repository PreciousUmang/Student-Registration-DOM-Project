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
submitButton.addEventListener("click", saveData);
function saveData() {
    const student = {
        name: studentName.value,
        id: studentID.value,
        email: studentEmail.value,
        contact: studentNumber.value
    }

// 3. VALIDATION TO AVOID EMPTY INPUT
    if (!studentName.value || !studentID.value || !studentEmail.value || !studentNumber.value) {
        return
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
    const displayDiv = document.createElement("div");
    displayDiv.classList.add("displayDiv");
    displayDiv.innerHTML = `
        <div class="record"><p>${student.name}</p></div>  
        <div class="record"><p>${student.id}</p></div>
        <div class="record"><p>${student.email}</p></div>
        <div class="record"><p>${student.contact}</p></div>
        <button class="edit-btn actionButton"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-btn actionButton"><i class="fa-solid fa-trash-can"></i></button>`;
    
    parentDiv.appendChild(displayDiv);

// 8. EDIT BUTTON
    const editBtn = displayDiv.querySelector(".edit-btn");
    editBtn.addEventListener("click", function () {
        editStudent(student, displayDiv);
    });

// 9. DELETE BUTTON
    const deleteBtn = displayDiv.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
        deleteStudent(student, displayDiv);
    });
}

// 10. EDIT STUDENT DATA ON EDIT CLICK
function editStudent(student, displayDiv) {
    studentName.value = student.name;
    studentID.value = student.id;
    studentEmail.value = student.email;
    studentNumber.value = student.contact;

// 11. DELETE ENTRY FROM TABLE WHILE EDITING
    deleteStudent(student, displayDiv);
}

// 12. DELETE STUDENT FUNCTION
function deleteStudent(student, displayDiv) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(s => s.id !== student.id);
    localStorage.setItem('students', JSON.stringify(students));
    displayDiv.remove();
}

// 13. RESET BUTTON FUNCTIONALITY
resetBtn.addEventListener("click", function () {
    form.reset();
});

// 14. FEATURE TO AVOID NUMBER INPUT IN STUDENT IS AND STUDENT NUMBER FIELD
document.addEventListener("DOMContentLoaded", function() {
    studentID.addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    studentNumber.addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});