import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"

import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";


@Injectable()
export class DataService{
  baseUrl = ' http://127.0.0.1:5000/'
  user_string: any = localStorage.getItem("person")
  user: any = JSON.parse(this.user_string)


  constructor(private http: HttpClient) { }

  get_all_questions() : Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'qtn')
    .pipe(
      catchError(this.handleError)
    )

  }

  get_question(question:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'qtn/' + question.id)
    .pipe(
      catchError(this.handleError)
    )
  }

  updateQuestion(question:any): Observable<any> {
    const body = {qtn: question.qtn, subject_id: question.subject_id}
    return this.http.put<any>(this.baseUrl + 'qtn/' + question.id +'/' + 'update', body,{
      headers: {"username": this.user.username, "password": this.user.password}
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  postQuestion(question:any): Observable<any>{
    console.log("data is",this.user)
    const body = {qtn: question.qtn, subject_id: question.subject_id}
    console.log("this is the body: ",body)
    console.log(" this is the user: ",this.user)
    console.log("type: ", typeof this.user)
    console.log("this is the password: ", this.user.password)
    return this.http.post<any>(this.baseUrl + 'add', body, {
      headers: {"username": this.user.username, "password": this.user.password}
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  deleteQuestion(question:any): Observable<any>{
    return this.http.delete<any>(this.baseUrl + 'qtn/' + question.id + '/' + 'delete')
    .pipe(
      catchError(this.handleError)
    )
  }

  get_all_subjects(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl + 'subjects')
    .pipe(
      catchError(this.handleError)
    )

  }

  register_user(user:any): Observable<any>{
    const body = {username: user.username, password:user.password, confirm_password: user.confirm_password}
    return this.http.post<any>(this.baseUrl + 'register', body, {
      headers: {'username': user.username, 'password': user.password, 'confirm_password': user.confirm_password}
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  login_user(user:any): Observable<any>{
    const body = {username: user.username, password: user.password}
    return this.http.post<any>(this.baseUrl + 'login', body, {headers: {"username": user.username, "password": user.password}})
    .pipe(
      catchError(this.handleError)
    )
  }

  get_user_or_none(user:any): Observable<any>{
    const body = {username: user.username, password: user.password}
    return this.http.post<any>(this.baseUrl + 'login', body)
    .pipe(
      catchError(this.handleError)
    )
    // .subscribe((data: any) => {
    //   console.log(data)
    // })
  }

  // logout():Observable<any>{
  //   return this.http.
  // }
  post_ans(ans:any): Observable<any>{
    const body = {ans: ans.ans, question_id:ans.question_id}
    return this.http.post<any>(this.baseUrl + "answer", body, {
      headers: {"username": this.user.username, "password": this.user.password}
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return  Observable.throw(errMessage);
        // Use the following instead if using lite-server
        // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Node.js server error');
  }

}
