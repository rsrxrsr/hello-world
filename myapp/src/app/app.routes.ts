
import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component ';


    export const routes: Routes = [
      { path: '/angular/entity/:update', component: ListComponent },
      { path: 'ListComponent', component: ListComponent },
    ];
