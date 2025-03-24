import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TodoGroupComponent} from './components/todo-group/todo-group/todo-group.component';
import {TodoGroup, TodoItem, ToDoStatus, TodoType} from './interfaces/todo-group-interface';
import {NgForOf, NgIf} from '@angular/common';
import {TodoModalComponent} from './components/todo-modal/todo-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoGroupComponent, NgForOf, TodoModalComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public todoGroups: TodoGroup[];
  public showModal: boolean = false;
  private nextId: number = 1;

  constructor() {
    this.todoGroups = [{
      title: 'ToDo',
      items: [{
        title: 'Create ToDo',
        description: 'Create ToDo Angular',
        status: ToDoStatus.IN_PROGRESS,
        id: this.nextId++,
        createdAt: new Date(),
        updatedAt: new Date(),
        creator: 'System',
        type: TodoType.TASK
      },
        {
          title: 'Hand over the session',
          description: 'Create another things',
          status: ToDoStatus.NOT_STARTED,
          id: this.nextId++,
          createdAt: new Date(),
          updatedAt: new Date(),
          creator: 'System',
          type: TodoType.TASK
        },
        {
          title: 'Get an internship',
          description: 'Create another things',
          status: ToDoStatus.DONE,
          id: this.nextId++,
          createdAt: new Date(),
          updatedAt: new Date(),
          creator: 'System',
          type: TodoType.TASK
        },
      ]
    }]
  }

  public addGroup(): void {
    let tempGroup: TodoGroup = {
      title: '',
      items: []
    }
    this.todoGroups.push(tempGroup)
  }

  public handleChangeTitle(value: {value: string, index: number}): void {
    this.todoGroups[value.index].title = value.value;
  }

  public handleEventGroup(value: number): void {
    this.todoGroups.splice(value, 1)
  }

  public handleNewItem(value: {item: TodoItem, index : number}){
    this.todoGroups[value.index].items?.push(value.item);
    this.showModal = true;
  }

  public handleModalSubmit(data: {creator: string, type: TodoType}): void {
    const lastItem = this.todoGroups[this.todoGroups.length - 1].items[this.todoGroups[this.todoGroups.length - 1].items.length - 1];
    if (lastItem) {
      lastItem.id = this.nextId++;
      lastItem.creator = data.creator;
      lastItem.type = data.type;
    }
    this.showModal = false;
  }

  public handleModalClose(): void {
    this.showModal = false;
    // Удаляем последний добавленный элемент, если модальное окно было закрыто
    const lastGroup = this.todoGroups[this.todoGroups.length - 1];
    if (lastGroup && lastGroup.items.length > 0) {
      lastGroup.items.pop();
    }
  }

  public handleChangeDescription(value: {description: string, indexGroup: number, indexItem: number}) {
    const item = this.todoGroups[value.indexGroup].items[value.indexItem];
    item.description = value.description;
    item.updatedAt = new Date();
  }

  public handleChangeStatus(value: {status: ToDoStatus, indexItem: number, groupIndex: number}){
    const item = this.todoGroups[value.groupIndex].items[value.indexItem];
    item.status = value.status;
    item.updatedAt = new Date();
  }

  public handleDeleteItem(value: {indexItem: number, groupIndex: number}){
    this.todoGroups[value.groupIndex].items.splice(value.indexItem,1);
  }
}
