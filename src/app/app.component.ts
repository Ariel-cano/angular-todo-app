import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TodoGroupComponent} from './components/todo-group/todo-group/todo-group.component';
import {TodoGroup, TodoItem, ToDoStatus} from './interfaces/todo-group-interface';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoGroupComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public todoGroups: TodoGroup[];

  constructor() {
    this.todoGroups = [{
      title: 'ToDo',
      items: [{
        title: 'Create ToDo',
        description: 'Create ToDo Angular',
        status: ToDoStatus.IN_PROGRESS
      },
        {
          title: 'Hand over the session',
          description: 'Create another things',
          status: ToDoStatus.NOT_STARTED
        },
        {
          title: 'Get an internship',
          description: 'Create another things',
          status: ToDoStatus.DONE
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
  }
  public handleChangeDescription(value: {description: string, indexGroup: number, indexItem: number}) {
    this.todoGroups[value.indexGroup].items[value.indexItem].description = value.description;
  }
  public handleChangeStatus(value: {status: ToDoStatus, indexItem: number, groupIndex: number}){
    this.todoGroups[value.groupIndex].items[value.indexItem].status = value.status;
  }
  public handleDeleteItem(value: {indexItem: number, groupIndex: number}){
    this.todoGroups[value.groupIndex].items.splice(value.indexItem,1);
  }
}
