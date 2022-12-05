import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { ViewsInMonthComponent } from './views-in-month/views-in-month.component';
import { FormsModule } from '@angular/forms'
import { ViewsInLastWeekComponent } from './views-in-last-week/views-in-last-week.component';
import { ViewsInThisWeekComponent } from './views-in-this-week/views-in-this-week.component';

@NgModule({
  declarations: [StatsComponent, ViewsInMonthComponent, ViewsInThisWeekComponent, ViewsInLastWeekComponent],
  imports: [
    StatsRoutingModule,
    CommonModule,
    FormsModule,
  ]
})
export class StatsModule { }
