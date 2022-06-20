import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  public order: any = { price: 0, withMilk: false };
  public states: any[] = [];
  public sizes: any[] = [];
  public coffeeTypes: any[] = [];
  public milkTypes: any[] = [];
  constructor(private _http: HttpServiceService) { }


  ngOnInit() {
    this._http.get("options/status").subscribe((res: any) => {
      this.states = res;
    });
    this._http.get("options/size").subscribe((res: any) => {
      this.sizes = Object.entries(res);
      console.log(Object.entries(res));



    });
    this._http.get("options/coffee").subscribe((res: any) => {
      this.coffeeTypes = Object.entries(res);
      console.log(Object.entries(res));



    });

    this._http.get("options/milk").subscribe((res: any) => {
      this.milkTypes = Object.entries(res);
      console.log(Object.entries(res));
    });
  }

  save() {
    console.log(JSON.stringify(this.order));

    this._http.insert("order", JSON.stringify(this.order)).subscribe((res: any) => {
      console.log(res);
      this.order = { price: 0, withMilk: false };

    });


  }
  select(status, selection) {
    switch (selection) {
      case 'status':
        this.order.status = status;

        break
      case 'size':
        this.order.price += status[1];
        this.order.size = status[0];
        break;
      case 'coffee':
        this.order.price += status[1];
        this.order.coffeeType = status[0];
        break;
      case 'milkTypes':
        this.order.price += status[1];
        this.order.milkType = status[0];
        this.order.withMilk = true;
        break;
      default:
        break
    }

  }
}
