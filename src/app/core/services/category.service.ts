import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {

    private categories$ = new BehaviorSubject<Category[]>([]);
    private STORAGE_KEY = 'categories';

    constructor() {
        try {
            const savedTasks = localStorage.getItem(this.STORAGE_KEY);
            if (savedTasks) {
                this.categories$.next(JSON.parse(savedTasks));
            }
        } catch {
            this.categories$.next([]);
        }
    }

    private save(category: Category[]) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(category));
    }
    
    getCategories() {
        return this.categories$.asObservable();
    }
    
    addCategory(category: Category) {
        const updated = [...this.categories$.value, category];
        this.categories$.next(updated);
        this.save(updated);
    }
    
    deleteCategory(id: string) {
        const updated = this.categories$.value.filter(category => category.id !== id);
        this.categories$.next(updated);
        this.save(updated);
    }

    update(id: string, data: Partial<Category>) {
        const categories = this.categories$.value.map(c =>
            c.id === id ? { ...c, ...data } : c
        );

        this.categories$.next(categories);
        localStorage.setItem('categories', JSON.stringify(categories));
    }

}