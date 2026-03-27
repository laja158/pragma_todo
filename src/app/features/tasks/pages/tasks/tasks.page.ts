import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TasksPage implements OnInit {

  tasks$ = this.taskService.getTasks();
  newTaskTitle = '';

  constructor(private taskService: TaskService) {}

  addTask() {
  if (!this.newTaskTitle.trim()) return;

    this.taskService.addTask({
      id: uuidv4(),
      title: this.newTaskTitle,
      completed: false
    });

    this.newTaskTitle = '';
  }

  toggle(id: string) {
    this.taskService.toggleTask(id);
  }

  delete(id: string) {
    this.taskService.deleteTask(id);
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  ngOnInit() {
  }

}
