"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var task;
(function (task) {
    class TaskImpl {
        constructor(_name, _func) {
            this._name = _name;
            this.func = () => ({ code: CompletionCode.FAIL });
            this.p = new Promise((resolve, reason) => {
                this.func = (t) => {
                    let result = { code: CompletionCode.FAIL };
                    try {
                        result = _func(t);
                    }
                    finally {
                        resolve(result);
                        return result;
                    }
                };
            });
        }
        get promise() {
            return this.p;
        }
        get name() {
            return this._name;
        }
        run(taskResult) {
            return __awaiter(this, void 0, void 0, function* () {
                this.func(taskResult);
            });
        }
    }
    function createTask(_name, _func) {
        return new TaskImpl(_name, _func);
    }
    task.createTask = createTask;
    let CompletionCode;
    (function (CompletionCode) {
        CompletionCode[CompletionCode["SUCCESS"] = 0] = "SUCCESS";
        CompletionCode[CompletionCode["FAIL"] = 1] = "FAIL";
    })(CompletionCode = task.CompletionCode || (task.CompletionCode = {}));
})(task = exports.task || (exports.task = {}));
