import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { LoginComponent } from './users/login.component';
import { LogoutComponent } from './users/logout.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/admin'},
  {path: 'questions', component: QuestionsComponent},
  {path: 'reg', component: UsersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '**', pathMatch: 'full', redirectTo: '/admin'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
