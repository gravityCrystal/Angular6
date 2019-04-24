import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { CreateEmployeeComponent } from "./employee/create-employee/create-employee.component";
import { RoutingRoutingModule } from "./routing-routing.module";
import { DisplayEmployeeComponent } from "./employee/display-employee/display-employee.component";

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    DisplayEmployeeComponent
  ],
  imports: [
    BrowserModule,
    RoutingRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
