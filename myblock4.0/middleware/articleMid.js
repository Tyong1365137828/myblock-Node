const article = require('../model/article');
const user = require('../model/user');
const tabs = require('../model/tabs');

/**
 * 文章中间件
 */
module.exports = {

    //获取热门文章
    getHostRecom: (request,response,next) => {
        article.getHostRecom(3).then(results => {   //获取5条热门推荐且获取成功
            request.hotsRecom = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },

    //获取最新文章
    getNewRecom: (request,response,next) => {
        article.getNewRecom().then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.newRecom = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },

    //获取指定类目下的文章
    getRecomByNavId: (request,response,next) => {
        let id = request.params.id;
        // console.log('id='+id);
        article.getRecomByNavId(id).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.Recoms = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },

    //获取指定关键词的文章
    getRecomsByKeyword: (request,response,next) => {
        let keyword = request.query.keyword;//因为搜索栏是表单get请求方式获取参数
        console.log('keyword='+keyword);
        article.getRecomsByKeyword(keyword).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.Recoms_Search = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },

    //通过指定文章的id获取文章详情
    getRecomById: (request,response,next) => {
        let id = request.params.id;
        let title = request.params.title;

        console.log('id='+id+'title='+title);
        article.getRecomById(id).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.Recom_Details = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            request.titleL = title;
            next();
        }).catch(error => {
            next(error);
        })
    },

    //获取指定文章的列表标签
    getTabsByArticleId: (request,response,next) => {
        let id = request.params.id;
        console.log('id='+id);
        tabs.getTabsByArticleId(id).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.tabs_Details = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },

    //获取当前文章的上一篇文章
    getPrev: (request,response,next) => {
        let id = request.params.id;
        console.log('id='+id);
        article.getPrevRecom(id).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.recom_Prev = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },

    //获取当前文章的下一篇文章
    getNext: (request,response,next) => {
        let id = request.params.id;
        console.log('id='+id);
        article.getNextRecom(id).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.recom_Next = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },
    // 

    //通过获取用户ID文章数
    CountArticleByUID: (request , response , next) => {
        let c_id = request.query.category_id;
        let hot = request.query.hot;
        let user_id = request.query.user_id

        console.log('count：'+c_id+';'+hot)

        article.getRecomCountByUID(c_id , hot , user_id).then(results => {   
            request.uA_count = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },


    //文章数
    RecomCount: (request , response , next) => {
        let c_id = request.query.category_id;
        let hot = request.query.hot;
        // let user_id = request.query.user_id

        console.log('count：'+c_id+';'+hot)

        article.getRecomCount(c_id , hot).then(results => {   
            request.rec_count = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },


    //通过UID分页获取文章
    getArtiPageByUID: (request,response,next) => {
        let start = response.start;
        let size = response.size;

        let c_id = request.query.category_id;
        let hot = request.query.hot;
        let user_id = request.query.user_id


        article.getAPageByUID( start , size , c_id , hot , user_id ).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.u_AP = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },


    //分页获取文章
    getRecomPage: (request,response,next) => {
        let start = response.start;
        let size = response.size;

        let c_id = request.query.category_id;
        let hot = request.query.hot;

        console.log('page：'+c_id+';'+hot)

        article.getRecomPage( start , size , c_id , hot ).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.pageRecom = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },


    //修改文章热门与否
    updateHot: (request,response,next) => {

        let { id , hot } =request.query

        article.setHotByid( id , hot ).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.affectR = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },



    //添加文章
    addArticle: (request,response,next) => {

        let { title , content , user_id , user_username , time , hot , category_id } =request.body  //从request获取表单请求来的post数据

        let artic = {   //把上面的数据赋值到artic对象的各个属性中
            title: title ,
            content: content ,
            user_id: user_id,
            user_username: user_username,
            time: time ,
            hot: hot ? 1 : 2 ,
            hits: 0,
            category_id: category_id ,
            thumbnail: request.uploadUrl ? request.uploadUrl : null //缩略图路径
        }

        console.log('title:'+title+';content:'+content+';user_id:'+user_id+'time:'+time+';hot:'+hot+';category_id:'+category_id);

        //把这个对象放到request中，使前台用户操作后能给出相应的提示
        request.msgObj = artic;

        article.setArticle(artic).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.add_id = results;    //把从model层的article模块中setArticle方法获取的插入文章的id给request，并命名为add_id
            request.articleL = title;   //去添加日志
            request.aidL = results;
            next();
        }).catch(error => {
            next(error);
        })
    },



    //删除文章
    deleteArticle: (request,response,next) => {

        let { id , title } =request.query

        article.deleteArticleById( id ).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.affectR = results;    //把受影响的行数返回到request中
            request.titleL = title;
            request.idL = id;
            next();
        }).catch(error => {
            next(error);
        })
    },



    //编辑文章
    editArticle: (request,response,next) => {

        let { title , content ,hot , category_id , thumbnail , id } =request.body;
        let artic = {
            title: title,
            content: content,
            hot: hot ? 1 : 2,   //hot存在就赋值为1，即热门，反之，赋值为2，即不热门
            category_id: category_id,
            thumbnail: request.uploadUrl ? request.uploadUrl : thumbnail ,//如果存在request.uploadUrl<代表最新值>，则取此；否则，取以前的值thumbnail
            id: id
        }

        request.titleL = title;
        request.cidL = category_id;
        request.idL = id;

        article.updateArticle( artic ).then(results => {   //更新文章成功
            // console.log('new results:'+results);
            request.affectR = results;    //取出request中的受影响行数
            
            next();
        }).catch(error => {
            next(error);
        })
    },


    //通过用户id获取文章
    findArticleByUID: (request,response,next) => {

        let { user_id } =request.query;

        article.getArticleByUID( user_id ).then(results => {   
            // console.log('new results:'+results);
            request.u_article = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },


}