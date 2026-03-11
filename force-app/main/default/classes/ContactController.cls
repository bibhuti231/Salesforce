public class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> cont(){
        return [SELECT Id, Name, Email, Account.Name,CreatedDate,CreatedById,Phone
FROM Contact ORDER BY 	CreatedDate DESC];
    }
    @AuraEnabled 
    public static void insertObject(String name, String email, String phone){
        Contact c=new Contact();
        c.LastName=name;
        c.Email=email;
        c.Phone=phone;
        insert c;
    }
}