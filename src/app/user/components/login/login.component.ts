import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { from } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  invalidLogin: boolean;
  errMsg: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  OnSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      let data = this.loginForm.value;
      this.authService.login(data).subscribe(
        res => {
          if (res) {
            this.router.navigate(["/admin"]);
          }
        },
        err => {
          this.invalidLogin = true;
          this.errMsg = err.statusText;
          setTimeout(() => {
            this.invalidLogin = false;
          }, 2000);
        }
      );
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}
