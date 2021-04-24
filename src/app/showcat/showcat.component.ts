import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showcat',
  templateUrl: './showcat.component.html',
  styleUrls: ['./showcat.component.css']
})
export class ShowcatComponent implements OnInit {

  allcategory:[];
  msg:string;
  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
    this.fetchallcategory();
  }
  
  fetchallcategory()
  {
    this.myhttp.get("http://localhost:3000/api/fetchallcategories",{responseType:"json"}).subscribe(
      (response:[])=>
      {
        if(response.length>0)
        {
          this.allcategory=response;
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


}



