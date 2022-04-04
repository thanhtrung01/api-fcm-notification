const express = require("express");
const bodyparser = require("body-parser");
var admin = require("firebase-admin");

var serviceAccount = require("./api_notification.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyparser.json());

// const port = 3000;
//port (as described above) and host are both wrong
// const host = 'localhost';
// const port = 3000;

// use alternate localhost and the port Heroku assigns to $PORT
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

app.post("/send", (req, res) => {
  const registrationToken = req.body.registrationToken;

  const message = {
    notification: {
      title: req.body.title,
      body: req.body.body,
    },
  };

  console.log(message);
  
  const options = notification_options;

  admin
    .messaging()
    .sendToDevice(registrationToken, message, options)
    .then((response) => {
      res.status(200).send("Notification sent successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});
app.get('/', (req, res) => {
  
      res.status(200).send("Xin chào bạn Trung!");
  }
);
// app.listen(port, () => {
//   console.log("listening to PORT = " + port);
// });
app.listen(port, host, function() {
  console.log("Server started..." + port);
});