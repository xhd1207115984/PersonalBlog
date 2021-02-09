const articleDetail = new Vue({
    el: "#articleDetail",
    data() {
        return {
            content: ""
        }
    },
    created: function() {  //location.seach 返回当前URL的查询部分?之后的内容
        if(location.search.indexOf("?") >= 0) {
            const searchList = location.search.split("?")[1].split("&");
            for( let i = 0; i < searchList.length; i++) {
                if(searchList[i].split("=")[0] == "id") {
                    let id = searchList[i].split("=")[1];
                    console.log(id);
                    axios({
                        url: "/getArticleDetail?id="+ id,
                        method: "get" 
                    }).then(function(resp) {
                        console.log(resp.data[0]);
                        articleDetail.content = resp.data[0];
                    })
                }
            }

        }
    }
})

const blogComment = new Vue({
    el:"#blogComment",
    data: {
        imgList:[
            "./img/touxiang1.jpg",
            "./img/touxiang2.jpg",
            "./img/touxiang3.jpg",
            "./img/touxiang4.jpg",
            "./img/touxiang5.jpg",
        ],
        commentList: [],
        total:0,
        randomCode: "",
        randomSvg:null,
        name:'',
        email: "",
        comment: "",
        inputRandomCode: "",
        commentId: 0
    },
    methods: {
        changeCode: function() {
            axios({
                url: "getRandomCode",
                method: "get"
            }).then(function (resp) {
                blogComment.randomCode = resp.data.text;
                blogComment.randomSvg = resp.data.data;
            });
        },
        sendComment: function() {
            if(this.name == "" || this.email == "" || this.comment == "" || this.inputRandomCode == "") {
                alert("内容不能为空");
                return;
            }
            if(this.inputRandomCode.toLowerCase() != this.randomCode.toLowerCase()) {
                alert("验证码输入不正确");
                return;
            }
            let blogId = 0;
            if(location.search.indexOf("?") >=0) {
                const searchList = location.search.split("?")[1].split("&");
                for(let i = 0; i < searchList.length; i++) {
                    if(searchList[i].split("=")[0] == "id") {
                        const id = searchList[i].split("=")[1];
                        blogId = id;
                    }
                }
            }
            axios({
                url: "sendComment?blogId=" + blogId +"&commentId=" + this.commentId +"&content=" +this.comment + "&name=" + this.name + "&email=" + this.email,
                method: "get" 
            }).then(function(resp) {
                alert("留言成功");
                blogComment.name = "",
                blogComment.email = "",
                blogComment.inputRandomCode = "",
                blogComment.commentId = 0;
            })
        }
    },
    computed: {
        huifu: function() {
            return function(commentId) {
                blogComment.commentId = commentId; 
            }
        },
        randomImg: function() {
            return function(index) {
                let num = Math.floor(Math.random() * index);
                return this.imgList[num];
            }
        },
        
    },
    created: function() {
        if(location.search.indexOf("?") >=0) {
            const searchList = location.search.split("?")[1].split("&");
            for(let i = 0; i < searchList.length; i++) {
                if(searchList[i].split("=")[0] == "id") {
                    const id = searchList[i].split("=")[1];
                    axios({
                        url: "/getComment?id=" + id,
                        method: "get"
                    }).then(function(resp){
                        blogComment.commentList = resp.data;
                        blogComment.total = resp.data.length;
                        // location.href = "#addComment";
                    })
                }
            }

        }
        axios({
            url: "/getRandomCode",
            method: "get"
        }).then(function(resp) {
            blogComment.randomCode = resp.data.text;
            blogComment.randomSvg = resp.data.data;
        })
    }
})