import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;

    username!: string
    password!: string

    urlParms: any = {}
   

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: "",
      password: ""
    })

    this.urlParms.username = this.route.snapshot.queryParamMap.get('username')
    this.urlParms.password = this.route.snapshot.queryParamMap.get('password')
    this.urlParms.token = this.route.snapshot.queryParamMap.get('token')
  }

// userLogin(username:string, password:string) {
//  this.auth.userLogin(username, password)
//  .subscribe( res => {
// sessionStorage.setItem('accessToken', res.access_token)
//  })
//   }

// userLogin() {
//   this.route.quparamMap.subscribe(params => {
//     const username = params.get('username')
//     const password = params.get('password')
//     this.auth.userLogin(username,password,token).subscribe(logs => this.logs = logs)

//   })
// }


  userLogin(username:string, password:string) {
    // console.log(this.urlParms) //coming back null
    const value = this.loginForm.getRawValue();
    console.log(value);
    this.auth.userLogin(value,username, password).subscribe(
      res => {
        console.log(res)
       sessionStorage.setItem("accessToken", res.body.token);
        alert("You are now logged in ")
        this.router.navigate(['navbar'])
      })
      this.loginForm.reset();
  }

}