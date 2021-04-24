import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  visibility:boolean=false;
  address=" ";
  mode;cnum;cname;hname;date;cvvno;msg; 
  constructor(private myhttp:HttpClient, private myrouter:Router) { }

  ngOnInit() {
  }
  onrclick()
  {
    this.visibility=true;
  }
  onr1click()
  {
    this.visibility=false;
  }
  onpayment()
  {
    let params = {billtot:sessionStorage.getItem("billtotal"),add:this.address
    ,un:sessionStorage.getItem("uname"),
    pmode:this.mode,cardno:this.cnum,coname:this.cname,hname:this.hname,expdt:this.date,cvv:this.cvvno}
    this.myhttp.post("http://localhost:3000/api/checkout",params,{responseType:"text"}).subscribe(
      (response)=>
      {
        this.myrouter.navigateByUrl("/ordersummary");
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }

}

