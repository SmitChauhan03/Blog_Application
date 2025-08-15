import conf from '../conf/conf.js'
import {Client, Account, ID} from "appwrite";

export class AuthService{

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    //create account
     async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error.message);
            throw error;
        }
    }

    //login account
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("AuthService :: login :: error", error.message);
            throw error;
        }
    }

    //get current user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
        if (error.code === 401) {
            // Unauthenticated
            return null;
        }
        console.error("Appwrite service :: getCurrentUser :: error", error.message || error);
        throw error; // Let caller handle unexpected errors
        }
    }

    // logout user form everywhere
    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService