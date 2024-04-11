const { conf } = require("../util/conf");
import { Client, Databases, ID, Query } from "appwrite";

export class Service {

    client = new Client()
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID);
        this.databases = new Databases(this.client)

    }

    async OrdeList() {
        try {

        let allDocuments = [];
        let page = 1;
        let documents;

        do {
          
            documents = await this.databases.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID_ORDERLIST,
                [
                    Query.limit(50), 
                    Query.offset((page - 1) * 50),
                ]
            );
            
            allDocuments = allDocuments.concat(documents);
            
            page++;
        } while (documents.length === 0); 
        return allDocuments[0];

        } catch (error) {
            console.log("error getting order list", error)
        }
    }

    async confirmOrder(Id) {
        try {
            const currentDate = new Date();
            const dueDate = new Date(currentDate);
            dueDate.setDate(dueDate.getDate() + 11);

            return await this.databases.updateDocument(conf.DATABASE_ID, conf.COLLECTION_ID_ORDERLIST, Id, {
                DueDate:dueDate,
                payment:'complete',
                status:'DELIVERED',
                DeliveredDate:currentDate,
                Due:0
            })
        } catch (error) {
            console.log('error confirming order', error)
        }
    }
    async confirmReturn(Id,bookId) {
        try {

            const res = await this.databases.updateDocument(conf.DATABASE_ID, conf.COLLECTION_ID_ORDERLIST, Id, {
                DueDate:null,
                status:'Returned',
                request:'',
            })
            if(res){
                const book = await this.getBook(bookId)
                
                let availability = book.availability;
                if(book.bookQuantity === 0) availability=true;

                return await this.databases.updateDocument(conf.DATABASE_ID, conf.COLLECTION_ID_BOOKSTORE, bookId, {
                    availability:availability,
                    bookQuantity:book.bookQuantity+1,
                })
            }


        } catch (error) {
            console.log('error confirming order', error)
        }
    }
    
    async getBook(Id){
        try {

            return this.databases.getDocument(conf.DATABASE_ID,conf.COLLECTION_ID_BOOKSTORE,Id)

        } catch (error) {
            throw error
        }
    }

    async cancelOrder(Id,bookId) {
        try {

            const res = await this.databases.updateDocument(conf.DATABASE_ID, conf.COLLECTION_ID_ORDERLIST, Id, {
                DueDate:null,
                payment:'cancel',
                status:'Cancelled',
                request:"",
            })
            
                if(res){
                const book = await this.getBook(bookId)
                
                let availability = book.availability;
                if(book.bookQuantity === 0) availability=true;

                return await this.databases.updateDocument(conf.DATABASE_ID, conf.COLLECTION_ID_BOOKSTORE, bookId, {
                    availability:availability,
                    bookQuantity:book.bookQuantity+1,
                })
            }


        } catch (error) {
            console.log('error confirming order', error)
        }
    }

}

const service = new Service()
export default service;