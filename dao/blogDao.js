const e = require("express");
const timeUtil = require("./DBUtil");
const dbutil = require("./DBUtil");

function insertBlog(title,content, views,tags, ctime, utime, success) {
    const insertSql = "insert into blog (`title`, `content`, `views`,`tags`, `ctime`,`utime`) values(?,?,?,?,?,?)";
    const params = [title, content, views, tags, ctime, utime];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error,result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }
    } )
    connection.end();
}

function queryBlogByPage(offset, limit, success) {
    const sql = "select * from blog order by id desc limit ?,?;";
    const params = [offset, limit];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql,params, function(error, result) {
        if(error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

function queryBlogCount(success) {
    const sql = "select count(1) as count from blog;"
    const connection = dbutil.createConnection();
    connection.query(sql,function(error, result) {
        if(error) {
            console.log(error);
        }else {
            success(result);
        }
    })
    connection.end();
}

function  queryBlogById(id, success) {
    const sql = "select * from blog where id = ?;";
    const params = [id];
    const connection = dbutil.createConnection();
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
        }else {
            success(result);
        }
    })
    connection.end();
}

function getBlogByPage(offset, limit, success) {
    const sql = "select * from blog order by id desc limit ?,?;"
    const params = [offset, limit];
    const connection = dbutil.createConnection();
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
        }else {
            success(result);
        }
    })
    connection.end();
}
function queryAllBlog(success) {
    const sql = "select id, title, views, ctime, tags from blog order by ctime desc";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, function(error, result) {
        if(error) {
            console.log(error);
        }else {
            success(result);
        }
    })
    connection.end();
}

function addViews(id, success) {
    const sql = "update blog set views = views + 1 where id = ?;";
    const params = [id];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql,params, function(error, result) {
        if(error) {
            console.log(error);
        }else{
            success(result);
        }
    })
    connection.end();

}

function queryHotBlog(success) {
    const sql = "select * from blog order by views desc limit 8;";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, function(error, result) {
        if(error) {
            console.log(error);
        }else {
            success(result);
        }
    })
    connection.end();
}
function queryblogByTag( offset, limit, tag, success) {
    const sql = "select * from blog where tags = ? order by id desc limit ?,?;";
    const params = [tag,offset, limit];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
        }else {
            success(result);
        }
    })
    connection.end();
}

function queryBlogByTagCount(tag, success) {
    const sql = "select count(1) as count from blog where tags = ?;"
    const params = [tag];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
        }else {
            success(result);
        }
    });
    connection.end();
}

function queryBlogBySearch(search,offset, limit, success) {
    const sql = "select * from blog where title like concat(concat('%', ?), '%') or tags like concat(concat('%', ?), '%') limit ?, ?;";
    const params = [search, search,offset, limit];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.getBlogByPage = getBlogByPage;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
module.exports.queryblogByTag = queryblogByTag;
module.exports.queryBlogByTagCount = queryBlogByTagCount;
module.exports.queryBlogBySearch = queryBlogBySearch;