import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsComponent } from './stats.component';
import { ViewsInLastWeekComponent } from './views-in-last-week/views-in-last-week.component';
import { ViewsInMonthComponent } from './views-in-month/views-in-month.component';
import { ViewsInThisWeekComponent } from './views-in-this-week/views-in-this-week.component';

const routes: Routes = [{ path: '', component: StatsComponent, children: [
    {path:'viewsInMonth',component:ViewsInMonthComponent},
    {path:'viewsInThisWeek',component:ViewsInThisWeekComponent},
    {path:'viewsInLastWeek',component:ViewsInLastWeekComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
