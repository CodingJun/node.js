# 开发环境
```
node: v8.9.0
npm: 5.5.1
系统：window7
```

# 爬取目标
```
目标爬取网站： http://www.mianfei.net/  //一个淘宝客网站

爬去的连接: http://www.mianfei.net/?r=q&p=页数

注:项目分析前（可能你看到的时候数据已不准确,本人最后爬虫时间为2017年12月6日）

每页有240条商品 一共239页。
240 * 9 = 57360, 一共57360商品

主要抓取：
1. 图片链接
2. 商品标题
3. 商品链接
4. 商品价格

```

# 技术
```
axios  发送HTTP请求
主要还是用到cheerio 基本跟 jQuery 语法相似。
Promise 和 Async 每次存储完毕才继续进行下一页爬取。
mongoose 存储MongoDB数据
```

# 安装依赖 npm npm install --save

# 启动 node app.js
```
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
正在爬取第1页...
连接MongoDB成功
成功存储第1页
正在爬取第2页,请耐心稍等...
成功存储第2页
正在爬取第3页,请耐心稍等...
成功存储第3页
....
爬取数据完成!
```