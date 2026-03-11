import { LightningElement,wire } from 'lwc';
import getDetails from '@salesforce/apex/studentClass.getStudent';
import deleteDetail from '@salesforce/apex/studentClass.deleteDetail';
import {refreshApex} from '@salesforce/apex';
import insertDetail from '@salesforce/apex/studentClass.insertDetail';
import getClasses from '@salesforce/apex/studentClass.getClasses';
import updateDetail from '@salesforce/apex/studentClass.updateDetail';

import STUDENT_OBJECT from '@salesforce/schema/Student__c';
import SKILLS_FIELD from '@salesforce/schema/Student__c.Salesforce_skills__c';

import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class StudentController extends LightningElement {
    students;
    wiredContactsResult;
    isView=false;
    editId;
     st;
     modalAdd=false;
    @wire(getDetails)
    wiredContacts(result){
            this.wiredContactsResult=result;
            this.result=result;
            if(result.data){
                this.students=result.data;

            }
            else if(result.error){
                this.students=undefined;
            }
        }
        handleRefresh(){
            refreshApex(this.wiredContactsResult);
        }
    sObject={
        Id:'',
        Name:'',
        Email:'',
        age:0,
        Enrolled_full_time:false,
       Salesforce_skills:'',
        Stream:'',
        class:'',
        fees:0,
    }
//     editDetails(event) {
//     this.isEdit = true;
//     this.editId = event.target.dataset.id;
    
//     // ✅ Fix 1: Use 'this.students' instead of 'students'
//     let stdnt = this.students.find(std => std.Id === this.editId);
    
//     // ✅ Fix 2: Guard against undefined
//     if (stdnt) {
//         this.st = stdnt;
//     } else {
//         conso le.error('Student not found with Id:', this.editId);
//         this.isEdit = false;
//     }
// }
skillOptions = [
    // { label: 'Admin concepts', value: 'Admin concepts' },
    // { label: 'Data security', value: 'Data security' },
    // { label: 'Report', value: 'Report' },
    // { label: 'Dashboard', value: 'Dashboard' },
    // { label: 'Integration', value: 'Integration' },
];
recordTypeId;

classOptions = [
    // { label: 'Asalesforce admin', value: 'a02fj00000PWnUPAA1' },
    // { label: 'salesforce dev', value: 'a02fj00000PWXORAA5' },
    // { label: 'Report', value: 'Report' },
    // { label: 'Dashboard', value: 'Dashboard' },
    // { label: 'Integration', value: 'Integration' },
];

selectedClass='';
selectedSkills=[];

@wire(getObjectInfo, { objectApiName: STUDENT_OBJECT })
objectInfo({data,error}){
    if(data){
        this.recordTypeId = data.defaultRecordTypeId;
    }
    else if(error){
        console.error(error);
    }
}

@wire(getPicklistValues, { 
    recordTypeId: '$recordTypeId',
    fieldApiName: SKILLS_FIELD
})
wiredSkills({data,error}){
    if(data){
        this.skillOptions = data.values;
    }
    else if(error){
        console.error(error);
    }
}

@wire(getClasses)
wiredClasses({data,error}){
    if(data){
        this.classOptions=data.map(cl=>({label:cl.Name,value:cl.Id}));
    }
    else if(error){
        console.error(error);
    }
}

handleClassChange(event){
this.selectedClass=event.detail.value;
this.sObject={...this.sObject,class:this.selectedClass};
}
handleSkillChange(event){
this.selectedSkills=event.detail.value;
this.sObject={...this.sObject,Salesforce_skills:this.selectedSkills.join(',')};
}
handleChange(event){
    let value;
    if(event.target.type=='checkbox'){
        value=event.target.checked;
    }
    else{
        value=event.target.value;
    }
    this.sObject={...this.sObject, [event.target.name]:value};
}
handleUpdate(){
    alert(this.sObject.Name+'\n '+this.sObject.age+'\n'+this.sObject.Email+'\n'+this.sObject.Enrolled_full_time);
updateDetail({id:this.sObject.Id,
    name:this.sObject.Name,
    age:this.sObject.age,
    email:this.sObject.Email,
    enrolledFullTime:this.sObject.Enrolled_full_time,
    Salesforce_skill:this.sObject.Salesforce_skills,
    classes:this.sObject.class}).then(()=>{
        this.handleRefresh();
        this.closeModal();
    })
    .catch(error=>{
        alert('some error happened');
    })
}
handleSubmit(){
    //alert(this.sObject.Name+'\n '+this.sObject.age+'\n'+this.sObject.Email+'\n'+this.sObject.Enrolled_full_time);
    insertDetail({ name:this.sObject.Name,
          age:this.sObject.age,
          email:this.sObject.Email,
          enrolledFullTime:this.sObject.Enrolled_full_time,
          Salesforce_skill:this.sObject.Salesforce_skills,
          classes:this.sObject.class,

        }).then(()=>{
            this.handleRefresh();
    this.handleClose2();
    const event = new ShowToastEvent({
            title: 'Success',
            message: 'Student record added successfully',
            variant: 'success'
        });

        this.dispatchEvent(event);
          } )
          .catch(error=>{
            alert('some error happened');
            //console.log('error');
          });
    
}
     handleAdd(){
        this.modalAdd=true;

     }
    viewDetails(event){
        this.isView=true;
        this.editId=event.target.dataset.id;
        let stdnt=this.students.find(std=>std.Id===this.editId);
        if(stdnt){
            this.st=stdnt;
            this.selectedSkills=stdnt.Salesforce_skills__c? stdnt.Salesforce_skills__c.split(','):[];
            this.sObject={
                Id:stdnt.Id,
                Name:stdnt.Name__c,
                age:stdnt.age__c,
                Email:stdnt.Email__c,
                Enrolled_full_time:stdnt.Enrolled_full_time__c,
                Salesforce_skills:stdnt.Salesforce_skills__c,
                class:stdnt.class__c,
            }
            this.selectedClass = stdnt.Class__c;
            
        }
        else{
            console.error('no record found');
            this.isView=false;
        }
    }
    closeModal(){
        this.isView=false;
    }
    handleClose2(){
        this.modalAdd=false;
    }
    deleteDetails(event){
        alert(' record is going to be deleted');
        let id=event.target.dataset.id;
        deleteDetail({id:id}).then(()=>{
            this.handleRefresh();
        }).catch(error=>{
            console.log(error);
        });
    }
}