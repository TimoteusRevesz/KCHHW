import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component'; 
import { ShoeResolver } from './services/resolver/shoe.resolver';

const routes: Routes = [ 
   
  { path: '', loadChildren: () => import('./tutorial/tutorial.module').then(m => m.TutorialModule) },
  {
    path: 'layout',
    component: LayoutComponent,
    resolve: {
      data: ShoeResolver 
    }
  },{
    path: '**',
    component: LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
