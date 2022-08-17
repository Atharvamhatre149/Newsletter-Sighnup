
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");


const app=express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;

    var data={
        members:[
            {
            email_address: email,
            status : "subscribed",
            merge_fields:{
                FNAME: firstName,
                LName: lastName
            }

            }
        ]
    };

    const jsonData=JSON.stringify(data); 

    const url="https://us9.api.mailchimp.com/3.0/lists/b30fa354d4";

    const options={
        method:"POST",
        auth:"atharva1492:06a03495ee6cfcedc5196bea3bf814e9-us9"
    }
    const request=https.request(url,options,function(response){

        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
          response.on("data",function(data){
            console.log(JSON.parse(data));
          })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port ");
})


//Api key
//06a03495ee6cfcedc5196bea3bf814e9-us9

// listid
//  