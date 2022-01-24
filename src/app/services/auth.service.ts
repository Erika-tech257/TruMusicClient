import { Injectable } from "@angular/core";
import { registerUser,loginUser } from "src/app/interfaces/user";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, map, Observable, pipe, retry, throwError } from "rxjs";



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

userLogin(loginUser: loginUser, username:string, password:string): Observable<HttpResponse<any>>{
  username = username;
  password = password;
 const grant_type = password;

  // const paramOptions = username ?  password ?

const user = loginUser
console.log(user)
  let params = new HttpParams()
    .set('username', user.username)
    .set('password', user.password)
    .set('grant_type', user.password)
    console.log(params)
    return this.http.post<any>(`http://localhost:8080/TruMusic/login + ?username=${user.username}&password=${user.password}&grant_type=${user.password}`, params, {observe: 'response'})
    .pipe(retry(1), catchError(this.handleError) ,map(response => response.body.value))
}


  // userLogin(loginUser: loginUser, username:string, password:string): 
  
  // Observable<HttpResponse<loginUser>> {
  //   const user = loginUser
  //   console.log(user)
  //   return this.http.post<loginUser>(
  //     `http://localhost:8080/TruMusic/login + ?username=${username}&password=${password}`,
  //     JSON.stringify(loginUser), {observe: 'response'}
  //   )
  //   .pipe(retry(1), catchError(this.handleError));
  // }

  // userLogin(username:string, password:string):Observable<any> {
  //   let data = "username="+username+"password="+password+"grant_type=password";
  //   // let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
  //   return this.http.post<any>(this.apiUrl + 'login', data, {observe: 'response'})
  //   .pipe(retry(1), catchError(this.handleError));
  // }


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
