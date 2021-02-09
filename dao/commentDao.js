const dbUtil = require("./DBUtil");


function insertComments(blogId, commentsId, content, name, email, ctime, utime, success) {
    const sql = "insert into comments(`blog_id`,`parent`,`user_name`,`comments`,`email`,`ctime`,`utime`) values(?,?,?,?,?,?,?)";
    const params = [blogId, commentsId, name,content, email, ctime, utime];
    const connection = dbUtil.createConnection();
    connection.query(sql, params, function(error, result) {
        if(error) {
            console.log(error);
        }else {
            success(result);
        }
    });
    connection.end();
}


function queryCommentsByBlogId(blogId, success) {
    const sql = "select * from comments where blog_id = ?";
    const params = [blogId];
    const connection = dbUtil.createConnection();
    connection.query(sql, params,function(error,result) {
        if(error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end()
}

function queryNewComment(success) {
    const sql = "select * from comments order by id desc limit 5;"
    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql,function(error, result) {
        if(error) {
            console.log(error);
        }else {
            success(result);
        }
    })
    connection.end();
}

module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.insertComments = insertComments;
module.exports.queryNewComment = queryNewComment;