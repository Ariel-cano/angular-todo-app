export interface TodoGroup{
  title: string;
  items: TodoItem[];
}

export interface TodoItem{
  title: string;
  description: string;
  status: ToDoStatus;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  creator: string;
  type: TodoType;
}

export enum ToDoStatus{
  NOT_STARTED = 'not_started',
  IN_PROGRESS ='in_progress',
  DONE = 'done'
}

export enum TodoType {
  TASK = 'task',
  BUG = 'bug'
}
