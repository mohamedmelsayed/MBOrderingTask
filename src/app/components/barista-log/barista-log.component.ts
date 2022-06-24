import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-barista-log',
  templateUrl: './barista-log.component.html',
  styleUrls: ['./barista-log.component.scss']
})
export class BaristaLogComponent implements OnInit {
  public list: any[] = [];
  constructor(private _http: HttpServiceService) { }


  ngOnInit() {
    setInterval(() => {
      this._http.getBarista("").subscribe((res: any) => {
        this.list = res;
      }), 10000
    });
  }

}
