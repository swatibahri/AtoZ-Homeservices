import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginworker',
  templateUrl: './loginworker.component.html',
  styleUrls: ['./loginworker.component.css']
})
export class LoginworkerComponent implements OnInit {

  un:string;
pass:string;
msg:string;
userinfo:any[];
  constructor(private myhttp: HttpClient,private myrouter:Router) { }

  ngOnInit() {
  }
onlogin()
{
  var params = {un:this.un,pass:this.pass};
  // this.myhttp.post("http://localhost:3000/api/login" ,params,{responseType:"json"}).subscribe(
  //   (response:any[])=>
  //   {
  //     if (response.length>0)
  //     {
  //       this.userinfo=response;
  //       sessionStorage.setItem("nm",this.userinfo[0]["name"])
  //       sessionStorage.setItem("uname",this.userinfo[0]["username"])

  //       if(this.userinfo[0]["usertype"]=="admin")
  //       {
  //         sessionStorage.setItem("utype","admin");
  //         this.myrouter.navigateByUrl('adminhome'); 
  //       }
  //       else if(this.userinfo[0]["usertype"]=="normal")
  //       {
  //         sessionStorage.setItem("utype","normal");
  //         this.myrouter.navigateByUrl('sitehome');
  //       }
  //       else

  //         this.msg= "incorrect username/password";
  //       }
  //     },
  //     (error)=>
  //     {
  //       this.msg =error;
  //     }
  // )
    
  //   }
  this.myhttp.post("http://localhost:3000/api/loginworker" ,params,{responseType:"json"}).subscribe(
    (response:any[])=>
    {
      if (response.length>0)
       
        {
          this.userinfo=response;
          sessionStorage.setItem("nm",this.userinfo[0]["name"])
          sessionStorage.setItem("uname",this.userinfo[0]["username"])
  
          if(this.userinfo[0]["usertype"]=="worker")
          {
          sessionStorage.setItem("utype","worker");
          this.myrouter.navigateByUrl('worker');
        } 
      }

      else
      {
        this.msg= "incorrect username/password";
      }
    },
    (error)=>
    {
      this.msg =error;
    }
  )
  }
}
  
