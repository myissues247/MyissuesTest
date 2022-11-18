import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-module',
  templateUrl: './admin-module.component.html',
  styleUrls: ['./admin-module.component.css']
})
export class AdminModuleComponent implements OnInit, OnDestroy {

  constructor(private router: Router) { }

  ngOnInit(): void {
    sessionStorage.removeItem('stats');
    if(!sessionStorage.getItem('admin'))
      this.router.navigate(['/admin-module/signin'])
  }


  ngOnDestroy() : void {
    sessionStorage.removeItem('admin');
  }

}
