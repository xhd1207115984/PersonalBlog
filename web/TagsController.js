const app = require("../express");
const tagDao = require("../dao/tagDao");

app.get("/getTagsCloud",function(request, response) {
    tagDao.queryAllTags(function(result) {
        result.sort(function() {
            return 0.5 - Math.random();
        });
        response.writeHead(200);
        response.end(JSON.stringify(result));
    });
})