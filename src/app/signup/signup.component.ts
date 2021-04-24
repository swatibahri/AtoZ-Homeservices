import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name:string;
  phone:string;
  gender:string;
  un:string;
  pass:string;
  cpass:string;
  msg:string;
  cityname:string;
  allcity:[];
  constructor(private myhttp:HttpClient) { };
  
  ngOnInit() {
    this.fetchallcat()
    }
  onsclick()
  {
  var vals = {nm:this.name,ph:this.phone,gen:this.gender,uname:this.un,pass:this.pass,cityname:this.cityname,utype:'normal'};
  this.myhttp.post("http://localhost:3000/api/signup",vals,{responseType:"text"}).subscribe(
    (response)=>
    {
      this.msg=response;
    },
    (error)=>
    {
      this.msg =error;
    }
  )
  }
  fetchallcat()
  {
    this.myhttp.get("http://localhost:3000/api/fetchallcities" ,{responseType:"json"}).subscribe(
      (response:[])=>
      {
        if(response.length>0)
        {
          this.allcity=response;
        }

      },
      (error)=>
      {
        this.msg =error;
      }
    )
}

}