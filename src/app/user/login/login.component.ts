import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreService } from 'src/app/services/core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private coreService: CoreService
  ) {
    this.loginForm = this._fb.group({
      username: '',
      password: '',
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.getJwt(this.loginForm.value).subscribe({
        next: (val: any) => {
          if (val.error) {
            // wrong password but the user exists
            this.coreService.openSnackBar(val.error, 'ok', 1500);
          } else {
            //JWT is generated successfully, store the JWT into the localStorage
            // redirect to the home page
            this.authService.logIn(val);
          }
        },
        error: (err: any) => {
          this.coreService.openSnackBar(err.error.error, 'ok', 1500);
        },
      });
      this.loginForm.reset();
      this.loginForm.markAllAsTouched();
    }
  }
}
