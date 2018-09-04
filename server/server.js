require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const mc = require("./messagesCtrl")

const app = express()
app.use(bodyParser.json())
app.use(session({
    secret: "yeet",
    resave: false,
    saveUninitialized: true
}))
app.use(function(req, res, next) {
    let badWords = ['knucklehead', 'jerk', 'internet explorer'];
  if (req.body.message) {
    let badWordsExist = true;
    for (let i = 0; i < badWords.length; i++) {
      let regex = new RegExp(badWords[i], 'g');
      req.body.message = req.body.message.replace(regex, '****');
    }
    next();
  } else {
    next();
  }
})

app.get("/api/messages", mc.getAllMessages)
app.post("/api/messages", mc.createMessage)
app.get("/api/messages/history", mc.history)

const port = process.env.PORT || 3005
app.listen(port, () => console.log(`Server started on port: ${port}`))