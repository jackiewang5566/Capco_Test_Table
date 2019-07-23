import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomTableComponent } from './Component/custom-table/custom-table.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'table' },
  { path: 'table', component: CustomTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
