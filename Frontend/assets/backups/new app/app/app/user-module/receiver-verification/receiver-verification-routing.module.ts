import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetuserComponent } from './getuser/getuser.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NeighbourinfoComponent } from './neighbourinfo/neighbourinfo.component';
import { PetinfoComponent } from './petinfo/petinfo.component';

import { ReceiverVerificationComponent } from './receiver-verification.component';

const routes: Routes = [{ path: '', component: ReceiverVerificationComponent, children: [
    {path:'',redirectTo:'userinfo',pathMatch:'full'},
    {path:'userinfo',component:GetuserComponent},
    {path:'pet',component:PetinfoComponent},
    {path:'neighbour',component:NeighbourinfoComponent},
    {path:'confirm',component:ConfirmComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiverVerificationRoutingModule { }
