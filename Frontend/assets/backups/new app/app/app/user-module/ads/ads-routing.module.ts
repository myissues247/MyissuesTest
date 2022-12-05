import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdsComponent } from './ads.component';
// import { SingleComponent } from './single/single.component';
// import { ViewComponent } from './view/view.component';
import { View2Component } from './view2/view2.component';

const routes: Routes = [{ path: '', component: AdsComponent, children:[
// {path: 'view-all', component: ViewComponent},
{ path: 'full', loadChildren: () => import('./full/full.module').then(m => m.FullModule) },
{path: 'view', component: View2Component},
{path: "view/:category", component:  View2Component}
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
