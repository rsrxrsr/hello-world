
import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component ';
import { TestComponent } from './test/test.component';


    export const routes: Routes = [
      { path: 'list', component: ListComponent },    
      { path: 'test', component: TestComponent},
      { path: '', redirectTo:  'test', pathMatch: 'full'},
      { path: '**', redirectTo: '' }
    ];
