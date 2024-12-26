const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
loadTasks();

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        createTaskEle(task);
    
        taskInput.value = "";
    } else {
        alert("Please insert a Task");
    }
    saveTasks();
}

addButton.addEventListener('click',addTask);


function createTaskEle(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteTask";

    const doneBtn = document.createElement('button');
    doneBtn.textContent = "Done";
    doneBtn.className = "doneTask";

    taskList.appendChild(listItem);
    listItem.appendChild(deleteBtn);
    listItem.appendChild(doneBtn);

    deleteBtn.addEventListener('click',()=>{
        taskList.removeChild(listItem);
        saveTasks();
    })

    doneBtn.addEventListener('click',()=>{
        listItem.style.textDecoration = "line-through";
        listItem.style.color = "var(--doneText)";
    })
}

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach((item)=>{
        tasks.push(item.textContent.replace('DeleteDone','').trim());
    });

    localStorage.setItem('tasks',JSON.stringify(tasks)); //Convert to JSON file
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || "[]");// convert back to Array
    tasks.forEach(createTaskEle);
}
