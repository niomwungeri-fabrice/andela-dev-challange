/* global require */
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const parcels = [
    {parcelId: 1, userId: "niomwungeri",from:"Rwanda",to:"Kenya",length:45,width:42,height:2, status: "In Transit"},
    {parcelId: 2, userId: "admin" ,from:"Rwanda",to:"Uganda",length:45,width:42,height:2, status: "Pending"},
    {parcelId: 3, userId: "niomwungeri" ,from:"Uganda",to:"Kenya",length:45,width:42,height:2,height:3, status: "Canceled"} ,
    {parcelId: 4, userId: "admin" ,from:"Rwanda",to:"Somalia",length:45,width:42,height:2,height:3, status: "Pending"},
    {parcelId: 5, userId: "clovis" ,from:"RDC",to:"Kenya",length:45,width:42,height:2,height:3, status: "Delivered"},
    {parcelId: 6, userId: "caleb" ,from:"Rwanda",to:"Kenya",length:45,width:42,height:2,height:3, status: "Pick Up"},
    {parcelId: 7, userId: "niomwungeri" ,from:"Rwanda",to:"Somalia",length:45,width:42,height:2,height:3, status: "Canceled"},
    {parcelId: 8, userId: "caleb" ,from:"Ethiopia",to:"Kenya",length:45,width:42,height:2,height:3, status: "Pick Up"}
];

//permissions
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.get("/", (req, res) => res.send("API root for SendIT application"));

//findAll
app.get("/api/v1/parcels", (req, res) => {
    res.send(parcels);
});

//findByParcelID
app.get("/api/v1/parcels/:parcelId",(req, res) => {
    let parcel = parcels.find(p => p.parcelId === parseInt(req.params.parcelId));
    if(!parcel) return res.status(404).send("Parcel with this id >"+req.params.parcelId+"< was not found");
    res.send(parcel);
});
//findByUserID
app.get("/api/v1/users/:userId/parcels",(req, res) => {
    let parcel = parcels.find(p => p.parcelId === parseInt(req.params.parcelId));
    res.send(parcels);
});

//cancel parcel 
app.put("/api/v1/parcels/:parcelId/cancel",(req, res) => {
    let parcel = parcels.find(p => p.parcelId === parseInt(req.params.parcelId));
    if(!parcel){
        return res.status(404).send("Parcel with this id > "+req.params.parcelId+" < was not found");
    }else if (!parcel) {
        return res.status(200).send("Parcel Canceled already");
    }else if (!parcel) {
        return res.status(200).send("Oops, We can't cancel this parece, Parcel already Delivered");
    }
    res.send(parcels); 
});
//createParcel
app.post("/api/v1/parcels",(req,res) =>{ 
    let parcel = {
        parcelId : parcels.length + 1,
        userId : req.body.userId,
        from: req.body.from,
        to: req.body.to,
        length: req.body.length,
        width : req.body.width,
        height: req.body.height,
        status: "Pending"
    };
    parcels.push(parcel);
    res.send(parcel);
});


app.post("/api/v1/courses",(req,res) =>{
    const { error } = validateCourse(req.body);
    
    if (error) res.status(400).send(error.details[0].message);
    let course = {
        id : courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));