const blogs = new Vue({
    el: "#blogs",
    data() {
        return {
            blogList:[],
        }
    },
    computed: {
        jumpTo: function() {
            return function(id) {
                location.href = "/articleDetail.html?id=" + id;
            }
        }
    },
    created: function() {
        axios({
            url: "/getAllBlogMsg",
            methods: "get"
        }).then(function(resp) {
            blogs.blogList = resp.data;
        })
    }
})