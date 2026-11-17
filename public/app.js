
import {
    addTask,
    toggleTask,
    deleteTask,
    getTaskStats
} from "./taskLogic.js";

let tasks = [];

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

function render() {
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        if (task.completed) li.classList.add("done");

        const title = document.createElement("span");
        title.textContent = task.title;

        const actions = document.createElement("div");

        const toggle = document.createElement("button");
        toggle.textContent = task.completed ? "Undo" : "Done";
        toggle.onclick = () => {
            tasks = toggleTask(tasks, task.id);
            render();
        };

        const remove = document.createElement("button");
        remove.textContent = "Delete";
        remove.classList.add("delete");
        remove.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            render();
        };

        actions.append(toggle, remove);
        li.append(title, actions);
        list.appendChild(li);
    });

    const stats = getTaskStats(tasks);

    document.getElementById("total").textContent = stats.total;
    document.getElementById("completed").textContent = stats.completed;
    document.getElementById("pending").textContent = stats.pending;
}

form.addEventListener("submit", event => {
    event.preventDefault();

    try {
        tasks = addTask(tasks, input.value);
        input.value = "";
        render();
    } catch (error) {
        alert(error.message);
    }
});

render();
