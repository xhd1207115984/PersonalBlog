const everyDay = new Vue({
    el: "#every_day",
    data() {
        return {
            content: {
                title: "",
                eassay: "",
                author: ""
            },
        }
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created: function() {
        axios({
            url: "/queryEveryDay",
            method: "get",
        }).then(resp => {
            const data = resp.data[0];
            this.content.title = data.title;
            this.content.eassay = data.content;
            this.content.author = "—" + data.author;
        }).catch((resp) => {
            console.log("请求失败！");
        })
    }
});

const articleList = new Vue({
    el: "#article_list",
    data() {
        return {
            List: [],
            search:""
        }
    },
    computed: {
        jumpTo: function() {
            return function(id) {
                location.href = "/articleDetail.html?id=" +id;
            }
        }
    },
    created: function() {
        const params = location.search.split("?")[1].split("=")[1];
        console.log(params);
        axios({
            url: "/search?searchContent=" + params + "&offset=0&limit=5",
            method: "get"
        }).then((resp) => {
            articleList.search = params;
            articleList.List = resp.data.list;
        })
    }   

})
const pageTools = new Vue({
    el: "#pageTools",
    data() {
        return {
                total: 0,
                nowPage: 1,
                limit: 5,
                pageList: []
            }
    },
    methods: {
        refresh: ()=> {
            const totalPage = Math.floor((pageTools.total + pageTools.limit -1) / pageTools.limit);
            pageTools.pageList = [];
            pageTools.pageList.push({text: "首页", pageNum: 1});
            if(pageTools.nowPage - 2 > 0) {
                pageTools.pageList.push({ text: pageTools.nowPage - 2, pageNum: pageTools.nowPage -2})
            }
            if(pageTools.nowPage - 1 > 0) {
                pageTools.pageList.push({ text: pageTools.nowPage - 1, pageNum: pageTools.nowPage - 1 })
            }
            pageTools.pageList.push({ text: pageTools.nowPage, pageNum: pageTools.nowPage})
            if(pageTools.nowPage + 1 <= totalPage) {
                pageTools.pageList.push({ text: pageTools.nowPage + 1, pageNum: pageTools.nowPage + 1 })
            }
            if(pageTools.nowPage + 2 <= totalPage) {
                pageTools.pageList.push({text: pageTools.nowPage +2, pageNum: pageTools.nowPage + 2})
            }
            pageTools.pageList.push({text: "尾页", pageNum: totalPage});
        }   
    },
    computed: {
        changePage: function() {
            return function(pageNum) {
                console.log(pageNum);
                pageTools.nowPage = pageNum;
                this.refresh();
                axios({
                    url: "/search?searchContent="+ articleList.search + "&offset=" +(pageNum -1) * pageTools.limit + "&limit=" + pageTools.limit,
                    method: "get"
                }).then((resp) => {
                    articleList.List = resp.data.list;
                })
            }
        }
    },
    created: ()=> {
        axios({
            url: "/getTotalBlogCount",
            method: "get"
        }).then(resp => {
            pageTools.total = resp.data[0].count;
            pageTools.refresh();
        })
    }
})