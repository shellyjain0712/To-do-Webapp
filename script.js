const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const pendingTasksContainer = document.getElementById('pendingTasks');
const completedTasksContainer = document.getElementById('completedTasks');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(taskTitle.value, taskDescription.value);
  taskForm.reset();
});

function addTask(title, description) {
  const timestamp = new Date().toLocaleString();
  const newTask = { id: Date.now(), title, description, timestamp, completed: false };
  tasks.push(newTask);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    const newTitle = prompt('Edit Task Title:', task.title);
    const newDescription = prompt('Edit Task Description:', task.description);
    if (newTitle && newDescription) {
      task.title = newTitle;
      task.description = newDescription;
      renderTasks();
    }
  }
}

function toggleTaskCompletion(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    task.timestamp = new Date().toLocaleString(); // Update timestamp
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function renderTasks() {
  pendingTasksContainer.innerHTML = '<h3>Pending Tasks</h3>';
  completedTasksContainer.innerHTML = '<h3>Completed Tasks</h3>';

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = `task ${task.completed ? 'completed' : ''}`;
    taskElement.innerHTML = `
      <div class="task-info">
        <strong>${task.title}</strong><br>
        <small>${task.description}</small><br>
        <small>Added: ${task.timestamp}</small>
      </div>
      <div class="task-buttons">
        <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
        <button class="complete-btn" onclick="toggleTaskCompletion(${task.id})">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    if (task.completed) {
      completedTasksContainer.appendChild(taskElement);
    } else {
      pendingTasksContainer.appendChild(taskElement);
    }
  });
}
