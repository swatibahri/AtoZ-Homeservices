import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css']
})
export class OrdersummaryComponent implements OnInit {

  orderdet:any[];
  msg:string;
  orderno:string;
  cart:any[]=[];
  orditems:any[]=[];
  updatestock:any[]=[];
  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
    this.fetchorderdetails();
  }
  fetchorderdetails()
  {
    this.myhttp.get("http://localhost:3000/api/getordernum?un=" + sessionStorage.getItem("uname"),{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.orderno=response[0]["_id"];
          this.fetchcart();
          
        } 
        else
        {
          this.msg="No records found";
        }
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
  fetchcart()
  {
    this.myhttp.get("http://localhost:3000/api/getcart?un=" + sessionStorage.getItem("uname"),{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.cart=response;
          this.orderitems();
        } 
        else
        {
          this.msg="No records found";
        }
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }


  orderitems()
  {
    for(let x=0;x<this.cart.length;x++)
    {
      let vals={orderid:this.orderno,pid:this.cart[x]["prodid"],name:this.cart[x]["name"],charges:this.cart[x]["charges"],ppic:this.cart[x]["ppic"], username:sessionStorage.getItem("uname")}
      this.orditems.push(vals);
      
    }
    this.myhttp.post("http://localhost:3000/api/orderitems",this.orditems,{responseType:"text"}).subscribe(
        (response)=>
        {
          
         this.updatestockdb();
        },

        (error)=>
        {
          this.msg=error;
        }
      )
  }

  updatestockdb()
  {
    for(let x=0;x<this.cart.length;x++)
    {
      let vals2={pid:this.cart[x]["prodid"],qty:this.cart[x]["qt"]}
      this.updatestock.push(vals2);
    }
    this.myhttp.put("http://localhost:3000/api/updatestock",this.updatestock,{responseType:"text"}).subscribe(
        (response)=>
        {
          this.ondel();
        },
        (error)=>
        {
          this.msg=error;
        }
      )
  }

  ondel()
  {
    //alert(id);
    this.myhttp.delete("http://localhost:3000/api/emptycart?un=" + sessionStorage.getItem("uname") ,{responseType:"text"}).subscribe(
      (response)=>
      {
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }


}



