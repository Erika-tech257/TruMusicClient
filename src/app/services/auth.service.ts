import { Injectable } from "@angular/core";
import { loginUser, registerUser } from "src/app/interfaces/user";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, pipe, retry, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:8080/TruMusic/";

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  //Pass in http interceptor for login pass in token

  userLogin(loginUser: loginUser): 
  Observable<loginUser> {
    const user = loginUser.username
    return this.http.post<loginUser>(
      this.apiUrl + "login",
      JSON.stringify(loginUser),
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.handleError));
  }


  userRegister(registerUser: registerUser):
    Observable<registerUser> {
      return this.http.post<registerUser>(
        this.apiUrl + "user/register",
        JSON.stringify(registerUser),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
    }
  
  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error);
  }

  loggedOut() {
    sessionStorage.clear()
    alert("You are logging out")
    this.router.navigate(['/'])
  }

}
