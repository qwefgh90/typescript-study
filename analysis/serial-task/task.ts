export namespace task {
    /** @internal */
    export interface Task<T> {
        run(taskResult?: TaskResult<T>): void;
        get promise(): Promise<TaskResult<T>>;
        get name(): string;
    }

    class TaskImpl<U> implements Task<U> {
        private p: Promise<TaskResult<U>>;
        private func: ((t?: TaskResult<U>) => TaskResult<U>) = () => ({ code: CompletionCode.FAIL });

        constructor(private _name: string, _func: (t?: TaskResult<U>) => TaskResult<U>) {
            this.p = new Promise<TaskResult<U>>((resolve, reason) => {
                this.func = (t?: TaskResult<U>) => {
                    let result = { code: CompletionCode.FAIL };
                    try {
                        result = _func(t);
                    } finally {
                        resolve(result);
                        return result;
                    }
                }
            });
        }

        get promise(): Promise<TaskResult<U>> {
            return this.p;
        }

        get name(): string {
            return this._name;
        }
        
        async run(taskResult?: TaskResult<U>) {
            this.func(taskResult);
        }
    }

    export function createTask<U>(_name: string, _func: (t?: TaskResult<U>) => TaskResult<U>): Task<U> {
        return new TaskImpl(_name, _func);
    }

    export interface TaskResult<T> {
        value?: T;
        code: CompletionCode;
    }

    export enum CompletionCode {
        SUCCESS, FAIL
    }
}
