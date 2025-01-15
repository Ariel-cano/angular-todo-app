import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoGroup, TodoItem, ToDoStatus} from '../../../interfaces/todo-group-interface';
import {ItemDoneComponent} from '../todo-item/item-done/item-done.component';
import {ItemNotStartedComponent} from '../todo-item/item-not-started/item-not-started.component';
import {ItemInProgressComponent} from '../todo-item/item-in-progress/item-in-progress.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-todo-group',
  standalone: true,
  imports: [CommonModule, ItemDoneComponent, ItemNotStartedComponent, ItemInProgressComponent, FormsModule],
  templateUrl: './todo-group.component.html',
  styleUrl: './todo-group.component.scss'
})
export class TodoGroupComponent implements OnInit{
  @Input() todoGroup!: TodoGroup;
  @Input() index!: number;
  @Output() changeTitleEvent: EventEmitter<{value: string, index: number}> = new EventEmitter<{value: string, index: number}>();
  @Output() deleteGroup = new EventEmitter<number>();
  @Output() addNewItem = new EventEmitter<{item: TodoItem, index: number}>();
  @Output() changeDescription = new EventEmitter<{description: string, indexGroup: number, indexItem: number}>();
  @Output() changeItemStatus = new EventEmitter<{status: ToDoStatus, indexItem: number, groupIndex: number}>();
  @Output() deleteItem = new EventEmitter<{indexItem: number, groupIndex: number}>();



  public groupTitle?: string;


  public isShowTitle: boolean = true;
  ngOnInit() {
    this.groupTitle = this.todoGroup.title;
    if (this.todoGroup.title == ''){
      this.isShowTitle = false;
    }
  }

  public onEnter() {
    this.isShowTitle = true;
    this.changeTitleEvent.emit({
      value: this.groupTitle!,
      index: this.index
    });
  }

  public deleteGroupEvent(): void {
    this.deleteGroup.emit(this.index);
  }

  public addNewTodo(value: string){
    this.addNewItem.emit({item: {
      status: ToDoStatus.NOT_STARTED,
      title: value,
      description: '',
    },
  index: this.index})
  }

  public handleChangeItemDescription(value :{description: string, index : number}) {
    this.changeDescription.emit({description: value.description, indexGroup: this.index, indexItem: value.index});
  }

  public handleChangeStatus(value: {status: ToDoStatus, index: number}) :void{
     this.changeItemStatus.emit({status: value.status, indexItem: value.index, groupIndex: this.index})
  }
  public handleDeleteItem(value : number) :void{
    this.deleteItem.emit({indexItem: value, groupIndex: this.index})
  }

}
