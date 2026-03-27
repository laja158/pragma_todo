import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonLabel
} from '@ionic/angular/standalone';

import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton,
    IonList,
    IonLabel
  ],
  templateUrl: './categories.page.html'
})
export class CategoriesPage {

  categories$ = this.categoryService.getCategories();
  newCategoryName = '';

  constructor(private categoryService: CategoryService) {}

  addCategory() {
    if (!this.newCategoryName.trim()) return;

    this.categoryService.addCategory({
      id: uuidv4(),
      name: this.newCategoryName
    });

    this.newCategoryName = '';
  }

  delete(id: string) {
    this.categoryService.deleteCategory(id);
  }
}