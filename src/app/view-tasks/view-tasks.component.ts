import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../services/task/task.service';
import { CoreService } from '../services/core/core.service';
import { TaskAddEditComponent } from '../task-add-edit/task-add-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css'],
})
export class ViewTasksComponent implements OnInit {
  ngOnInit(): void {
    this.getAllTasks();
  }

  constructor(
    private _tasksService: TaskService,
    private _coreService: CoreService,
    private _dialog: MatDialog
  ) {}

  openAddForm() {
    const dialogRef = this._dialog.open(TaskAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllTasks();
        }
      },
    });
  }

  getAllTasks() {
    this._tasksService.getTasks().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        length = this.dataSource.data.length;
      },
      error: (err) => console.log(err),
    });
  }

  deleteTask(deleteId: number) {
    this._tasksService.deleteTask(deleteId).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('task deleted!', 'done');
        this.getAllTasks();
      },
      error: (err) => console.log(err),
    });
  }

  updateTask(updateId: number) {
    this._tasksService.updateTask(updateId).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('task updated!', 'done');

        this.getAllTasks();
      },
      error: (err) => console.log(err),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  displayedColumns: string[] = [
    'taskID',
    'taskDesc',
    'date',
    'isDone',
    'delete',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
}
