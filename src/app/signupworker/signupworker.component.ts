import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signupworker',
  templateUrl: './signupworker.component.html',
  styleUrls: ['./signupworker.component.css']
})
export class SignupworkerComponent implements OnInit {
  myfile:File;
  myfile1:File;
  ppic:string;
  idpic:string;
  name:string;
  phone:string;
  gender:string;
  un:string;
  pass:string;
  cpass:string;
  msg:string;
  cname:string;
  subcatname:string;
  cityname:string;
  subcat:string;
  allcity:[];
  allcategory:[];
  allsubcat:[];
  address:string;
  exp:string;
  cat:string;  
  charges:number;
  
  constructor(private myhttp:HttpClient){}
  
  ngOnInit() {
    this.fetchallcategory();
    
    }

    fileselected(event)
  {
    this.myfile=event.target.files[0];
  }
   
  // fileselected1(event)
  // {
  //   this.myfile1=event.target.files[0];
  // }

  ons1click()
  {
    var mydata=new FormData();
    if(this.myfile!=null)
    {
      mydata.append("nm",this.name);
      mydata.append("address",this.address);
      mydata.append("ph",this.phone);
      mydata.append("gen",this.gender);
      mydata.append("uname",this.un);
      mydata.append("pass",this.pass);
      mydata.append("cpass",this.cpass);
      mydata.append("cityid",this.cityname);
      mydata.append("cname",this.cat);
      mydata.append("subcatname",this.subcat);
      mydata.append("exp",this.exp);
      mydata.append("charges",this.charges.toString());
      mydata.append("photo",this.myfile);
      mydata.append("utype",'worker');
  
    }
    else
    {
      mydata.append("nm",this.name);
      mydata.append("address",this.address);
      mydata.append("ph",this.phone);
      mydata.append("gen",this.gender);
      mydata.append("uname",this.un);
      mydata.append("pass",this.pass);
      mydata.append("cpass",this.cpass);
      mydata.append("cityid",this.cityname);
      mydata.append("cname",this.cat);
      mydata.append("subcatname",this.subcat);
      mydata.append("exp",this.exp);
      mydata.append("charges",this.charges.toString());
      mydata.append("utype",'worker');
    }
   
    // if(this.myfile1!=null)
    // {
    //   mydata.append("photo",this.myfile1);
    //   mydata.append("oldpic",this.idpic);
    // }
    // else
    // {
    //   mydata.append("oldpic",this.idpic);
    // }

  this.myhttp.post("http://localhost:3000/api/signupworker",mydata,{responseType:"text"}).subscribe(
    (response)=>
    {
      
      this.msg=response;
      this.clearfields();
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
  fetchallcategory()
      {
        this.myhttp.get("http://localhost:3000/api/fetchallcategories" ,{responseType:"json"}).subscribe(
          (response:[])=>
          {
            if(response.length>0)
            {
              this.allcategory=response;
              this.fetchallcat();
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
    clearfields()
  {
    this.myfile=null;
    this.name=null;
    this.address=null;
    this.phone=null;
    this.gender=null;
    this.cityname="";
    this.cat="";
    this.subcat="";
    this.un=null;
    this.pass=null;
    this.cpass=null;
    this.charges=null;
    this.exp=null;

  }

  }
