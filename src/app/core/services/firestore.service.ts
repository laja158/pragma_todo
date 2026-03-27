import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private db = getFirestore();

  async addTask(task: any) {
    await addDoc(collection(this.db, 'tasks'), task);
  }

  async getTasks() {
    const snapshot = await getDocs(collection(this.db, 'tasks'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}