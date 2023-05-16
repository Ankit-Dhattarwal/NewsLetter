
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");  
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName = req.body.tName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
          {
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName,
            },
          },
        ],
      };

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/3bb37e672c";
    const options = {
        method: "POST",
        auth: "Ankit1:cf4d6323a43e21c5c2aa3ca4daddc851-us12",
    }

   const mailchimpRequest =  https.request(url, options, function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

  //  mailchimpRequest.write(jsonData);
    mailchimpRequest.end();

    console.log(firstName , lastName , email);


});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 1100, function(){
console.log("Server is running on port 1100");
});

//  APi Key 
// cf4d6323a43e21c5c2aa3ca4daddc851-us12

// List id 
// 3bb37e672c
