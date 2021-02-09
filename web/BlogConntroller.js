const app = require("../express");
const blogDao = require('../dao/blogDao');
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil');
const tagDao = require("../dao/tagDao");
const TagBlogMappingDao = require("../dao/TagBlogMappingDao");
const url = require("url");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
const jsonParser = bodyParser.json();


app.post("/addBlog", jsonParser, function (request, response) {
    blogDao.insertBlog(request.body.title, decodeURI(request.body.content), 0, request.body.tags, timeUtil.getNow(), timeUtil.getNow(), function (blogResult) {
        let tags = request.body.tags.split(',');
        for (let i = 0; i < tags.length; i++) {
            tagDao.queryTag(tags[i], function (tagResult) {
                if (tagResult.length > 0) { //有这个标签
                    TagBlogMappingDao.insetTagBlogMapping(tagResult[0].id, blogResult.insertId, timeUtil.getNow(), timeUtil.getNow(), function (result) {});
                } else {
                    tagDao.insetTag(tags[i], timeUtil.getNow(), timeUtil.getNow(), function (newTagResult) {
                        TagBlogMappingDao.insetTagBlogMapping(newTagResult.insertId, blogResult.insertId, timeUtil.getNow(), timeUtil.getNow(), function (result) {})
                    })
                }
            });
            response.writeHead(200);
            response.end(JSON.stringify({
                status: 1,
                msg: "ok"
            }));
        }
    });
});

app.get("/getBlogByPage", function (request, response) {
    const params = url.parse(request.url, true).query;
    const offset = params.offset;
    const limit = params.limit;
    blogDao.queryBlogByPage(parseInt(offset), parseInt(limit), function (result) {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/<\/[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/&nbsp;/g, "");
            result[i].content = result[i].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
            result[i].ctime = timeUtil.timeFormat(result[i].ctime);
            if (result[i].content.length > 300) {
                result[i].content = result[i].content.substr(0,300);
            }
        }
        response.writeHead(200);
        response.end(JSON.stringify(result));
    })
})

app.get("/getTotalBlogCount", function (request, response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.end(JSON.stringify(result));
    })
})

app.get("/getArticleDetail", function(request, response) {
    const params = url.parse(request.url, true).query;
    if(!params.id) {
        response.writeHead(400);
        response.end("must be have param id");
        return;
    }
    blogDao.queryBlogById(parseInt(params.id), function(result) {
        result[0].ctime = timeUtil.timeFormat(result[0].ctime);
        response.writeHead(200);
        response.end(JSON.stringify(result));
        blogDao.addViews(parseInt(params.id),function(result){})
    })
})
app.get("/getAllBlogMsg",function(request, response) {
  blogDao.queryAllBlog(function(result) {
    response.writeHead(200);
    response.end(JSON.stringify(result));
  })
})

app.get("/getHotArticle", function(request, response) {
    blogDao.queryHotBlog(function(result) {
        
        response.writeHead(200);
        response.end(JSON.stringify(result));
    })
})

app.get("/getBlogByTag", function(request, response) {
    const params = url.parse(request.url, true).query;
    blogDao.queryblogByTag(parseInt(params.offset), parseInt(params.limit), params.tag, function(result) {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/<\/[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/&nbsp;/g, "");
            result[i].content = result[i].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
            result[i].ctime = timeUtil.timeFormat(result[i].ctime);
            if (result[i].content.length > 300) {
                result[i].content = result[i].content.substr(0,300);
            }
        }
        response.writeHead(200);
        response.end(JSON.stringify(result));
    })
})
app.get("/getBlogByTagCount", function(request, response) {
    const params = url.parse(request.url, true).query;
    blogDao.queryBlogByTagCount(params.tag, function(result) {
        response.writeHead(200);
        response.end(JSON.stringify(result));
    })
})

app.get("/search",function(request, response) {
    const params = url.parse(request.url,true).query;
    const offset = params.offset ? params.offset : 0;
    const limit = params.limit ? params.limit : 5;
    if(!params.searchContent) {
        response.writeHead(400);
        response.end("must have be search");
        return;
    }
    blogDao.queryBlogBySearch(params.searchContent,parseInt(offset), parseInt(limit),function(result) {
        const count = result.length;
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/<\/[a-zA-Z]+>/g, "");
            result[i].content = result[i].content.replace(/&nbsp;/g, "");
            result[i].content = result[i].content.replace(/<img src="data:image\/jpeg;[\w\W]+>/g, "");
            result[i].ctime = timeUtil.timeFormat(result[i].ctime);
            if (result[i].content.length > 300) {
                result[i].content = result[i].content.substr(0,300);
            }
        }
        response.writeHead(200);
        response.end(JSON.stringify({count: count, list: result}))
    })
    
})

