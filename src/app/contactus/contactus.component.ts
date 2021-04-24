import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StringifyOptions } from 'querystring';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
msg:string;
name:string;
sub:string;
query:string;
un:string;
mssg:string;
feedlist:[];
  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
    this.fetchcontactus();
  }
  fetchcontactus()
  {
    this.myhttp.get("http://localhost:3000/api/fetchcontactus" ,{responseType:"json"}).subscribe(
      (response:[])=>
      {
        if(response.length>0)
        {
          this.feedlist=response;
        }

      },
      (error)=>
      {
        this.msg =error;
      }
    )
}
  contactus()
  {
    var vals = {nm:this.name,uname:this.un,sub:this.sub, query:this.query,mssg:this.mssg};
    this.myhttp.post("http://localhost:3000/api/contactus",vals,{responseType:"text"}).subscribe(
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
}