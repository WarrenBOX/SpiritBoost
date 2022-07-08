import { NumberSymbol } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from './customer.service';
import {Customer} from 'f:/Java self program/SpiritBoostFrontEnd/HelloDemo/SpiritBoost/customers';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})


export class AppComponent implements OnInit{
  [x: string]: any;
  public customers!: Customer[];   //问题： 为什么要在变量名后加！https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
  public editCustomer!:Customer;
  public deleteCustomer!:Customer;
 

  constructor(private CustomerService: CustomerService) {}

  ngOnInit(): void {
      this.getCustomer();
  }

  public getCustomer():void {
    this.CustomerService.getCustomer().subscribe(
      (response:Customer[]) => {
        this.customers = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCustomer(addForm:NgForm):void {
    document.getElementById("add-customer-form")?.click();          /* 调用这个方法，关闭modal框 */
    this.CustomerService.addCustomer(addForm.value).subscribe(       /* NgForm的值组装为json对象 */
      (Response:Customer) => {                                        /* 理解response 为Customer类型 */
        console.log(Response);
        this.getCustomer();    /* reload all customers */
        addForm.reset();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );                    /* addFrom.value -> json */
  }

  public onUpdateCustomer(customer:Customer):void {
    document.getElementById("edit-customer-form")?.click();
    var ID = this.editCustomer.id;
    this.CustomerService.updateCustomer(customer,ID).subscribe(
      (response:Customer) => {
        console.log(response);
        this.getCustomer();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteCustomer(ID: number):void {
    document.getElementById("delete-form")?.click();
    this.CustomerService.deleteCustomer(ID).subscribe(
      (response:void) => {
        console.log(response);
        this.getCustomer();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      } 
    )

  }


  public searchCustomers(key:String):void {
    const results: Customer[] = [];                                      /* cosnt变量是什么 */
    for (const customer of this.customers) {
      if (customer.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || customer.password.toLowerCase().indexOf(key.toLowerCase()) !==-1
  /*     || customer.phone.toLowerCase().indexOf(key.toLowerCase()) !==-1 */
      
      ) {
        results.push(customer);
      }
    }
    this.customers = results;
    if(results.length === 0 || !key) {
      this.getCustomer();
    }
  }



  public onOpenModal(customer:Customer,mode:String):void {
    const container = document.getElementById("MainContainer");   /* error: mistakendly add"#" before the 'elementId' */
    const button = document.createElement('button');                /* 1. access to the container div */
    button.type='button';                                           /* 2. create button with specific attributes in the container : initialize button-> take in param -> set attributes */
    button.style.display='true';                                    /* 3. button.click() -> open modal(data-bs-target)：打开相应的模态框目标 */
    button.setAttribute('data-bs-toggle','modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target','#addCustomerModal');
    }
    if(mode === 'edit') {
      this.editCustomer=customer;  /* 如何绑定上的？ */
      button.setAttribute('data-bs-target','#updateCustomerModal');
    }
    if(mode === 'delete') {
      this.deleteCustomer = customer; 
      button.setAttribute('data-bs-target','#deleteCustomerModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
