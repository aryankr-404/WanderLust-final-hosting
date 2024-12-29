const mongoose = require('mongoose');
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main().then(() => {
    console.log('Database connected');
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
};

const initDB = async ()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner : "6693662f476c089b364eba20"}));
    await Listing.insertMany(initdata.data);
    console.log("DB was initialised");
};
// initDB();