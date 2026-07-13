// Клас-шаблон для створення завдання
class ToDoItem {
    constructor(text) {
        this.title = text;
        this.status = "todo"; 
        this.startDate = new Date().toLocaleString(); 
        this.endDate = null; 
    }
}

// Глобальний масив для завдань
const taskList = [];

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskListUI = document.getElementById('taskListUI');

// Функція малювання (рендерингу) списку
function renderTasks() {
    taskListUI.innerHTML = ""; 

    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];

        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        if (task.status === "done") {
            li.className += " text-decoration-line-through text-muted bg-light";
        }

        li.innerHTML = `
            <div class="task-click-area flex-grow-1">
                <div class="fw-bold">${task.title}</div>
                <small class="text-muted" style="font-size: 11px;">
                    Створено: ${task.startDate}
                    ${task.endDate ? ` | Виконано: ${task.endDate}` : ''}
                </small>
            </div>
            <div class="btn-group">
                <button class="btn btn-sm btn-outline-secondary edit-btn">✏️</button>
                <button class="btn btn-sm btn-outline-danger delete-btn">🗑️</button>
            </div>
        `;

        const clickArea = li.querySelector('.task-click-area');
        clickArea.addEventListener('click', function() {
            if (task.status === "todo") {
                task.status = "done";
                task.endDate = new Date().toLocaleString();
            } else {
                task.status = "todo";
                task.endDate = null;
            }
            renderTasks(); 
        });

        const editButton = li.querySelector('.edit-btn');
        editButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Зупиняємо клік, щоб завдання не виконувалось

            const newTitle = prompt("Редагувати завдання:", task.title);
            if (newTitle !== null && newTitle.trim() !== "") {
                task.title = newTitle.trim();
                renderTasks(); 
            }
        });

        const deleteButton = li.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation(); 

            const confirmDelete = confirm(`Ви впевнені, що хочете видалити "${task.title}"?`);
            if (confirmDelete) {
                taskList.splice(i, 1);
                renderTasks(); 
            }
        });

        taskListUI.appendChild(li);
    }
}

// Функція для додавання нового завдання
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Введіть text завдання!");
        return;
    }

    const newTask = new ToDoItem(text);
    taskList.push(newTask);
    taskInput.value = "";
    renderTasks();
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});