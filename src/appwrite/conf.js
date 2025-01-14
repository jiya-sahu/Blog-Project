import config from "../config/config.js";
import {Client, ID , Databases, Storage,Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
          .setEndpoint(config.appwriteUrl)
          .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async CreatePost({title,slug,content , featuredImage ,status , userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("appwrite service error :: CreatePost ",error);
            
        }
    }

    async UpdatePost(slug,{title,content , featuredImage ,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("appwrite service error :: UpdatePost ",error);
        }
    }

    async DeletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite service error :: DeletePost ",error)
        }
    }

    async GetPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite service error ::GetPost ",error);
            
        }
    }

    async GetPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("appwrite service error ::GetPosts ",error);
        }
    }

    //fileupload service

    async FileUpload(file){
        try {
           return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
           )
        } catch (error) {
            console.log( console.log("appwrite service error ::FileUpload ",error));
            return false
        }
    }

    async Deletefile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("appwrite service error ::DeleteFile ",error);
        }
    }

    async Getfilepreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }


}
const service = new Service();
export default service ;