import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css']
})
export class SearchuserComponent implements OnInit {

  un:string;
  msg:string;
  name:string;
  phone:string;
  gender:string;
  userinfo:any[];
  allcity:[];
  cityname:string;
  visibility:boolean=false;
  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
  }

  onsearch()
  {
    var params={uname:this.un};
    this.myhttp.get("http://localhost:3000/api/srchuser?un=" + this.un,{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.visibility=true;
          this.userinfo=response;
          this.msg="";
          this.name=this.userinfo[0]["name"];
          this.phone=this.userinfo[0]["phone"];
          this.gender=this.userinfo[0]["gender"];
          this.un=this.userinfo[0]["username"];
          this.cityname=this.userinfo[0]["cityname"];
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
