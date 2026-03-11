import { LightningElement,wire,api } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.cont';
import insertObject from '@salesforce/apex/ContactController.insertObject';
import {refreshApex} from '@salesforce/apex';

export default class MyContacts extends LightningElement {
    contacts;
    showChild=false;
    @api wiredContactsResult;

    @wire(getContacts)
        wiredContacts(result){
            this.wiredContactsResult=result;
            if(result.data){
                this.contacts=result.data;

            }
            else if(result.error){
                this.contacts=undefined;
            }
        }
    
    handleRefresh(){
        refreshApex(this.wiredContactsResult);
    }
    remove(){
        this.showChild=false;
    }
    addnew(){
        this.showChild=true;
    }
    obj={
        Name:'',
    
        Email:'',
        Phone:''
    }
    changeName(event){
        this.obj={...this.obj,Name:event.target.value};
    }
    changeEmail(event){
        this.obj={...this.obj,Email:event.target.value};
    }
    changePhone(event){
        this.obj={...this.obj,Phone:event.target.value};
    }
    handleSubmit(){
        if(this.obj.Name==''){
            alert('Name is required');
        }
        insertObject({name:this.obj.Name, email:this.obj.Email, phone:this.obj.Phone})
         .then(()=>{
            
            this.remove();
            return refreshApex(this.wiredContactsResult)
         })
         .catch(error=>{
            console.log(error);
         });
        //  .catch(error=>{
        //     console.log(error);
        //  });// }
    }
    
    
}