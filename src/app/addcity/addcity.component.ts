import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AddcityComponent implements OnInit {

  myfile:File;
  cityname:string;
  citypic:string;
  msg:string;
  allcity:[];
  visibility:boolean=false;
  cityid:string;
  constructor(private myhttp:HttpClient) { }

  ngOnInit() {
    this.fetchallcat();
  }
  fileselected(event)
  {
    this.myfile=event.target.files[0];
  }

  fetchallcat()
  {
    this.myhttp.get("http://localhost:3000/api/fetchallcities",{responseType:"json"}).subscribe(
      (response:[])=>
      {
        if(response.length>0)
        {
          this.allcity=response;
        }

      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }

  oncityupdate(cityid,cityname,citypic)
  {
    this.visibility=true;
    this.cityname=cityname;
    this.citypic=citypic;
    this.cityid=cityid;
  }
  oncityadd()
  {
    var mydata=new FormData();
    if(this.myfile!=null)
    {
      mydata.append("photo",this.myfile);
      mydata.append("cityname",this.cityname);
    }
    else
    {
      mydata.append("cityname",this.cityname);
    }
    this.myhttp.post("http://localhost:3000/api/addcity",mydata,{responseType:"text"}).subscribe(
      (response)=>
      {
        this.msg=response;
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
  oncityupdatedb()
  {
    var mydata=new FormData();
    if(this.myfile!=null)
    {
      mydata.append("photo",this.myfile);//new image
      mydata.append("cityname",this.cityname);//old name or new name
      mydata.append("cityid",this.cityid);
      mydata.append("oldpic",this.citypic);
    }
    else
    {
      mydata.append("oldpic",this.citypic);//old image name
      mydata.append("cityname",this.cityname);
      mydata.append("cityid",this.cityid);
    }
    this.myhttp.put("http://localhost:3000/api/updatecity",mydata,{responseType:"text"}).subscribe(
      (response)=>
      {
        this.msg=response;
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
   oncitydelete(id)
   {
     //alert(id);
     this.myhttp.delete("http://localhost:3000/api/delcity?id=" + id,{responseType:"text"}).subscribe(
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

