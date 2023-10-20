const mongoose = require(`mongoose`);


mongoose.connect('mongodb+srv://admin:admin@cluster0.9nd2lrx.mongodb.net/Marketplace?retryWrites=true&w=majority',
{useNewUrlParser:true});

const connection = mongoose.connection;


module.exports = connection;