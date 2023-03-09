import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../services/task.service';

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
    private _dialogRef: DialogRef<TaskAddEditComponent>
  ) {
    this.taskForm = this._fb.group({
      desc: '',
      date: '',
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log(this.taskForm);
      this._taskService.addTask(this.taskForm.value).subscribe({
        next: (val: any) => {
          alert('successful');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
