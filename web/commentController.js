const app = require("../express");
const url = require("url");
const captcha = require("svg-captcha");
const timeUtil = require("../util/timeUtil");
const commentDao = require("../dao/commentDao");



app.get("/getComment", function(request, response) {
    const params = url.parse(request.url, true).query;
    if(!params.id) {
        response.writeHead(400);
        response.end("must be have id");
        return;
    }
    commentDao.queryCommentsByBlogId(params.id, function(result) {
        // console.log(result);
        const map = new Map();
        for(let i = 0; i < result.length; i++) {
            result[i].ctime= timeUtil.timeFormat(result[i].ctime);
            map.set(result[i].id, result[i].user_name);
            if(result[i].parent !=0) {
                result[i].user_name = result[i].user_name + "回复" + map.get(result[i].parent);  
            }
        }
        response.writeHead(200);
        response.end(JSON.stringify(result));
        return;
    })

})

app.get("/getRandomCode", function(request, response) {
    const img = captcha.create({fontSize:50, width:100, height:30});
    response.writeHead(200);
    response.end(JSON.stringify(img));
})

app.get("/sendComment", function(request, response) {
    const params = url.parse(request.url,true).query;
    console.log(params);
    commentDao.insertComments(parseInt(params.blogId),parseInt(params.commentId),params.content, params.name, params.email, timeUtil.getNow(),timeUtil.getNow(),function(result){
        response.writeHead(200);
        response.end();
    });

})

app.get("/getNewComment", function(request, response) {
    commentDao.queryNewComment(function(result) {
        for(let i = 0 ;i < result.length; i++) {
            result[i].ctime= timeUtil.timeFormat(result[i].ctime);
        }
        response.writeHead(200);
        response.end(JSON.stringify(result));
    })
})