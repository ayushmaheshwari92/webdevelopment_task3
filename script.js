document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText, completed = false) {
        const li = document.createElement('li');
        if (completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button onclick="toggleCompleteTask(this)">✓</button>
                <button onclick="deleteTask(this)">x</button>
            </div>
        `;

        taskList.appendChild(li);
        saveTasks();
    }

    window.toggleCompleteTask = function(button) {
        const li = button.parentElement.parentElement;
        li.classList.toggle('completed');
        saveTasks();
    };

    window.deleteTask = function(button) {
        const li = button.parentElement.parentElement;
        taskList.removeChild(li);
        saveTasks();
    };

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text, task.completed);
        });
    }
});
