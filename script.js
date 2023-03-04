const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let taskCounter = 0;

function addTask() {
	if (newTaskInput.value.trim() === '') {
		alert('Please enter a task.');
		return;
	}

	if (taskCounter >= 5) {
		addTaskButton.disabled = true;
	}

	const taskItem = document.createElement('li');
	taskItem.classList.add('task-item');
	taskItem.innerHTML = `
		<input type="checkbox">
		<input type="text" value="${newTaskInput.value}">
		<button class="edit-btn">Edit</button>
		<button class="save-btn">Save</button>
		<button class="delete-btn">Delete</button>
	`;
	taskList.appendChild(taskItem);

	newTaskInput.value = '';
	taskCounter++;
}

function deleteTask(e) {
	if (e.target.classList.contains('delete-btn')) {
		e.target.parentNode.remove();
		taskCounter--;

		if (taskCounter < 5) {
			addTaskButton.disabled = false;
		}
	}
}

function editTask(e) {
	if (e.target.classList.contains('edit-btn')) {
		const taskItem = e.target.parentNode;
		const taskInput = taskItem.querySelector('input[type="text"]');
		const saveButton = taskItem.querySelector('.save-btn');
		taskInput.disabled = false;
		saveButton.disabled = false;
		taskInput.focus();
	}
}

function saveTask(e) {
	if (e.target.classList.contains('save-btn')) {
		const taskItem = e.target.parentNode;
		const taskInput = taskItem.querySelector('input[type="text"]');
		taskInput.disabled = true;
		e.target.disabled = true;
	}
}

function toggleDone(e) {
	if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
		const taskItem = e.target.parentNode;
		taskItem.classList.toggle('done');
	}
}

addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', editTask);
taskList.addEventListener('click', saveTask);
taskList.addEventListener('click', toggleDone);

