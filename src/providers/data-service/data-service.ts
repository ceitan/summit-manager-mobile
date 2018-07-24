import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  constructor(public http: Http,
  private httpC: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }

  getProducts() {
    return this.http.get('assets/data/products.json')
      .map((response:Response)=>response.json());
  }

  getLogin(pcode: any) {
      return this.httpC.get('http://evento.datacentersummit.com/Mobile/UserGET?Code=' + pcode);
  }

  getGuests(pcode: any) {
    return this.http.get('http://evento.datacentersummit.com/Mobile/StandInvitationsGet?Code=' + pcode)
                     .map((response:Response)=>response.json());
  }

  getVisitors(pcode: any) {
    return this.http.get('http://evento.datacentersummit.com/Mobile/StandvisitGet?Code=' + pcode)
                     .map((response:Response)=>response.json());
  }

  postVisitor(pid: any, pcode: any) {
    return this.http.post('http://evento.datacentersummit.com/Mobile/StandVisitCreate?Id=' +
                           pid + '&BarCode=' + pcode, {Id: pid, BarCode: pcode});
                           //.map((response:Response)=>response.json());
  }

}
