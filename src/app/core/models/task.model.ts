export interface Task {
  id: string;
  title: string;
  completed: boolean;
  categoryId: String | null;
}