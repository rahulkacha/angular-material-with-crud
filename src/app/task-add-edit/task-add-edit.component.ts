import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../services/core/core.service';
import { TaskService } from '../services/task/task.service';
import { ViewTasksComponent } from './../view-tasks/view-tasks.component';
@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.css'],
})
export class TaskAddEditComponent {
  taskForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _taskService: TaskService,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<TaskAddEditComponent>,
    private _viewTasksComponent: ViewTasksComponent
  ) {
    this.taskForm = this._fb.group({
      desc: '',
      date: '',
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this._taskService.addTask(this.taskForm.value).subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
          this._coreService.openSnackBar('task added!', 'done');
          this._viewTasksComponent.getAllTasks();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
