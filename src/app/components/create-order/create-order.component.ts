import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  public order: any = { price: 0 };
  public states: any[] = [];
  public sizes: any[] = [];
  public coffeeTypes: any[] = [];
  public milkTypes: any[] = [];
  public pickup: any[] = [];
  constructor(private _http: HttpServiceService) { }


  ngOnInit() {

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

    this._http.get("options/pickUp").subscribe((res: any) => {
      this.pickup = Object.entries(res);
      console.log(Object.entries(res));
    });
  }

  save() {
    console.log(JSON.stringify(this.order));

    this._http.insert("order", JSON.stringify(this.order)).subscribe((res: any) => {
      if (res.id > 0) {
        this.order = { price: 0 };

      }

    });


  }
  select(value, selection) {
    switch (selection) {
      case 'pickup':
        this.order.price += value[1];

        this.order.delivery = value[0];
        break
      case 'size':
        this.order.price += value[1];
        this.order.size = value[0];
        break;
      case 'coffee':
        this.order.price += value[1];
        this.order.coffeeType = value[0];
        break;
      case 'milk':
        this.order.price += value[1];
        this.order.milkType = value[0];
        this.order.withMilk = true;
        break;
      default:
        break
    }

  }
}
