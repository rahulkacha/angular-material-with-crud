import { AuthService } from './../services/auth/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { TaskAddEditComponent } from '../task-add-edit/task-add-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();

  isLoggedIn = localStorage.getItem('isLoggedIn')
    ? localStorage.getItem('isLoggedIn')
    : false;

  constructor(
    private _dialog: MatDialog,
    private authService: AuthService,

  ) {}

  openAddForm(event: Event) {
    const dialogRef = this._dialog.open(TaskAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.emitter.emit(event);
          return;
        }
      },
    });
  }

  onLogOut() {
    this.authService.logOut();
  }
}
