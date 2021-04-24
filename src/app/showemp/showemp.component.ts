import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showemp',
  templateUrl: './showemp.component.html',
  styleUrls: ['./showemp.component.css']
})
export class ShowempComponent implements OnInit {

  subcat: any;
  allemp: any;
  msg: any;

  constructor(private route:ActivatedRoute,private myhttp:HttpClient) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params=>
      {
        this.subcat=params["subcatid"];
      })
      
      this.fetchemp();
    }
    fetchemp(){
      this.myhttp.get("http://localhost:3000/api/fetchemp?subcat=" + this.subcat,{responseType:"json"}).subscribe(
        (response:[])=>
        {
          if(response.length>0)
          {
            this.allemp=response;
          }
  
        },
        (error)=>
        {
          this.msg=error;
        }
      )
    }
}

