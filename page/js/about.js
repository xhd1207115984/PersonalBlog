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
            }
            let blogId = -1;
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
        axios({
            url: "/getComment?id=-1",
            method: "get"
        }).then(function(resp){
            blogComment.commentList = resp.data;
            console.log(resp.data);
            blogComment.total = resp.data.length;
            // location.href = "#addComment";
        })
        axios({
            url: "/getRandomCode",
            method: "get"
        }).then(function(resp) {
            blogComment.randomCode = resp.data.text;
            blogComment.randomSvg = resp.data.data;
        })
    }
})