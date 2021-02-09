const dbutil = require("./DBUtil");

function queryTag(tag, success) {
    const insertSql = "select * from tags where tag = ?";
    const params = [tag];
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

function insetTag(tag,ctime,utime, success) {
    const insertSql = "insert into tags(`tag`, `ctime`, `utime`) values(?, ?, ?)";
    const params = [tag,ctime, utime];
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

function queryAllTags(success) {
    const sql = "select * from tags;";
    const connection = dbutil.createConnection();
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
module.exports.queryAllTags = queryAllTags;
module.exports.queryTag = queryTag;
module.exports.insetTag = insetTag;