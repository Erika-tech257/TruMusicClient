import { Injectable } from "@angular/core";
import { registerUser,loginUser } from "src/app/interfaces/user";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, retry, throwError } from "rxjs";



@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:8080/TruMusic/";

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  private options = {
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
  }
  
  constructor(private http: HttpClient, private router: Router) {}

  //Pass in http interceptor for login pass in token

userLogin(loginUser: loginUser, username:string, password:string): Observable<HttpResponse<loginUser>>{
  username = username;
  password = password;
  
const user = loginUser

console.log(user)
  // let params = new HttpParams()
  //   .set('username', user.username)
  //   .set('password', user.password)
  //   console.log(params)

    return this.http.post<loginUser>('http://localhost:8080/TruMusic/login', loginUser, {observe: 'response'})
    .pipe(retry(1), catchError(this.handleError))
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

  loggedOut(){
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
