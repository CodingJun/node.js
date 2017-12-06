var mongoose = require('mongoose')
var schema = new mongoose.Schema({
    productId:String,
    productImage: String,        // 图片地址
    productName: String,      // 商品标题
    link: String,       // 商品链接
    salePrice: Number,      // 商品价格
    productNum:Number,
    checked:String,
    date: {             // 时间
        type: Date,
        default: Date.now
    },
    time: {             // 时间戳
        type: Number,
        default: Date.now
    },
})
module.exports = mongoose.model('Shops', schema);
//爬完后 引入这个数据模型即可