
import { Component, OnInit } from '@angular/core';
import { OrderService } from "../order.service"
// import { OrderService } from "../order.service"
import 'rxjs/add/operator/toPromise'
import { Order } from "../order"
import { OrderItem } from "../order-item"
import { Observable } from "rxjs"

@Component({
  selector: 'app-receipt-selector',
  templateUrl: './receipt-selector.component.html',
  styleUrls: ['./receipt-selector.component.css']
})
export class ReceiptSelectorComponent implements OnInit {

  orders:Array<Order>
  ob_orders:Observable<Array<Order>>

promise_orders:Promise<Array<Order>>
  //inject the service instance in constructor
  constructor( private os:OrderService  ) {
      this.orders = os.load()
      // os.getOrderFromURL(orders =>{
      //   this.orders = orders;
      // });
      this.ob_orders = os.getOrderFromURL()
  }

   //init when done created a component
  ngOnInit() {
    // this.ob_orders.subscribe(data =>{
    //   this.orders = data;
    // })
  }

  loadfromURL(){
    this.os.laodDataFromURL().then(orders =>{
      this.orders = orders;
    })
  }

  // onSomething(){
  //   this.promise_orders.then(data =>{
  //     console.log('do other stuff')
  //   })
  // }

}