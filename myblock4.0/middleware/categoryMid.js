const category = require('../model/category');

/**
 * 文章类目中间件，即导航条
 */
module.exports = {

    //首页面和管理员获取导航条
    getNav: (request,response,next) => {
        category.getNav().then(results => {   
            request.navigations = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },

    //用户获取导航条
    userGetNav: (request,response,next) => {
        category.userGetNav().then(results => {   
            request.navigations = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },


    //通过类目id获取指定类目详情
    getNavById: (request,response,next) => {
        let id = request.params.id; //get方式获取id
        category.getNavById(id).then(results => {   
            request.navigation = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },


    //栏目总数
    NavCount: (request , response , next) => {
        category.getNavCount().then(results => {   
            request.nav_count = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },


    //添加栏目
    addNav: (request , response , next) => {
        let { name , index} = request.body;

        category.setNav(name , index).then(results => {   
            request.add_navId = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },


     //删除栏目
     delNav: (request , response , next) => {
        let { id } = request.query;

        category.delNav(id).then(results => {   
            request.affectR = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },


    //修改栏目名称
    upDateName: (request , response , next) => {
        let { id , name } = request.body;

        category.updateName(id , name).then(results => {   
            request.affectR = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },


    //修改栏目索引
    upDateIndex: (request , response , next) => {
        let { id , index } = request.body;

        category.updateIndex(id , index).then(results => {   
            request.affectR = results;    
            next();
        }).catch(error => {
            next(error);
        })
    }

}