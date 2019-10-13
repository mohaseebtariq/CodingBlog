import { AuthService } from '../../shared/services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MustMatch } from './password.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  invalidLogin: boolean;
  errMsg: string;
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPass')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      let data = {};
      let form = this.registerForm.getRawValue();
      data['username'] = form.username;
      data['password'] = form.password;
      data['email'] = form.email;
      this.authService.register(data)
        .subscribe(
          res => {
            if (res) {
              this.router.navigate(['/login']);
            }
          },
          err => {
            if(err.error.error) {
              this.invalidLogin = true;
              this.errMsg = err.error.error;
              setTimeout(() => {
                this.invalidLogin = false;
              }, 3000);
            }
            else if (err.error.Message) {
              this.invalidLogin = true;
              this.errMsg = err.error.Message;
              setTimeout(() => {
                this.invalidLogin = false;
              }, 3000);
            }
          }
        );

    }
  }

}
