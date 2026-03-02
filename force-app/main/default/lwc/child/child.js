import { LightningElement,api } from 'lwc';

export default class Child extends LightningElement {
    @api message='thanks';
    @api name='babulu';
    @api age=34;
    
}