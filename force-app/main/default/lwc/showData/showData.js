import { LightningElement ,wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
export default class ShowData extends LightningElement {
    fields=[NAME_FIELD,PHONE_FIELD];
}