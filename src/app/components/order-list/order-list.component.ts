import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  public list: any[] = [];
  constructor(private _http: HttpServiceService) { }

  ngOnInit() {
    this._http.get("order").subscribe((res: any) => {
      this.list = res;
    })
    setInterval(() => {
      this._http.get("order").subscribe((res: any) => {
        this.list = res;
      })
    }, 1000)

  }
  changeStatus(status, id, order) {
    order.status = status;
    console.log(JSON.stringify(order));

    this._http.put("order/" + id, JSON.stringify(order)).subscribe((res: any) => {
      // this.list = res;
    });
  }
}
