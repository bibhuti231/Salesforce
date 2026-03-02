import { LightningElement } from 'lwc';

export default class EventChild extends LightningElement {
    
       previousHandler(){
        this.dispatchEvent(new CustomEvent('previous'));
    }
    nextHandler(){
        this.dispatchEvent(new CustomEvent('next'));
    }
}