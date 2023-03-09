import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css'],
})
export class ViewTasksComponent implements OnInit {
  ngOnInit(): void {
    this.getAllTasks();
  }

  constructor(private _dialog: MatDialog, private _tasksService: TaskService) {}

  getAllTasks() {
    this._tasksService.getTasks().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.log(err),
    });
  }

  deleteTask(deleteId: number) {
    this._tasksService.deleteTask(deleteId).subscribe({
      next: (res) => {
        console.log('successful');
      },
      error: (err) => console.log(err),
    });
  }

  updateTask(updateId: number) {
    this._tasksService.updateTask(updateId).subscribe({
      next: (res) => {
        console.log('successful');
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
    'id',
    'description',
    'date',
    'action',
    'delete',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
}
