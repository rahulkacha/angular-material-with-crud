import { TaskService } from './services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todolist-with-crud';

  constructor(private _dialog: MatDialog, private _tasksService: TaskService) {}

  openAddForm() {
    this._dialog.open(TaskAddEditComponent);
  }
}
