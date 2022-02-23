import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

  loginForm!: FormGroup;

    username!: string
    password!: string
 

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: "",
      password: ""
    })
  }


  userLogin(username:string, password:string) {
    const value = this.loginForm.getRawValue();
    console.log(value);
    this.auth.userLogin(value, username, password).subscribe(
      res => {
      console.log(res)
     localStorage.setItem("name", value.username)
     localStorage.setItem("Bearer", <string>res.body?.jwtToken)
      })
        alert(`You are now logged in ${value.username}`)
        this.router.navigate(['navbar'])
        .catch(error => {
          console.log(error)
        })
      
      this.loginForm.reset();
  }

}