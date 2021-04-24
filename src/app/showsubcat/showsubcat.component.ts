import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showsubcat',
  templateUrl: './showsubcat.component.html',
  styleUrls: ['./showsubcat.component.css']
})
export class ShowsubcatComponent implements OnInit {
  id:string;
  pname:string;
  rate:string;
  pic:string;
  scatpic:string;
  scname:string;
  camera:string;
  allsubcat: any;
  msg: any;
  cat: string="";
  catid: any;
  constructor(private route:ActivatedRoute,private myhttp:HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>
      {
        this.cat=params["catid"];
      })
      
      this.fetchSubCategories();
    }
    fetchSubCategories() {
      this.myhttp.get("http://localhost:3000/api/fetchsubcategories?cat=" + this.cat,{responseType:"json"}).subscribe(
        (response:[])=>
        {
          if(response.length>0)
          {
            this.allsubcat=response;
          }
  
        },
        (error)=>
        {
          this.msg=error;
        }
      )
    }
}
