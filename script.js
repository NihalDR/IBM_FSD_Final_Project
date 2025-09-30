const tasksKey = 'study-tasks';
const taskForm = document.getElementById('taskForm');
const tasksList = document.getElementById('tasksList');
const timelineDiv = document.getElementById('timeline');

let tasks = JSON.parse(localStorage.getItem(tasksKey)) || [];

function renderTasks() {
  tasksList.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.name} (Due: ${task.deadline}, ${task.priority})</span>
      <button onclick="toggleComplete(${idx})">${task.completed ? 'Undo' : 'Complete'}</button>
      <button onclick="removeTask(${idx})">Delete</button>
    `;
    tasksList.appendChild(li);
  });
  renderTimeline();
  localStorage.setItem(tasksKey, JSON.stringify(tasks));
}

taskForm.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('taskName').value;
  const deadline = document.getElementById('taskDeadline').value;
  const priority = document.getElementById('taskPriority').value;
  tasks.push({ name, deadline, priority, completed: false });
  taskForm.reset();
  renderTasks();
};

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTimeline() {
  timelineDiv.innerHTML = '<h2>Timeline</h2>';
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  sortedTasks.forEach(task => {
    const bar = document.createElement('div');
    bar.style.width = '100%';
    bar.style.padding = '6px';
    bar.style.margin = '4px 0';
    bar.style.background = task.completed ? '#dfe6e9' : '#81ecec';
    bar.style.borderRadius = '5px';
    bar.textContent = `${task.name} - ${task.deadline}`;
    timelineDiv.appendChild(bar);
  });
}

// Initial Render
renderTasks();
