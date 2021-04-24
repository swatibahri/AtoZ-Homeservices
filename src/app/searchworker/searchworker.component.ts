import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchworker',
  templateUrl: './searchworker.component.html',
  styleUrls: ['./searchworker.component.css']
})
export class SearchworkerComponent implements OnInit {

  un:string;
  msg:string;
  name:string;
  phone:string;
  gender:string;
  userinfo:any[];
  exp:string;
  scname:string;
  cname:string;
  address:string;
  charges:number;
  cityname:string;
  ppic:string;
  visibility:boolean=false;
  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
  }

  onsearch()
  {
    var params={uname:this.un};
    this.myhttp.get("http://localhost:3000/api/srchworker?un=" + this.un,{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.visibility=true;
          this.userinfo=response;
          this.msg="";
          this.name=this.userinfo[0]["name"];
          this.phone=this.userinfo[0]["phone"];
          this.address=this.userinfo[0]["address"];
          this.gender=this.userinfo[0]["gender"];
          this.un=this.userinfo[0]["username"];
          this.cityname=this.userinfo[0]["cityname"];
          this.cname=this.userinfo[0]["cname"];
          this.scname=this.userinfo[0]["scname"];
          this.exp=this.userinfo[0]["exp"];
          this.charges=this.userinfo[0]["charges"];
          this.ppic=this.userinfo[0]["ppic"];
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
  
}
