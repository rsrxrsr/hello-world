
import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component ';
import { TestComponent } from './test/test.component';


    export const routes: Routes = [
      { path: '/angular/entity/:update', component: ListComponent },
      { path: 'ListComponent', component: ListComponent },
     // { path: '/angular/entity/test', component: TestComponent}
    ];
