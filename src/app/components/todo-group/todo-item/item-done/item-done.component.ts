import { Component } from '@angular/core';
import {TodoItemBaseComponent} from '../todo-item-base/todo-item-base.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-item-done',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item-done.component.html',
  styleUrl: './item-done.component.scss'
})
export class ItemDoneComponent extends TodoItemBaseComponent {

}
