"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queue = void 0;
var queue;
(function (queue) {
    class TaskQueue {
        constructor(_name) {
            this._name = _name;
            this.serialTasks = [];
        }
        get name() {
            return this._name;
        }
        pushDeferredTask(task) {
            task.promise.then((result) => {
                this.runningTask = undefined;
                this.setUnhandledResult(result);
                this.dequeueWhenIdle();
            });
            this.serialTasks.push(task);
            this.dequeueWhenIdle();
        }
        dequeueWhenIdle() {
            if (!this.runningTask)
                if (this.dequeue())
                    this.cleanUnhandledResult();
        }
        dequeue() {
            const arrWithFirst = this.serialTasks.splice(0, 1);
            if (arrWithFirst.length == 1) {
                const runningTask = arrWithFirst[0];
                this.runningTask = runningTask;
                runningTask.run(this.getUnhandledResult());
                return runningTask;
            }
            else {
                console.debug(`[${this.name}] There are no tasks to execute.`);
            }
        }
        getUnhandledResult() {
            return this.unhandledResult;
        }
        setUnhandledResult(lastResult) {
            this.unhandledResult = lastResult;
        }
        cleanUnhandledResult() {
            this.unhandledResult = undefined;
        }
    }
    queue.TaskQueue = TaskQueue;
})(queue = exports.queue || (exports.queue = {}));
