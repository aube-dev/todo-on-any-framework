import { Injectable } from '@angular/core';
import TodoMapper from './TodoMapper';
import { Todo } from '../models/todos';
import { TodoDataSaver } from './data-saver.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalTodoDataSaver implements TodoDataSaver {
  private LOCAL_DB_KEY = 'todos';

  constructor() {}

  save(todos: Todo[]): void {
    try {
      localStorage.setItem(this.LOCAL_DB_KEY, JSON.stringify(todos));
    } catch (e) {
      console.log('LocalDBSaver save 에러');
    }
  }

  findAllTodos(): any[] {
    return JSON.parse(localStorage.getItem(this.LOCAL_DB_KEY) || '[]').map(
      (json: any) => TodoMapper.toModel(json)
    );
  }

  update(id: number, todo: Todo): void {
    const allTodos = this.findAllTodos();
    const todoIdx = allTodos.findIndex((todo) => todo.id === id);
    allTodos[todoIdx] = todo;
    this.save(allTodos);
  }

  delete(id: number): void {
    const allTodos = this.findAllTodos();
    const filteredTodos = allTodos.filter((todo) => todo.id !== id);
    this.save(filteredTodos);
  }
}
