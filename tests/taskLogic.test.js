
import test from "node:test";
import assert from "node:assert/strict";

import {
    addTask,
    toggleTask,
    deleteTask,
    getTaskStats
} from "../public/taskLogic.js";

test("Add a new task", () => {
    const tasks = addTask([], "Learn Jenkins");

    assert.equal(tasks.length, 1);
    assert.equal(tasks[0].title, "Learn Jenkins");
    assert.equal(tasks[0].completed, false);
});

test("Reject an empty task", () => {
    assert.throws(() => addTask([], "   "));
});

test("Toggle task completion", () => {
    const tasks = [
        { id: 1, title: "Test", completed: false }
    ];

    const result = toggleTask(tasks, 1);

    assert.equal(result[0].completed, true);
});

test("Delete a task", () => {
    const tasks = [
        { id: 1, title: "Test", completed: false }
    ];

    assert.equal(deleteTask(tasks, 1).length, 0);
});

test("Calculate task statistics", () => {
    const tasks = [
        { id: 1, title: "A", completed: true },
        { id: 2, title: "B", completed: false },
        { id: 3, title: "C", completed: true }
    ];

    assert.deepEqual(getTaskStats(tasks), {
        total: 3,
        completed: 2,
        pending: 1
    });
});
