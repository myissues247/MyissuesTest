import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

    products;
    items = [];
    productDialog: boolean;
    selectedProducts;
    product = [];
    submitted;
    newProduct;
    newfirstname;
    newlastname;
    newemail;
    constructor(private ds: AdminDataService) {

        this.items = [
            { icon: 'pi pi-pw pi-home', label: '    Dashboard', routerLink: '/admin-module' }
        ];


    }

    ngOnInit(): void {
        this.ds.getprofile({}).subscribe((response) => {
            if (response.status == true) {
                this.product = [response.data];
                console.log(response.data);
            } else {

            }
        })
    }



    editProduct(product) {
        this.products = { ...product };

        this.newfirstname = this.products[0].firstname;
        this.newlastname = this.products[0].lastname;
        this.newemail = this.products[0].email;
        this.productDialog = true;
    }


    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        
        if (Boolean(this.newfirstname) == false)
            return true;

        if (Boolean(this.newlastname) == false)
            return true;
        if (Boolean(this.newemail) == false)
            return true;

        this.ds.updateprofile({ newFirstname: this.newfirstname, newLastname: this.newlastname, newEmail: this.newemail }).subscribe((response) => {

            if (response.status == true) {
                alert(response.message)
                this.ds.getprofile({}).subscribe(async (response) => {
                    if (response.status == true) {
                        this.product = await [response.data];
                        this.productDialog = false;
                    } else {

                    }
                })

            }
            else
                alert(response.message)
        })

    }



}
