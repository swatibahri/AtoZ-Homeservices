import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empdetails',
  templateUrl: './empdetails.component.html',
  styleUrls: ['./empdetails.component.css']
})
export class EmpdetailsComponent implements OnInit {

  pid:string;
  details:any[];
  msg:string;
  prodid:string;
  name:string;
  phone:string;
  address:string;
  exp:string;
  ppic:string;
  uname: any;
  charges:number;
  cat:string;
  cityname:string;
 
  subcat:string;
  constructor(private route:ActivatedRoute,private myhttp:HttpClient, private myrouter:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>
      {
        this.prodid=params["pid"];
        this.fetchempdetails();
      })
      
  }

  fetchempdetails() {
    this.myhttp.get("http://localhost:3000/api/fetchempdetails?pid=" + this.prodid,{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.name=response[0]["name"];
          this.phone=response[0]["phone"];
          this.address=response[0]["address"];
          this.cityname=response[0]["cityid"];
          this.cat=response[0]["catid"];
          this.subcat=response[0]["subcatid"];
          this.exp=response[0]["exp"];
          this.charges=response[0]["charges"];
          this.ppic=response[0]["ppic"];
         

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

  onempclick(){
    this.uname=sessionStorage.getItem("uname");
    if(this.uname==null)
    {
      this.msg="Please login to book the employee";
      return;
    }
    else
    {
      var vals={prodid:this.prodid,name:this.name,phone:this.phone,
      address:this.address,cityid:this.cityname,catid:this.cat,subcatid:this.subcat,exp:this.exp,charges:this.charges,ppic:this.ppic,username:this.uname};
      this.myhttp.post("http://localhost:3000/api/addcart",vals,
      {responseType:"text"}).subscribe(
        (response)=>
        {
        this.msg=response;
        this.myrouter.navigateByUrl("showcart");
        },
        (error)=>
        {
          this.msg=error;
        }
      )
    }
  }
  }



