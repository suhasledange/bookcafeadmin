const { conf } = require("../util/conf");
import { Client, Databases,ID,Query } from "appwrite";

export class Service{
    
    client = new Client()
    databases;

    constructor(){
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID);
        this.databases = new Databases(this.client) 

    }

    async OrdeList(){
        try {
            return await this.databases.listDocuments(conf.DATABASE_ID,conf.COLLECTION_ID_ORDERLIST)

        } catch (error) {   
            console.log("error getting order list",error)
        }
    }

}

const service = new Service()
export default service;