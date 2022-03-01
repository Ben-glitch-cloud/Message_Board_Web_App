// const mongoose = require('mongoose'); 

const { MongoClient } = require('mongodb') 
const ObjectId = require('mongodb').ObjectID; 
require('dotenv').config() 

const UserName = process.env.USER_NAME  

const Password = process.env.USER_PASSWORD
 
const dbURL = `mongodb+srv://${UserName}:${Password}@messagebord.3lenm.mongodb.net/UserMessages?retryWrites=true&w=majority`  

const client = new MongoClient(dbURL); 

class MessageBord {
    async HoldingMessages(){ 
        try{ 
            await client.connect();  
            const MessageData = await client.db('UserMessages').collection('Messages').find().toArray()
            return MessageData
        }catch(e){
            console.log(`Error Found: ${e}`)
        }finally{
            await client.close();
        }
    } 

    async addNewMessage(NewMessageData){
        try{
            await client.connect();  
            await client.db('UserMessages').collection('Messages').insertOne(NewMessageData) 
            return true
        }catch(e){
            console.log(`Error: ${e}`)
        }finally{
            await client.close();
        }
    } 

    async DeleteMesage(ID){
        try{
            await client.connect() 
            await client.db('UserMessages').collection('Messages').deleteOne({"_id": ObjectId(ID)})
            return true
        }catch(e){
            console.log(`Error: ${e}`)
        }finally{
            await client.close()
        }
    }
} 

module.exports = MessageBord