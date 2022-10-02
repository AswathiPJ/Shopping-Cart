var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectId
module.exports={
    addProduct:(product,callback)=>{
        db.get().collection('product').insertOne(product,(err,data)=>{
            if(err)
             throw err;
            callback(data.insertedId);
        })
       
        // db.get().collection('product').insertOne(product).then((data)=>{
        //     console.log(data)
        //     callback(data)
        // })
        },
        getAllProducts:()=>{
            return new Promise(async(resolve,reject)=>{
                let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
                resolve(products)

            })
        },
        deleteProduct:(proId)=>{
            return new Promise ((resolve,reject)=>{
                db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
                    console.log(response)
                    resolve(response)
                })
            })

        }
    }
