const axios = require('axios'); //请求模块
const cheerio = require('cheerio'); //网页解析 JQ抓取
const mongoose = require('mongoose'); //mongoose模块
const Shop = require('./model/shop'); //引入数据库模型
const uuidgo = require('uuid/v4'); //生成唯一ID

mongoose.Promise = global.Promise;

//修改数据库 连接地址  没有表他会自动创建 爬完后 复制shop模型到自己的node里面 修改引入即可
mongoose.connect('mongodb://127.0.0.1:27017/db_demo', { useMongoClient: true });

let connection = mongoose.connection;

const url = 'http://www.mianfei.net/?r=q&p='; //爬虫地址
let i = 0;   // 从第一页开始

connection.once('open', () => {
    console.log('连接MongoDB成功');
});

connection.on('error', () => {
    console.log('连接错误');
});
// 每次保存一页的数据。
let saveData = (docs, page) => {
    return new Promise((resolve, reject) => {
        Shop.insertMany(docs, (err) => {
            if( err ) {
                i--;
                reject(err);
                return console.log(`第${ page }页保存失败`);
            }
            console.log(`成功存储第${ page }页`);
            resolve();
        })
    })
};
let spider = () => {
    i++;
    let docs = [];
    console.log(`正在爬取第${ i }页，请耐心稍等...`);
    axios.get(`${ url }${ i }`)
    .then(async res => {
        if( res.status === 200 ) {
            let $ = cheerio.load(res.data);
            let jsCount = $('.js-count');
            if( jsCount.length === 0 ) return console.log('爬取数据完成!');
            jsCount.each(function (el) {
                let  productId=uuidgo();//生成唯一的ID
                let title = $(this).find('.title a').text();//爬去商品标题
                let img = $(this).find('img').data('original') ? $(this).find('img').data('original') : $(this).find('img').attr('src');//爬去商品图片
                let link = 'http://www.mianfei.net'+$(this).find('.img a').attr('href'); //爬取商品对应的连接
                let price = ($(this).find('.amount').text()); //爬取商品价格
                // 把数据保存到docs数组
                docs.push({
                    productId:productId,
                    productImage: img || '',
                    productName: title || '',
                    link: link || '',
                    salePrice: price|| 88,
                })
            });
            // 保存到MongoDB
            await saveData(docs, i);
            spider();
        }
    })
    .catch(e => {
        console.log('爬取出错或超时');
        console.log(e);
        spider();
    })
};
spider();














