import { Database } from "../database/Database";
export class TodoList {
    constructor(){
      this.database = Database.getInstance();
    }
    createTask(){
        return this.database.create('tasks', body)
    }

}
export const todoList = new TodoList();