import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  visibility:boolean;
  name:string;
  msg:string;
  allcategory:[];
  allsubcat:[];
  cat:string;
  constructor(private myrouter:Router, private myhttp:HttpClient) { 

    myrouter.events.subscribe(event => 
      {
        if (event instanceof NavigationEnd) 
        {
            this.ngOnInit();
        }
      }) 


  }

  ngOnInit() {
  console.log("ngOninit running of header");


    if(sessionStorage.getItem("nm")!=null)
    {
      this.name=sessionStorage.getItem("nm");
      this.visibility = false;
    }
    else
    {
      this.name="Guest";
      this.visibility = true;
    }
   
    
  }
  onlogout()
  {
    sessionStorage.clear();
    this.myrouter.navigateByUrl('logout');
  }
  fetchallcategory()
  {
    this.myhttp.get("http://localhost:3000/api/fetchallcategories" ,{responseType:"json"}).subscribe(
      (response:[])=>
      {
        if(response.length>0)
        {
          this.allcategory=response;
          
        }
      },
      (error)=>
      {
        this.msg =error;
      }
    )
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
