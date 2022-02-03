import { queue } from "./queue";
import { task } from "./task";
function program1(){
    let q = new queue.TaskQueue("Task Printer");
    let t1 = task.createTask("my_task1", (result) => {
        console.debug(`[${q.name}] ` + (JSON.stringify(result) ?? "_") + "\t->\tmy_task1!");
        return {code: task.CompletionCode.SUCCESS, value: "my_task1"};
    })
    let t2 = task.createTask("my_task2", (result) => {
        console.debug(`[${q.name}] ` + (JSON.stringify(result) ?? "_") + "\t->\tmy_task2!");
        return {code: task.CompletionCode.SUCCESS, value: "my_task2"};
    })
    let t3 = task.createTask("my_task3", (result) => {
        console.debug(`[${q.name}] ` + (JSON.stringify(result) ?? "_") + "\t->\tmy_task3!");
        return {code: task.CompletionCode.SUCCESS, value: "my_task3"};
    })
    q.pushDeferredTask(t1);
    q.pushDeferredTask(t2);
    q.pushDeferredTask(t3);
}

function program2(){
    let q = new queue.TaskQueue<number>('Adder');
    let t1 = task.createTask<number>("add 1", (result) => {
        return {code: task.CompletionCode.SUCCESS, value: (result?.value ?? 0) + 1};
    })
    let t2 = task.createTask<number>("add 2", (result) => {
        return {code: task.CompletionCode.SUCCESS, value: (result?.value ?? 0) + 2};
    })
    let t3 = task.createTask<number>("add 3", (result) => {
        let finalValue = (result?.value ?? 0) + 3;
        console.debug(`[${q.name}] ` + "final sum: " + finalValue);
        return {code: task.CompletionCode.SUCCESS, value: finalValue};
    })
    q.pushDeferredTask(t1);
    q.pushDeferredTask(t2);
    q.pushDeferredTask(t3);
}

program1();
program2();