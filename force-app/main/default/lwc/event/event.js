import { LightningElement } from 'lwc';

export default class Event extends LightningElement {
    //   page=1;
    // previousHandler(){
    //     this.page=this.page-1;
    // }
    // nextHandler(){
    //     this.page=this.page+1;
    // }
    
    myName='';
    age=0;
    nameHandler(event){
      this.myName=event.detail.myname;
      this.age=event.detail.age;
    };
}