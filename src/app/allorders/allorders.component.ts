import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  orders: any[];
  msg: string;
  status='';

  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
    this.fetchcart();
  }
  fetchcart()
  {
    this.myhttp.get("http://localhost:3000/api/getAllOrders",{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.orders=response;
          // this.ondel(id);
          // for(let i =0; i != this.orders.length; i++) {
          //   this.status.push(this.orders[i].status);
          // }
        }
        else
        {
          this.msg="No details found";
        }

      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
  ondel(id)
  {
    //alert(id);
    this.myhttp.delete("http://localhost:3000/api/delorder?id=" + id,{responseType:"text"}).subscribe(
      (response)=>
      {
          alert(response);
          this.fetchcart();
      },
      (error)=>
      {
        this.msg=error;
      }
    )
 }
}