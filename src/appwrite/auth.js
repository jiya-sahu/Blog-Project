import config from "../config/config";
import { Client, Account , ID } from "appwrite";

export class AuthService {
     client = new Client();
     account;

     constructor() {
        this.client
          .setEndpoint(config.appwriteUrl)
          .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
     }


     async CreateAccount ({email , password , name}) {
        try {
          const userAccount =   await this.account.create(ID.unique(),email,password,name);
          if (userAccount) {
            //we can call another method
            return this.login({email,password});
          } else {
            return null;
          }
        } catch (error) {
          console.log("appwrite error :: CreateAccount",error)
        }
     }

     async login({email,password}){
      try {
       return  await this.account.createEmailSession(email,password);
      } catch (error) {
        console.log("appwrite error :: login",error);
        
      }
     }

     async getCurrentUser(){
      try {
        return await this.account.get();
      } catch (error) {
        console.log("appwrite error :: getCurrentUser",error)
      }
      return null;
     }

     async logout() {
      try {
        await this.account.deleteSessions();
      } catch (error) {
        console.log("appwrite error :: logout",error)
      }
     }


}

const authService = new AuthService();

export default authService