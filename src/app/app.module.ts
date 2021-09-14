import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RadminModule } from './radmin/radmin.module';
import { QuestionsComponent } from './questions/questions.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login.component';
import { DataService } from './core/data.service';
// import { RadminComponent } from './radmin/radmin.component';
@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    UsersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RadminModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
