import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
        // sname='bibhuti';
        fname = "Bibhuti";
        greeting=`${this.fname} behera`;
        changeHandler(event) {
        this.greeting = event.target.value;
        }
}
