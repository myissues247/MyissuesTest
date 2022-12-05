import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/services/admin-data.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent implements OnInit {
  items=[];
  id;
  siteDetail;
  selectedProducts;
  first;
  constructor(private route:ActivatedRoute,private ds:AdminDataService) { 

      this.items=[
        { icon: 'pi pi-pw pi-home', label: ' Dashboard', routerLink: '/admin-module' },
        { icon: 'pi pi-pw pi-user', label: ' User' },
        { icon: 'pi pi-pw pi-user', label: ' Receiver' }
      ]
  }

  async ngOnInit() {
    await this.route.queryParamMap.subscribe(async (d)=>{
        this.id=await d.get('id');
    })

    await this.ds.GetSpecificUser({id:this.id}).subscribe(async (response)=>{
            if(response.status==true){
              this.siteDetail=[response.data];
              console.log(response.data)
            }
    },(err)=>{
        console.log(err)
    })
  }

}
