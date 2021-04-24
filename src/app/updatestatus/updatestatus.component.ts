import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updatestatus',
  templateUrl: './updatestatus.component.html',
  styleUrls: ['./updatestatus.component.css']
})
export class UpdatestatusComponent implements OnInit {
  oid:string;
  currst:string;
  nst:string="";
  msg:string;
  constructor(private route:ActivatedRoute, private myhttp:HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(args => {
      this.oid = args.orderid;
      this.currst = args.st;
    })
  }
  updatestatus() {
    let vals={newstatus:this.nst,oid:this.oid};
    this.myhttp.put("http://localhost:3000/api/updateStatus", vals, {responseType:"text"}).subscribe(
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
}
