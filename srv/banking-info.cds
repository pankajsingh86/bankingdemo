using {sap.capire.bank_details as my} from '../db/schema';


service BankingInfo {

 entity Banks as projection on my.Banks ;
 entity Customers as projection on my.Customers;
 entity Accounts  as projection on my.Accounts;
 @readonly entity State as projection on my.State;

}
