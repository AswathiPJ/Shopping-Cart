var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
const { USER_COLLECTION } = require('../config/collections')
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
      return new Promise((resolve,reject)=>{
        let user=
      })

    }
}