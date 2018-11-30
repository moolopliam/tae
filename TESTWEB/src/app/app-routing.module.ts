import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes} from '@angular/router';

import{HomeComponent} from './home/home.component';

import { CraeteComponent } from './home/craete/craete.component';
import { BMIComponent } from './bmi/bmi.component';

const routes: Routes =[
  { path:'',redirectTo:'/home',pathMatch:'full'},
  { path:'home',component:HomeComponent},
  {path:'create',component:CraeteComponent},
  {path:'bmi/:id',component:BMIComponent}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
