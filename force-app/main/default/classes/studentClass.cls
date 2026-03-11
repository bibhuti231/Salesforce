public with sharing class studentClass {
    public studentClass() {

    }
@AuraEnabled(cacheable=true)
  
    public static List<Student__c> getStudent(){
        return [SELECT 	Name,Id, Name__c, Email__c, age__c, CreatedDate, Enrolled_full_time__c, Salesforce_skills__c, Stream__c,Class__c, Class__r.Name,Class__r.fees__c FROM Student__c];
    }
     @AuraEnabled(cacheable=true)
public static List<Class__c> getClasses(){
    return [SELECT Id, Name FROM Class__c];
}

    @AuraEnabled
    public static void deleteDetail(Id id){
        delete [SELECT Id FROM Student__c WHERE Id=:id];
    }
    @AuraEnabled
    public static void updateDetail(Id id,String name, Integer age, String email, Boolean enrolledFullTime,String Salesforce_skill, String classes){
        Student__c st= [SELECT Id FROM Student__c WHERE Id=:id];
        st.Id=id;
        st.Name__c=name;
        st.age__c=age;
        st.Email__c=email;
        st.Enrolled_full_time__c=enrolledFullTime;
        st.Salesforce_skills__c=Salesforce_skill;
        st.Class__c=classes;
        update st;
        // insert [SELECT Id FROM Student__c WHERE Id=:id];
    }
    @AuraEnabled
    public static void insertDetail(String name, Integer age, String email, Boolean enrolledFullTime, String Salesforce_skill, Id classes){
        Student__c st=new Student__c();
        st.Name__c=name;
        st.age__c=age;
        st.Email__c=email;
        st.Enrolled_full_time__c=enrolledFullTime;
        st.Salesforce_skills__c=Salesforce_skill;
       st.Class__c=classes;
        insert st;
        // insert [SELECT Id FROM Student__c WHERE Id=:id];
    }
     
}
