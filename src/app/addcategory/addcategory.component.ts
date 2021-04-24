import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  myfile:string;
  cname:string;
  msg:string;
  catpic:string;
  allcategory:[];
  visibility:boolean=false;
  cid:string;
    constructor(private myhttp:HttpClient) { }
  
    ngOnInit() {
      this.fetchallcategory();
    }
    fileselected(event)
    {
      this.myfile = event.target.files[0];
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
      oncatupdate(catid,cname,catpic)
      {
        this.visibility=true;
        this.cname=cname;
        this.catpic=catpic;
        this.cid=catid;
      }
      
      oncatadd()
      {
        var mydata = new FormData();
        if(this.myfile!=null)
        {
          mydata.append("photo",this.myfile);
          mydata.append("cname",this.cname);
        }
        else
        {
          mydata.append("cname",this.cname);
        }
        this.myhttp.post("http://localhost:3000/api/addcat" ,mydata,{responseType:"text"}).subscribe(
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
    oncatupdatedb()
    {
      var mydata = new FormData();
      if(this.myfile!=null)
      {
        mydata.append("photo",this.myfile);
        mydata.append("cname",this.cname);
        mydata.append("cid",this.cid);
        mydata.append("oldpic",this.catpic);
      }
      else
      {
        mydata.append("oldpic",this.catpic);
        mydata.append("cname",this.cname);
        mydata.append("cid",this.cid);
      }
      this.myhttp.put("http://localhost:3000/api/updatecat" ,mydata,{responseType:"text"}).subscribe(
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
    oncatdelete(id)
    {
      //alert(id);
      this.myhttp.delete("http://localhost:3000/api/delcat?id=" + id,{responseType:"text"}).subscribe(
        (response)=>
        {
            alert(response);
        },
        (error)=>
        {
          this.msg=error;
        }
      )
   }
  }