#! /usr/bin/env node

console.log('This script populates some test items and categories to populated your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/item')
var Category = require('./models/category')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var categories = []

function itemCreate(name, weight_num, weight_unit, price, category, stock, cb) {
  itemDetail = {name:name, 
                weight_num: weight_num,
                weight_unit: weight_unit,
                price: price,
                category: category,
                stock: stock,
                image_filename: image_filename }
  
  var item = new Item(itemDetail);
       
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }  );
}

function categoryCreate(name, cb) {
  var category = new Category({ name: name });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function createCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate('Fruits & Vegetables', callback);
        },
        function(callback) {
          categoryCreate('Dairy & Eggs', callback);
        },
        function(callback) {
          categoryCreate('Bakery', callback);
        },
        function(callback) {
          categoryCreate('Meat & Seafood', callback);
        },
        function(callback) {
          categoryCreate('International Foods', callback);
        },
        ],
        // optional callback
        cb);
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate('Banana', 0.15, 'kg', 0.28, categories[0], 200, '', callback);
        },
        function(callback) {
          itemCreate('Brown Mushrooms', 8, 'oz', 1.97, categories[0], 60, '', callback);
        },
        function(callback) {
          itemCreate('Large Eggs', 12, 'count', 2.84, categories[1], 35, '', callback);
        },
        function(callback) {
          itemCreate('Almond Milk', 1.89, 'l', 4.17, categories[1], 30, '', callback);
        },
        function(callback) {
          itemCreate('100% Whole Wheat Bread', 675, 'g', 2.47, categories[2], 40, '', callback);
        },
        function(callback) {
          itemCreate('Chicken Thighs', 1.25, 'kg', 12.81, categories[3], 100, '', callback);
        },
        function(callback) {
          itemCreate('Dark Red Kidney Beans', 540, 'ml', 0.87, categories[4], 20, '', callback);
        }
        ],
        // optional callback
        cb);
}


async.series([
    createCategories,
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('ITEMS: '+items);       
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




