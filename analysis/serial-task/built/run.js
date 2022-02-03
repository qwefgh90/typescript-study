"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("./queue");
const task_1 = require("./task");
function program1() {
    let q = new queue_1.queue.TaskQueue("Task Printer");
    let t1 = task_1.task.createTask("my_task1", (result) => {
        var _a;
        console.debug(`[${q.name}] ` + ((_a = JSON.stringify(result)) !== null && _a !== void 0 ? _a : "_") + "\t->\tmy_task1!");
        return { code: task_1.task.CompletionCode.SUCCESS, value: "my_task1" };
    });
    let t2 = task_1.task.createTask("my_task2", (result) => {
        var _a;
        console.debug(`[${q.name}] ` + ((_a = JSON.stringify(result)) !== null && _a !== void 0 ? _a : "_") + "\t->\tmy_task2!");
        return { code: task_1.task.CompletionCode.SUCCESS, value: "my_task2" };
    });
    let t3 = task_1.task.createTask("my_task3", (result) => {
        var _a;
        console.debug(`[${q.name}] ` + ((_a = JSON.stringify(result)) !== null && _a !== void 0 ? _a : "_") + "\t->\tmy_task3!");
        return { code: task_1.task.CompletionCode.SUCCESS, value: "my_task3" };
    });
    q.pushDeferredTask(t1);
    q.pushDeferredTask(t2);
    q.pushDeferredTask(t3);
}
function program2() {
    let q = new queue_1.queue.TaskQueue('Adder');
    let t1 = task_1.task.createTask("add 1", (result) => {
        var _a;
        return { code: task_1.task.CompletionCode.SUCCESS, value: ((_a = result === null || result === void 0 ? void 0 : result.value) !== null && _a !== void 0 ? _a : 0) + 1 };
    });
    let t2 = task_1.task.createTask("add 2", (result) => {
        var _a;
        return { code: task_1.task.CompletionCode.SUCCESS, value: ((_a = result === null || result === void 0 ? void 0 : result.value) !== null && _a !== void 0 ? _a : 0) + 2 };
    });
    let t3 = task_1.task.createTask("add 3", (result) => {
        var _a;
        let finalValue = ((_a = result === null || result === void 0 ? void 0 : result.value) !== null && _a !== void 0 ? _a : 0) + 3;
        console.debug(`[${q.name}] ` + "final sum: " + finalValue);
        return { code: task_1.task.CompletionCode.SUCCESS, value: finalValue };
    });
    q.pushDeferredTask(t1);
    q.pushDeferredTask(t2);
    q.pushDeferredTask(t3);
}
program1();
program2();
