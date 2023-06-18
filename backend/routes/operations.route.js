import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import createTopic from '../hcs/topicCreation.js';
import initClient from '../hcs/initClient.js';
import sendMessage from '../hcs/sendMessage.js';
import getTopicId from '../hcs/getTopicID.js';

const client =  initClient();

const app = express();
app.use(express.json());

app.post('/createAccount', async (req, res) => {
    const formData = req.body;
    const newUser = new User(formData);
    const userNameExists = await User.findOne({"userName": newUser.userName});
    if (userNameExists) {
        res.json({"isSuccess": false, "message": "User name already exists."});
    } else {
        try {
            await newUser.save();
            res.json({"isSuccess": true, "message": "Account successfully created, redirecting."});
        } catch(err) {
            console.log(err);
        }
    }
});

app.post('/loginAccount', async (req, res) => {
    const formData = req.body;
    const userNameExists = await User.findOne({userName: formData.userName});
    
    if (!userNameExists) {
        res.json({"isSuccess": false, "message": "User name not found, please sign up."});
    } else {
        const isPasswordMatched = await bcrypt.compare(formData.password, userNameExists.password);
        
        if (!isPasswordMatched) {
            res.json({"isSuccess": false, "message": "Incorrect username or password."});
        } else {
            res.json({"isSuccess": true, "message": "Logged in successfully, redirecting."})
        }
    }
});

app.post('/validate', async (req,res) => {
    const formData = req.body;
    const userNameExists = await User.findOne({userName: formData.userName});
    if(!userNameExists){
        res.json({"isSuccess" : false});
    }
    else{
        res.json({"isSuccess" : true})
    }
})

app.post('/postArticle', async (req, res) => {
    const receivedData = req.body;
    const userName = await User.findOne({userName : receivedData['body']['userName']});
    const topicID = getTopicId(receivedData['topicName']);
    if(receivedData['isJournalist']){
        if(!userName){
            res.json({"message" : "failed"});
        }
        else{
            sendMessage(receivedData['body'],topicID, client);
            res.json({"message" : "success"});
        }
    }
    else{
        res.json({"message" : "not a journalist"});
    }
});

app.post('/createTopic', async(req,res) => {
    const receivedData = req.body;
    if(receivedData['name']){
        createTopic(receivedData['name'], client);
        res.json({"message" : "success"});
    }
    else{
        res.json({"message" : "fail"});
    }
});

app.post('/journalistStatus', async(req,res) =>{
    const receivedData = req.body;
    if(receivedData['userName']){
        const userNameExists = await User.findOne({userName: receivedData.userName});
        res.json({"type":userNameExists['isJournalist']});
    }
})

app.post('/topicID', async(req,res) =>{
    const receivedData = req.body;
    if(receivedData['topicName']){
        res.json({"topicID" : getTopicId(receivedData['topicName'])});
    }
})

export default app;