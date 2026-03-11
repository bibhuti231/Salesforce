import { LightningElement } from 'lwc';

export default class EventChild extends LightningElement {
    // page=1;
    // myvalue='first value';
    //    previousHandler(){
    //     this.dispatchEvent(new CustomEvent('previous'));
    // }
    // nextHandler(){
    //     this.dispatchEvent(new CustomEvent('next'));
    // }
    // handleChange(event){
    //     this.myvalue=event.target.value;
    // }
    object={
        myname:'john',
        age:40
    };
    nameHandler(){
        const bn=this.template.querySelector('lightning-button');
        const myevent=new CustomEvent('changer',{detail:this.object,
            bubbles:true,
            composed:true
        });
        bn.dispatchEvent(myevent);
        // if you use this.dispatchEvent you don't need to define bubbles and composed 
    }

}