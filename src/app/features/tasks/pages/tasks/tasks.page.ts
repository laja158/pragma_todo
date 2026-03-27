import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonCheckbox, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { TaskService } from 'src/app/core/services/task.service';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category.service';
import { RemoteConfigService } from 'src/app/core/services/remote-config.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonCheckbox, IonItem, IonLabel, IonInput , IonButton, IonSelect, IonSelectOption, CommonModule, FormsModule]
})
export class TasksPage implements OnInit {

  tasks$ = this.taskService.getTasks();
  categories$ = this.categoryService.getCategories();
  newTaskTitle = '';
  selectedCategory: String | null = null; 
  useCategories = true;

  selectedCategoryFilter$ = new BehaviorSubject<string | null>(null);

  constructor(private taskService: TaskService, private categoryService: CategoryService, private remoteConfigService: RemoteConfigService) {}

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.addTask({
      id: uuidv4(),
      title: this.newTaskTitle,
      completed: false,
      categoryId: this.selectedCategory
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

  filterByCategory(categoryId: string | null) {
    this.selectedCategoryFilter$.next(categoryId || null);
  }

  vm$ = combineLatest({
      tasks: this.tasks$,
      categories: this.categories$,
      selectedCategory: this.selectedCategoryFilter$
    }).pipe(
      map(({ tasks, categories, selectedCategory }) => {
        const filteredTasks = selectedCategory
          ? tasks.filter(t => t.categoryId === selectedCategory)
          : tasks;

        return filteredTasks.map(task => ({
          ...task,
          categoryName: categories.find(c => c.id === task.categoryId)?.name || ''
        }));
      })
    );

  async ngOnInit() {
    await this.remoteConfigService.init();
    this.useCategories = this.remoteConfigService.getFeatureFlag();
  }

}
