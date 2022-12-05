import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerPipe } from './server.pipe';



@NgModule({
  declarations: [ServerPipe],
  imports: [
    CommonModule
  ],
  exports : [
   ServerPipe
  ]
})
export class PipeModuleModule { }
