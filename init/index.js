const sampleListings=require("./data");
const mongoose=require("mongoose");
const Listing = require("../models/listing");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/travora");
}
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

let initDB=async ()=>{
    await Listing.deleteMany({});
    updatedData = sampleListings.map((obj)=>({...obj,owner:'687910ecf06e0639d88cf053'}))
    await Listing.insertMany(updatedData);
    console.log("data saved");
}
initDB();