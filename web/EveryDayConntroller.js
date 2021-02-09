const app = require("../express");
const url = require("url");
const everyDayDao = require("../dao/everyDayDao");
const timeUtil = require('../util/timeUtil');
// const everyDayDao = require('../dao/everyDayDao');
// const path = new Map();

// function editEveryDay(request, response) {  //每日一句插入数据库请求函数
//     request.on("data", function (data) {
//         const arr = decodeURIComponent(data).trim().split('&');
//         const title = arr[0].split('=')[1].split('+').join("\xa0");
//         const author = arr[1].split('=')[1];
//         const content = arr[2].split('=')[1];
//         console.log(title);
//         everyDayDao.insertEveryDay(content,title, author, timeUtil.getNow(),function() {
//             response.writeHead(200);
//             response.write(respUtil.writeResult('success', '添加成功', null));
//             response.end();
//         });
//     });
// }
// path.set("/editEveryDay", editEveryDay);

// //获取数据库中的每日一句函数
// function queryEveryDay(request, response) {
//    everyDayDao.queryEveryDay(function(result) {
//        response.writeHead(200);
//        response.write(respUtil.writeResult('success',"添加成功",result));
//        response.end();
//    })
// }
// path.set("/queryEveryDay", queryEveryDay);

// module.exports.path = path;
app.get("/insert_every_day", function (request, response) {
         const params = url.parse(request.url, true).query;
        everyDayDao.insertEveryDay(params.content , params.title, params.author, timeUtil.getNow(),function(result) {
            response.writeHead(200);
            response.end(JSON.stringify({status: 1, msg: "success"}));
        });
})

app.get("/queryEveryDay", function(request, response) {
    everyDayDao.queryEveryDay(function(result) {
        response.writeHead(200);
        response.end(JSON.stringify(result));
    })
})