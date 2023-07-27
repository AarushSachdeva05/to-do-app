document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="edit" onclick="editTask(this)">Edit</button>
        <button class="delete" onclick="deleteTask(this)">Delete</button>
    `;

    li.addEventListener("click", toggleCompleted);
    taskList.appendChild(li);
    taskInput.value = "";

    saveTaskToLocalStorage(li);
}

function deleteTask(btn) {
    const taskList = document.getElementById("taskList");
    const li = btn.parentElement;
    taskList.removeChild(li);
    removeTaskFromLocalStorage(li);
}

function toggleCompleted() {
    this.classList.toggle("completed");
    updateTaskInLocalStorage(this);
}

function editTask(btn) {
    const li = btn.parentElement;
    const taskText = li.querySelector("span").textContent;
    li.classList.add("editing");
    li.innerHTML = `
        <input type="text" value="${taskText}">
        <button class="save" onclick="saveEditedTask(this)">Save</button>
    `;
}

function saveEditedTask(btn) {
    const li = btn.parentElement;
    const newTaskText = li.querySelector("input").value.trim();
    if (newTaskText === "") {
        return;
    }
    li.classList.remove("editing");
    li.innerHTML = `
        <span>${newTaskText}</span>
        <button class="edit" onclick="editTask(this)">Edit</button>
        <button class="delete" onclick="deleteTask(this)">Delete</button>
    `;
    updateTaskInLocalStorage(li);
}

function saveTaskToLocalStorage(taskLi) {
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.children).map((li) => li.querySelector("span").textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        `;
        li.addEventListener("click", toggleCompleted);
        taskList.appendChild(li);
    });
}

function removeTaskFromLocalStorage(taskLi) {
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.children).map((li) => li.querySelector("span").textContent);
    const taskIndex = tasks.indexOf(taskLi.querySelector("span").textContent);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function updateTaskInLocalStorage(taskLi) {
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.children).map((li) => li.querySelector("span").textContent);
    const taskIndex = tasks.indexOf(taskLi.querySelector("span").textContent);
    if (taskIndex !== -1) {
        tasks[taskIndex] = taskLi.querySelector("span").textContent;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

document.getElementById("taskInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
