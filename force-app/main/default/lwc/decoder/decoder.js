import { LightningElement,track,api} from 'lwc';

export default class Decoder extends LightningElement {
        user = {
        name: 'john',
        age: 25,
    };
    aredetailvisible=false;
    handlechange(event){
        this.aredetailvisible=event.target.checked;
    }
    changename() {
        this.user.name = 'bibhuti';
    }
    o
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