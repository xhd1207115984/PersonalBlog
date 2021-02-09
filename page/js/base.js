const tagMap = new Vue({
    el: "#tagMap",
    data: {
        tags: [],
    },
    computed: {
        randomColor: () => {
            return () => {
                const red = Math.random() * 255;
                const green = Math.random() * 255;
                const blue = Math.random() * 255;
                return `rgb(${red},${green},${blue})`
            }
        },
        randomSize: () => {
            return () => {
                const size = (Math.random() * 20 + 12) + 'px';
                return size
            }
        }
    },
    created: function () {
        axios({
            url: "/getTagsCloud",
            method: "get"
        }).then(function (resp) {
            let result = []
            for (let i = 0; i < resp.data.length; i++) {
                result.push({
                    name: resp.data[i].tag,
                    url: "/tagBlog.html?tag=" + resp.data[i].tag
                })
            }
            tagMap.tags = result;
        })
    },

})

const hotArticle = new Vue({
    el: "#hotArticle",
    data() {
        return {
            titleList: []
        }
    },
    created: function () {
        axios({
            url: "/getHotArticle",
            method: "get"
        }).then(resp => {
            const result = [];
            for (let i = 0; i < resp.data.length; i++) {
                result.push({
                    title: resp.data[i].title,
                    url: "/articleDetail.html?id=" + resp.data[i].id,
                })
            }
            hotArticle.titleList = result;

        })
    }
})

const newCommit = new Vue({
    el: "#newCommit",
    data() {
        return {
            commitList: []
        }
    },
    created: function () {
        axios({
            url: "/getNewComment",
            method: "get"
        }).then(resp => {
            const result = [];
            for (let i = 0; i < resp.data.length; i++) {
                result.push({
                    name: resp.data[i].user_name,
                    data: resp.data[i].comments,
                    time: resp.data[i].ctime
                })
            }
            newCommit.commitList = result;
        })
    }
})

const search = new Vue({
    el: "#search",
    data() {
        return {
            searchContent: "",
        }
    },
    methods: {
        sendSearch: function () {
            axios({
                url: "/search?searchContent=" + this.searchContent,
                method: "get"
            }).then(function (resp) {
                console.log(resp);
                if (resp.data.count !== 0) {
                    location.href = "/search.html?searchContent=" + search.searchContent;
                    search.searchContent = "";
                } else {
                    alert("搜索内容不存在");
                    search.searchContent = "";
                }
            })
        }
    }
})

const toTop = new Vue({
    el: '#toTop',
    data() {
        return {
            scroll: '',
        }
    },
    computed:{
        jump() {
            if(this.scroll > 200) {
                return true;
            }else {
                return false
            }
        },
        show() {
            if(this.scroll > 150) {
                return true;
            }else{
                return false;
            }
        }
    },
    methods: {
        menu() {
            this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        },
        up() {
            document.documentElement.scrollTop = 0;
        }
    },
    mounted() {
        window.addEventListener("scroll",this.menu);
    },
    destroyed() {
        window.removeEventListener('scroll', this.menu); // 销毁监听
    }
    
})

const side = new Vue({
    el: "#side",
    data: {
        select: false,
    },
    methods: {
        change() {
           this.select = true;
        }
    },
    mounted() {
        window.addEventListener("click",event =>{
            const e = event || window.event;
            if(this.$el &&!this.$el.contains(e.target)) {
                this.select = false;
            }
            
        });
    },
    destroyed() {
        window.removeEventListener("click",event =>{
            const e = event || window.event;
            if(this.$el &&!this.$el.contains(e.target)) {
                this.select = false;
            }
            
        });
    }
})