import { LightningElement,track,api} from 'lwc';

export default class Decoder extends LightningElement {
         user = {
        name: 'john',
        age: 25,
    };
    aredetailvisible=false; 
    // todoApp.js
// @api myItem = this.template.querySelector("c-child").name;
    myItem;
    hasRendered = false;

    
    handlechange(event){
        this.aredetailvisible=event.target.checked;
    }
    changename() {
        this.user = {
        ...this.user,
        name: 'bibhuti'
    };
        
    }
    @api hisname;
     
    get contacts(){
        let arr=[
            {
                id:1,
                firstname:'bibhutibhusan',
                lastname:'behera',
                age:21,
            },
            {
                id:2,
                firstname:'ravi',
                lastname:'behera',
                age:25,
            },
            
        ]
        return arr;
    }
}