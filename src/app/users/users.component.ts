import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user:any
  username:string = ''
  password: string = ''
  confirm_password = ''

  constructor(private dataService: DataService) {
    this.user = {id: -1, username:'', password:'', confirm_password:''}
   }

  ngOnInit(): void {
  }

  register_user = () => {
    this.dataService.register_user(this.user)
    .subscribe((data) => {
      console.log(data)
    })
  }

  login_user = () => {
    this.dataService.login_user(this.user)
    .subscribe((data) => {
      console.log(data)
    })
  }

}
