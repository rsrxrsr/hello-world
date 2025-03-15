
import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component ';
import { TestComponent } from './test/test.component';


    export const routes: Routes = [
      { path: '/angular/entity/list', component: ListComponent },    
      { path: '/angular/entity/test', component: TestComponent},
      { path: '', redirectTo:  '/angular/entity/test', pathMatch: 'full'},
      { path: '**', redirectTo: '' }
    ];
