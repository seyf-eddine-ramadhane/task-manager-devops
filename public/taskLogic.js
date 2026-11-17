
export function addTask(tasks, title) {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
        throw new Error("Task cannot be empty");
    }

    return [
        ...tasks,
        {
            id: Date.now() + Math.random(),
            title: cleanTitle,
            completed: false
        }
    ];
}

export function toggleTask(tasks, id) {
    return tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );
}

export function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}

export function getTaskStats(tasks) {
    return {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length
    };
}
