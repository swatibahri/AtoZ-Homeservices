import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  msg:string;
  userlist:any[];
    constructor(private myhttp:HttpClient) { }
  
    ngOnInit() {
      this.fetch_members();
    }
  fetch_members()
  {
    this.myhttp.get("http://localhost:3000/api/memlist" ,{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if (response.length>0)
        {
          this.userlist = response;
        }
        else{
          this.msg= "no records found";
        }
      },
      (error)=>
      {
        this.msg =error;
      }
    )
    }
    onuserdelete(id)
      {
        if(confirm("do u want to delete"))
        {
        this.myhttp.delete("http://localhost:3000/api/delmemb?id=" +id ,{responseType:"text"}).subscribe(
          (response)=>
          {
            alert(response);
            this.fetch_members();
          },
          (error)=>
          {
            this.msg =error;
          }
            
  
       
        )
        }
       
    }
  
  }
  