import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoType } from '../../interfaces/todo-group-interface';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.scss'
})
export class TodoModalComponent {
  @Output() submitEvent = new EventEmitter<{creator: string, type: TodoType}>();
  @Output() closeEvent = new EventEmitter<void>();

  creator: string = '';
  type: TodoType = TodoType.TASK;
  TodoType = TodoType;

  submit() {
    if (this.creator.trim()) {
      this.submitEvent.emit({
        creator: this.creator,
        type: this.type
      });
    }
  }

  closeModal() {
    this.closeEvent.emit();
  }
}
