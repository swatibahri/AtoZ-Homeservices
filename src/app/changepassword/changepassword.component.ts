import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  currp:string;
  newp:string;
  cnewp:string;
  msg:string;
    constructor(private myhttp:HttpClient) { }
  
    ngOnInit() {
    }
  onchangepass()
  {
    if(this.newp=this.cnewp)
    {
      var params ={un:sessionStorage.getItem("uname"),cpass:this.currp,newp:this.newp};
      this.myhttp.put("http://localhost:3000/api/changepassword",params,{responseType:"text"}).subscribe(
        (response)=>
        {
          if(response["nModified"]==0)
          {
          this.msg="Current Password Incorrect";
          }
          else if(response["nModified"]==1)
          {
          this.msg="Password changed successfully";
          }
        },
        (error)=>
        {
          this.msg=error;
        }
      )
    }
    else
    {
      this.msg ="New Passwords doesnt match";
    }
    }
  }
  