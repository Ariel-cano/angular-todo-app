export interface TodoGroup{
  title: string;
  items: TodoItem[];
}

export interface TodoItem{
  title: string;
  description: string;
  status: ToDoStatus;
}

export enum ToDoStatus{
  NOT_STARTED = 'not_started',
  IN_PROGRESS ='in_progress',
  DONE = 'done'
}
