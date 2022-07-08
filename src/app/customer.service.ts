import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'
import {Customer} from 'f:/Java self program/SpiritBoostFrontEnd/HelloDemo/SpiritBoost/customers'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'                               /*理解injectable */
})
export class CustomerService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { 

    }


    public getCustomer(): Observable<Customer[]> {
        console.log('${this.apiserverUrl}/all');
        return this.http.get<Customer[]>('http://localhost:8080/SpiritBoost/api/v1/customer/all');
    }

    public addCustomer(Customer:Customer): Observable<Customer> {
        return this.http.post<Customer>('http://localhost:8080/SpiritBoost/api/v1/customer/add',Customer)
    }

    // 格式: 方法内（前为参数名：后为类型）
    //put<返回值>, 与Observable<>内值一样. （'${传入的参数}'， 传入的请求体）
    public updateCustomer(Customer:Customer, id: number): Observable<Customer> {
        return this.http.put<Customer>('http://localhost:8080/SpiritBoost/api/v1/customer/update/'+id,Customer)
    }
    
    public deleteCustomer(id:number):Observable<void> {
        return this.http.delete<void>('http://localhost:8080/SpiritBoost/api/v1/customer/delete/'+id)
    }
}

//problem汇总： 1. 把UI界面的结果从[object Object] 转换为json -》 app.component..html里 :{{ customer | json }}
//              2. baseurl失效，访问还是localhost:4200
//              3. html 里navbar 的collapse 和 dropdown失效: 在angular里面使用bootstrap，需要在angular.json里面的style和script添加包"./node_modules/bootstrap/scss/bootstrap.scss"
//              4. form inline not working -> 
//              5. html: modal的popup button失效： component里的container获取失效：-> getelementbyID 多输入了一个#
//              6. html: form 里的[disabled失效]: form里的<div 需要required>

//              7. 前后端交互，传的数据为null -> modal:input 里的name与接口类的属性名不匹配->大小写
//              8. url 传参数失效