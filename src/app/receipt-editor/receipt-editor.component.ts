import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from "../order.service"
import { Order } from "../order"
import { OrderItem } from "../order-item"
// import {} from "../order-item"

@Component({
  selector: 'app-receipt-editor',
  templateUrl: './receipt-editor.component.html',
  styleUrls: ['./receipt-editor.component.css']
})
export class ReceiptEditorComponent implements OnInit {
// will run when create instant of class --1
  constructor(private route:ActivatedRoute, private myOrderService:OrderService, private router:Router) { }
  private formDate:string;
  private order:Order;
  // will run when create component ---2
  ngOnInit() {
      this.route.params.forEach((params:Params)=>{
        console.log(params['id'])
        this.order=this.myOrderService.getOrder(params['id'])
        this.formDate = this.order.create_time.toISOString().substring(0, 10)
      })
  }

  // add items in Order.items
  addItem(){
    this.order.items.push(new OrderItem( "", 1, 0))
  }

  // delete items in Order.items
deleteItem(index:number){
    this.order.items.splice(index, 1)
  }

  // validate if form is empty
  validate(){
    let result = true;
    if(this.formDate == "")
        return false;
    if (this.order.items.length <= 0)    
        return false;
    this.order.items.forEach(OrderItem =>{
        if(OrderItem.item == "")
          result = false;
    })    
    return result;   
  }


  //save data to db
  // return true if success
  save():boolean{
    if(!this.validate())
      return false;
      // we need to change fromDate back to createDate
      this.order.create_time = new Date(this.formDate)
      // we need to save our order to DB(localStorage) ny using OrderService(myOrderServive)
      this.myOrderService.updateOrder(this.order)
      return true;
  }

  onSave(){
    if (!this.save()){
      alert("YOU ARE WRONG");
    }else{
      alert ("SAVED")  
      this.router.navigate(['home']); //make it navigate
      }
  }

}
