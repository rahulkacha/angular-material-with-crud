import { TaskService } from './services/task/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todolist-with-crud';

  constructor(private _dialog: MatDialog, private _tasksService: TaskService) {}

  openAddForm() {
    const dialogRef = this._dialog.open(TaskAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        }
      },
    });
  }
}
