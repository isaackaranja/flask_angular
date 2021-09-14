import { HttpClient, HttpClientModule, HttpHandler } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataService } from "../core/data.service";
import { RadminComponent } from "./radmin.component";
import { CommonModule } from "@angular/common";
import { RadminRoutingModule } from "./radmin-routing.module";
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    RadminComponent,

  ],
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    RadminRoutingModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  exports: [
    RadminComponent,
  ],
  providers: [DataService, HttpClient]
})

export class RadminModule{}
