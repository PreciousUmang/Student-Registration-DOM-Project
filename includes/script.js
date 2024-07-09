// ITEMS THAT ARE NEEDED TO BE TAKEN
const studentName = document.querySelector("#studentName");
const studentID = document.getElementById("studentID");
const studentEmail = document.getElementById("studentEmail");
const studentNumber = document.getElementById("studentContact");
const resetBtn = document.querySelector("#reset-btn");

const form = document.querySelector("#form");
const submitButton = document.getElementById("submit-btn");
const parentDiv = document.querySelector(".entryTable");

// Load existing students from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadStudents);

// Function to load students from local storage
function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => displayStudent(student));
}

submitButton.addEventListener("click", saveData);
function saveData() {
    const student = {
        name: studentName.value,
        id: studentID.value,
        email: studentEmail.value,
        contact: studentNumber.value
    }
    // VALIDATION TO AVOID EMPTY INPUT
    if (!studentName.value || !studentID.value || !studentEmail.value || !studentNumber.value) {
        // alert(`All the fields are Mandatory!`); 
        return
    }

    // Save to local storage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    // Display the new student
    displayStudent(student);
    form.reset();
}

function displayStudent(student) {
    const displayDiv = document.createElement("div");
    displayDiv.innerHTML = `
        <div class = "row1"><p>${student.name}</p></div>  
        <div class = "row2"><p>${student.id}</p></div>
        <div class = "row3"><p>${student.email}</p></div>
        <div class="row4"><p>${student.contact}</p></div>`;
    parentDiv.appendChild(displayDiv);
    displayDiv.classList.add("displayDiv");
}

resetBtn.addEventListener("click", function () { form.reset() });