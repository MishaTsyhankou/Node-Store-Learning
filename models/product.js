const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;

class Product{
  constructor(tittle, price, description, imageURL) {
    this.tittle = tittle;
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
  }

  save(){
    const db = getDb();
    return db.collection('products').insertOne(this).then(result=>{
      console.log(result)
    }).catch(err=>{
      console.log(err)
    })

  }
  static fetchAll () {
    const db = getDb();
    return db
        .collection('products')
        .find()
        .toArray()
        .then(products => {
              console.log(products)
              return products
            }
        ).catch(err=>{
          console.log(err)
        })

  }

  static  findById(prodId){
      const db = getDb()
      return db.collection('products').find({_id : new mongodb.ObjectId(prodId) }).next()
          .then(product =>{
              console.log(product)
              return product

          })
          .catch(err=>{
              console.log(err)
          })
  }
}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;