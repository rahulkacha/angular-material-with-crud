import { TaskService } from './../services/task/task.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskService.testUserOnlyRoute().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err), 
    });
  }

  onLogOut() {
    this.authService.logOut();
  }
}
