/**
* @Developed by @ArihantBhugari
*/

var model = require('../models/users');
class mongoQuery {

    //findOne function
    findOne(collection,query,callback) {
        
        model.findOne(query)
        .then(searchResult=>{
           if(searchResult) {
               return callback(null,true,searchResult);
           } else {
               return callback(null,false,null);
           }
        })
        .catch(err=>{
             return callback(err,false,null)
        })
    }

    //find all
    find(collection,query,populat,callback) {
        model.find(query).populate(populat)
        .then(searchResult=>{
           if(searchResult) {
               return callback(null,true,searchResult);
           } else {
               return callback(null,false,null);
           }
        })
        .catch(err=>{
             return callback(err,false,null)
        })
    }

    //findOneAndUpdate
    findOneAndUpdate(collection,query,updateParam,callback) {
        model.findOneAndUpdate(query,updateParam,{new:true,upsert:true})
        .then(updateResult => {
            return callback(null,true,updateResult);
        })
        .catch(err=>{
            return callback(err,false,null)
        })
    }

    //updateOne
     updateOne(collection,query,updateParam,newReturn,upsert,arrayFilter,callback) {
        model.updateOne(query,updateParam,{new:newReturn,upsert:upsert,arrayFilters:arrayFilter})
        .then(updateResult=>{
            return callback(null,true,updateResult);
        })
        .catch(err=>{
            return callback(err,false,null)
        })
     }

    //save the data in db
    insert(data,callback) {
        data.save(function (err,saved) {
            if (err) {
                return callback(err,false,null)
            };
           return callback(null,true,saved);
          });
    }
}
module.exports = mongoQuery;