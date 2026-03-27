import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private tasks$ = new BehaviorSubject<Task[]>([]);
  private STORAGE_KEY = 'tasks';

  constructor() {
    try {
      const savedTasks = localStorage.getItem(this.STORAGE_KEY);
      if (savedTasks) {
        this.tasks$.next(JSON.parse(savedTasks));
      }
    } catch {
      this.tasks$.next([]);
    }
  }

  private save(tasks: Task[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  getTasks() {
    return this.tasks$.asObservable();
  }

  addTask(task: Task) {
    const updated = [...this.tasks$.value, task];
    this.tasks$.next(updated);
    this.save(updated);
  }

  toggleTask(id: string) {
    const updated = this.tasks$.value.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasks$.next(updated);
    this.save(updated);
  }

  deleteTask(id: string) {
    const updated = this.tasks$.value.filter(task => task.id !== id);
    this.tasks$.next(updated);
    this.save(updated);
  }
}