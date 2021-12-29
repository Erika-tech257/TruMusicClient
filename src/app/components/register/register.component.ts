import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      email: "", 
      username: "",
      password: ""
    })
  }

  userRegister() {
    const value = this.registerForm.getRawValue();
    this.auth.userRegister(value).subscribe(
      res => {
        console.log(res)
        alert("Thanks for registering " + res.username+ "you will now be directed to login")
        this.router.navigate(['/login'])
      })
      this.registerForm.reset();
  }

}
