import {Client,Account} from 'appwrite'
import { conf } from '../util/conf';

export class AuthService{

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID)

        this.account = new Account(this.client);
    }

    async loginAccount({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async logoutAccount(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error
        }
    }

    async getSesssion(){
        return await this.account.getSession('current')
    }

}

const authService = new AuthService();
export default authService;
