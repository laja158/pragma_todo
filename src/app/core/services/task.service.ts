import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private tasks$ = new BehaviorSubject<Task[]>([]);

  getTasks() {
    return this.tasks$.asObservable();
  }

  addTask(task: Task) {
    this.tasks$.next([...this.tasks$.value, task]);
  }

  toggleTask(id: string) {
    const updated = this.tasks$.value.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasks$.next(updated);
  }

  deleteTask(id: string) {
    this.tasks$.next(this.tasks$.value.filter(task => task.id !== id));
  }
}