import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdsComponent } from './ads.component';
import { View2Component } from './view2/view2.component';

const routes: Routes = [{ path: '', component: AdsComponent, children:[
{ path: 'full', loadChildren: () => import('./full/full.module').then(m => m.FullModule) },
{path: 'view', component: View2Component},
{path: "view/:category", component:  View2Component},
{path: "view/:category/:region", component:  View2Component},
{path : 'favorites', loadChildren: () => import('src/app/favourites/favourites.module').then(m=>m.FavouritesModule)},
{ path: 'foodbank', loadChildren: () => import('./foodbank/foodbank.module').then(m => m.FoodbankModule) },
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
