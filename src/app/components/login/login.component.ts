import { Component, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;


  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: "",
      password: ""
    })
  }

  userLogin() {

    const value = this.loginForm.getRawValue();
    this.auth.userLogin(value).subscribe(
      res => {
        console.log(res);
        alert("You are now logged in " + res.username)
        this.router.navigate(['navbar'])
      })
      this.loginForm.reset();
  }

}
