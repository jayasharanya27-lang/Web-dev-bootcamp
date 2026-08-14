const express=require('express');
const app=express();
const port=process.env.PORT || 8080;

app.use(express.static("frontend"));
app.use(express.json());

const users=[
    {
        "id":1,
        "name":"john",
        "gender":"male",
        "image":"https://randomuser.me/api/portraits/men/18.jpg",
    },

    {
        "id":2,
        "name":"amber",
        "gender":"female",
        "image":"https://randomuser.me/api/portraits/women/43.jpg",
    },

    {
        "id":3,
        "name":"lily",
        "gender":"female",
        "image":"https://randomuser.me/api/portraits/women/26.jpg",
    },

    {
        "id":4,
        "name":"juan",
        "gender":"male",
        "image":"https://randomuser.me/api/portraits/men/88.jpg",
    },

    {
        "id":5,
        "name":"valtteri rantala",
        "gender":"male",
        "image":"https://randomuser.me/api/portraits/men/5.jpg",
    },

    {
        "id":6,
        "name":"sara",
        "gender":"female",
        "image":"https://randomuser.me/api/portraits/women/6.jpg",
    },

    {
        "id":7,
        "name":"michael",
        "gender":"male",
        "image":"https://randomuser.me/api/portraits/men/6.jpg",
    },

    {
        "id":8,
        "name":"emma",
        "gender":"female",
        "image":"https://randomuser.me/api/portraits/women/57.jpg",  
    },

    {
        "id":9,
        "name":"oliver",
        "gender":"male",
        "image":"https://randomuser.me/api/portraits/men/7.jpg",    
    },

    {
        "id":10,
        "name":"ava",
        "gender":"female",
        "image":"https://randomuser.me/api/portraits/women/8.jpg",  
    },

    {
        "id":11,
        "name":"liam",
        "gender":"male",
        "image":"https://randomuser.me/api/portraits/men/8.jpg",   
    },

    {  
        "id":12,
        "name":"sofia",
        "gender":"female",
        "image":"https://randomuser.me/api/portraits/women/9.jpg",  
    }

]

var nextId=13;

function findIndex(id){
    for(var i=0;i<users.length;i++){
        if(id===users[i].id){
            return i;
        }      
    }
    return -1;    
}

app.get("/api/users",function(req,res){
    return res.json(users);
})

app.get("/api/users/:id",function(req,res){
    var id=Number(req.params.id);
    var index=findIndex(id);

    if(index===-1){
        return res.status(404).json({"message":"User not found with id: "+id});
    }
    var user = users[index];
    return res.json(user);
});

app.get("/api/random-user",function(req,res){
    if(users.length===0){
        return res.status(404).json({"message":"No user found"});
    }   
    var randomIndex=Math.floor(Math.random()*users.length);
    return res.json(users[randomIndex]);    
});

app.post("/api/users",function(req,res){
    var newUser=req.body; 
    var tempUser = {
        "id":nextId,
        "name":newUser.name,
        "gender":newUser.gender,
        "image":newUser.image
    };
    nextId++;
    users.push(tempUser);
    return res.status(201).json({"message": "User created successfully", "user": tempUser

    });
    
});

app.put("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);
    if(index === -1){
        return res.status(404).json({"message" : "User not found with id : " + id});
    }
    if(req.body.name){
        users[index].name = req.body.name;
    }
    if(req.body.gender){
        users[index].gender = req.body.gender;
    }
    if(req.body.image){
        users[index].image = req.body.image;
    }

    return res.json(users[index]);
});

app.delete("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);
    if(index === -1){
        return res.status(404).json({"message" : "User not found with id : " + id});
    }
    var user = users[index];
    users.splice(index, 1);
    return res.json({"message" : "User deleted successfully", "user" : user});
});

app.listen(port,function(){
    console.log("Server running on http://localhost:"+port);
});