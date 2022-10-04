var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
const { USER_COLLECTION } = require('../config/collections');
const { response } = require('express');
const objectId = require("mongodb").ObjectId;
// module.exports={
//     doSignup:(userData)=>{
//         return new Promise(async(resolve,reject)=>{
//             userData.Password=await bcrypt.hash(userData.Password,10)
//             db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
//                 // userData._id=data.insertedId
//                 // console.log(userData);
//                 resolve(userData);

//             })


//         })
        
//     }
// }

module.exports = {

    doSignup: (userData) => {
  
      return new Promise(async(resolve, reject) => {
  
        userData.Password =await bcrypt.hash(userData.Password, 10);
  
        
        db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => { 
            db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(data.insertedId) }).then((user) => {
            resolve(user)
        })
    })
  
      
  
      })
  
    },
    doLogin:(userData)=>{
      
      return new Promise(async (resolve,reject)=>{
        let loginStatus=false
        let respose={}
        let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
        if(user){
          bcrypt.compare(userData.Password,user.Password).then((status)=>{
            if(status){
              console.log("Login success");
              response.user=user
              response.status=true
              resolve(response)
            }else{
              console.log("Login failed")
              resolve({status:false})
            }
          })
        }else{
          console.log("Login failed succefully")
          resolve({status:false})
        }
      })

    },
    addToCart:(proId,userId)=>{
      return new Promise (async (resolve,reject)=>{
        let userCart=await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)})
        if(userCart){
          db.get().collection(collection.CART_COLLECTION).updateOne({user:objectId(userId)},
          {
            $set:{
              
            },
            $push:{products:objectId(proId)}
          }).then((response)=>{
            resolve()
          })

        }else{
          let cartObj={
            user:objectId(userId),
            products:[objectId(proId)]
          }
          db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
            resolve()
          })
        }
      })
    
    },
    getCartProducts:(userId)=>{
      return new Promise (async (resolve,reject)=>{
        let cartItems=await db.get().collection(collection.CART_COLLECTION).aggregate([
          {
            $match:{user:objectId(userId)}
          },
          {
            $lookup:{
              from:collection.PRODUCT_COLLECTION,
              let:{proList:'$products'},
              pipeline:[
                {
                  $match:{
                    $expr:{
                      $in:['$_id','$$proList']
                    }
                  }
                }
              ],
              as:'cartItems'
            }
          }
        ]).toArray()
        resolve(cartItems[0].cartItems)
      })

    },
    getCartCount:(userId)=>{
      return new Promise(async (resolve,reject)=>{
        let count=0
        let cart=await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)})
        if(cart){
          count=cart.products.length
        }
        resolve(count)
      })

    }
}