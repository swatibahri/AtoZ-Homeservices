import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedlist:[];
  msg:string;
  constructor(private myhttp:HttpClient) { }


  ngOnInit() {
    this.fetchcontactus();
  }
  
  fetchcontactus()
  {
    this.myhttp.get("http://localhost:3000/api/fetchcontactus",{responseType:"json"}).subscribe(
      (response:[])=>
      {
        if(response.length>0)
        {
          this.feedlist=response;
        }
        else
        {
          this.msg="No Categories";
        }

      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }

  onuserdelete(id)
      {
        if(confirm("do u want to delete"))
        {
        this.myhttp.delete("http://localhost:3000/api/delfeedback?id=" +id ,{responseType:"text"}).subscribe(
          (response)=>
          {
            alert(response);
            this.fetchcontactus();
          },
          (error)=>
          {
            this.msg =error;
          }
            
  
       
        )
        }
       
    }
  

}



