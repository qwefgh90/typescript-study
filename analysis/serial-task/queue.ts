import { task } from "./task";
export namespace queue {
    export class TaskQueue<T> {
        private serialTasks: task.Task<T>[] = [];
        private runningTask: task.Task<T> | undefined;
        private unhandledResult: task.TaskResult<T> | undefined;
        constructor(private _name: string){}
        
        get name(){
            return this._name;
        }

        pushDeferredTask(task: task.Task<T>) {
            task.promise.then((result) => {
                this.runningTask = undefined;
                this.setUnhandledResult(result);
                this.dequeueWhenIdle();
            });
            this.serialTasks.push(task);
            this.dequeueWhenIdle();
        }

        private dequeueWhenIdle() {
            if (!this.runningTask)
                if (this.dequeue())
                    this.cleanUnhandledResult();
        }

        private dequeue() {
            const arrWithFirst = this.serialTasks.splice(0, 1);
            if (arrWithFirst.length == 1) {
                const runningTask = arrWithFirst[0];
                this.runningTask = runningTask;
                runningTask.run(this.getUnhandledResult());
                return runningTask;
            } else {
                console.debug(`[${this.name}] There are no tasks to execute.`);
            }
        }

        private getUnhandledResult(){
            return this.unhandledResult;
        }

        private setUnhandledResult(lastResult: task.TaskResult<T>) {
            this.unhandledResult = lastResult;
        }

        private cleanUnhandledResult() {
            this.unhandledResult = undefined;
        }
    }
}
