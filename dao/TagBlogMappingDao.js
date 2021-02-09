const dbutil = require("./DBUtil");

function insetTagBlogMapping(tag_id, blog_id,ctime,utime,success) {
    const insertSql = "insert into tag_blog_mapping(`tag_id`, `blog_id`,`ctime`,`utime`) values(?, ?, ?, ?)";
    const params = [tag_id,blog_id,ctime, utime];
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


module.exports.insetTagBlogMapping = insetTagBlogMapping;