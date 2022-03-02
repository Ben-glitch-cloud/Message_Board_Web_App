const express = require('express')
const app = express() 
const port = 3000  

const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const MessageBordClasses = require('./model/BordMessages')

const messageBordExpress = new MessageBordClasses['MessageBord'] 

const messageBordedUserProfile = new MessageBordClasses['UserAccounts']

app.get('/messages', async function (req, res) {  
  const messages = await messageBordExpress.HoldingMessages() 
  res.send(messages) 
}) 

app.post('/newMessage', async function(req, res){ 
  await messageBordExpress.addNewMessage(req.body)
  res.send('--Success Message has been stored--')
}) 

app.post('/deleteMessage', async function(req, res) {
  await messageBordExpress.DeleteMesage(req.body['id'])
  res.send('--Success Message has been delete--')
}) 

app.post('/EditMessage', async function(req, res) {
  await messageBordExpress.EditMessage(req.body)
  res.send('--Message has been delete--')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 

app.get('/CheckUserDetails', async function(req, res) {
  const result = await messageBordedUserProfile.VerifyDetails(req.query.UserName, req.query.Password) 
  const Verify = result['UserName'] === req.query.UserName && result['Password'] === req.query.Password
  res.send(Verify)
})

