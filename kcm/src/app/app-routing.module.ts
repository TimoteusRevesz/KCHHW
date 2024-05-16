import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './gamer/layout/layout.component'; 
import { ShoeResolver } from './services/resolver/shoe.resolver';

const routes: Routes = [ 
   
  { path: '', loadChildren: () => import('./tutorial/tutorial.module').then(m => m.TutorialModule) },
  { path: 'game', loadChildren: () => import('./gamer/gamer.module').then(m => m.GamerModule) },
  { path: '**', loadChildren: () => import('./tutorial/tutorial.module').then(m => m.TutorialModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
