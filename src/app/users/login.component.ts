import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../core/data.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',

})

export class LoginComponent implements OnInit{

    user: any


    constructor(private dataService: DataService, private router: Router) {
        this.user = { username: '', password: ''}
     }

     login_user = () => {
        this.dataService.login_user(this.user)
        .subscribe((data) => {
            this.user = data
            if (data.code == 200) {
                this.router.navigate(['/qtn'])
            }
        })
        localStorage.setItem("person", JSON.stringify(this.user))
        console.log("tryyyyyyy: ",localStorage.getItem("person"))
      }



    ngOnInit() {}

}