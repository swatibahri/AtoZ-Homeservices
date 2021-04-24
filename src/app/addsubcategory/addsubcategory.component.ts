import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.css']
})
export class AddsubcategoryComponent implements OnInit {

  myfile:File;
  scname:string;
  msg:string;
  allcategory:[];
  cat:string="";
  //fsize:number;
  //ftype:string;
  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
    this.fetchallcategory();
  }
  fileselected(event)
  {
    this.myfile=event.target.files[0];
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

      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
  onscatadd()
  {
    //this.fsize=this.myfile.size;
    //this.ftype=this.myfile.type;
    var mydata=new FormData();
    if(this.myfile!=null)
    {
      mydata.append("cid",this.cat);
      mydata.append("photo",this.myfile);
      mydata.append("scatname",this.scname);
    }
    else
    {
      mydata.append("cid",this.cat);
      mydata.append("scatname",this.scname);
    }
    this.myhttp.post("http://localhost:3000/api/addsubcat",mydata,{responseType:"text"}).subscribe(
      (response)=>
      {
        this.msg=response;
        this.clearfields();
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
  this.scname="";
  this.cat="";
}
}
