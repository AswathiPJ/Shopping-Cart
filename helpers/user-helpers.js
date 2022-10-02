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

    }
}