import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addcart',
  templateUrl: './addcart.component.html',
  styleUrls: ['./addcart.component.css']
})
export class AddcartComponent implements OnInit {
  prodcount:number;
  msg:string;
  cart:any[];
  gtotal:number=0;
  visibility:boolean=false;
  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
    this.fetchcart();
  }
  fetchcart()
  {
    this.myhttp.get("http://localhost:3000/api/fetchcart?uname=" + sessionStorage.getItem("uname"),{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.cart=response;
          this.prodcount=this.cart.length;
          this.fetchtotal();
        }
        else
        {
          this.msg="No details found";
          this.visibility=true;
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
    this.myhttp.delete("http://localhost:3000/api/delcart?id=" +id ,{responseType:"text"}).subscribe(
      (response)=>
      {
          alert(response);
          this.gtotal=0;
          this.fetchcart();
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
  fetchtotal()
  {
    for(let x=0;x<this.cart.length;x++)
    {
      this.gtotal+=this.cart[x]["charges"];
    }
    sessionStorage.setItem("billtotal",this.gtotal.toString());
  }
}
