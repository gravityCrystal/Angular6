import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateEmployeeComponent } from "./employee/create-employee/create-employee.component";
import { DisplayEmployeeComponent } from './employee/display-employee/display-employee.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'display',
    component: DisplayEmployeeComponent
  },
  { path: 'create', 
    component: CreateEmployeeComponent 
  },
  { 
    path: '', 
    redirectTo: '/create',
    pathMatch : 'full' 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule {}
