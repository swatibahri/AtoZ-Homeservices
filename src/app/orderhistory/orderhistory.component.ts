import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  orders: any[];
  msg: string;
  constructor(private myhttp: HttpClient) { }

  ngOnInit() {
    this.fetchcart();
  }

  fetchcart()
  {
    this.myhttp.get("http://localhost:3000/api/getOrdersByUser?uname=" + sessionStorage.getItem("uname"),{responseType:"json"}).subscribe(
      (response:any[])=>
      {
        if(response.length>0)
        {
          this.orders=response;
        }
        else
        {
          this.msg="No details found";
        }

      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }
}
//   ondel(id)
//   {
//     //alert(id);
//     this.myhttp.delete("http://localhost:3000/api/delorder?id=" +id ,{responseType:"text"}).subscribe(
//       (response)=>
//       {
//           alert(response);
//           this.fetchcart();
//       },
//       (error)=>
//       {
//         this.msg=error;
//       }
//     )
//   }
// }
