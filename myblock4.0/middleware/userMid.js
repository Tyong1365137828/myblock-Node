const User = require('../model/user');

const rimraf = require('rimraf');   //用于删除文件/文件夹的模板

const ArticleM = require('../model/article');
const Article = require('../model/article');

/**
 * 文章类目中间件，即导航条
 */
module.exports = {

    /**
     * 用户登录中间件
     */
    login: (request,response,next) => {
        let {username , password} = request.body //表单post请求的参数获取方式
        User.getUserByUnameAndPwd(username , password).then(results => {   //登录成功
            request.user = results; //把查询的结果放到request中并命名为user
            request.usernameL = username;   //<后缀L>，返回写入日志文件的信息
            next();
        }).catch(error => {
            next(error);
        })
    },


    /**
     * 用户账号验证
     */
    verUsername: (request,response,next) => {
        let {username} = request.query //表单post请求的参数获取方式
        User.getUserByUsername(username).then(results => {   
            request.ver_user = results; //把查询的结果放到request中并命名为ver_user
            next();
        }).catch(error => {
            next(error);
        })
    },

    /**
     * 用户注册中间件
     */
    register: (request,response,next) => {
        let {username , password} = request.body ;

        let reg_obj = {
            username: username,
            password: password,
            lock: 2
        }

        request.user = reg_obj;

        User.setUser(reg_obj).then(results => {
            request.add_uid = results;
            request.usernameL = username;   //返回这个后缀为L的username，用于记录日志
            next();
        }).catch(error => {
            next(error);
        })

    },


    /**
     * 更新用户账户
     */
    updateUser: (request , response , next) => {
        let { username , password , name , email , sex , tel , thumbnail , id } = request.body;

        let user = {
            p: password,
            n: name,
            e: email,
            s: sex,
            t: tel,
            h: request.uploadUrl ? request.uploadUrl : thumbnail,
            i: id
        }

        console.log('password:'+user.p+';name='+user.n+';email='+user.e+';sex='+user.s+'tel='+user.t+';head='+user.h+'id='+user.i)

        User.updateUser(user).then(results => {
            request.affectR = results;
            next();
        }).catch( error => {
            next(error);
        })
    },


    /**
     * 用户退出
     */
   




    /**
     * 从session中读取用户
     */
    getUserBySession: (request,response,next) => {
        let session_u = request.session.u   ;//从request中读取名为u的session
        request.suser = session_u; //把查询的结果放到request中并命名为suser
        next();
    },


    /**
     * 通过session验证是否登录了用户
     * 为所有请求/user/.............. 的路径的request附上user(session的u对象)
     */
    allowUser: (request , response , next) => {
        let se_user = request.session.u;    //把session的adm赋值给admin

        if(se_user ) {//存在user
            request.user = se_user;//把se_user赋值到request并命名为user
            next();
        } else {    //否则，即不存在user
            response.redirect('/');  //重定向首页面
        }
    },


    /**
     * 通过用户id查询用户信息
     */
    findUserById: (request,response,next) => {
        let id = request.params.id;

        User.getUserById(id).then(results => {
            request.user = results; //把查询结果放到request中
            next();
        }).catch(error => {
            next(error);
        })
    },



    /**
     * 获取全部用户的记录条数
     */
    userCount: (request , response , next) => {
        User.getUserCount().then(results => {   
            request.userCount = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },



    //分页获取全部用户记录
    userPage: (request , response , next) => {
        let { index , size} = request.page;
        let start = (index-1)*size

        User.getUserPage(start , size).then(results => {   
            request.usersPage = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },


    //通过username删除用户中间件
    deleteUser: (request,response,next) => {

        let { username } =request.query

        User.deleteUserByUsername( username ).then(results => {   //删除用户成功
            // console.log('new results:'+results);
            request.affectR = results;    //把受影响的行数返回到request中

            var delDir = 'static/upload/user/'+username;    //定义要删除用户的目录，把删除的用户的目录也进行删除
            console.log('要删除的目录为：'+delDir);
            rimraf(delDir , function(error) {   //执行删除已经删除的用户目录操作
                if(error) console.log('删除目录失败：'+error.message);
            })

            request.usernameL = username;
            next();
        }).catch(error => {
            next(error);
        })
    },


    //设置用户锁
    updateLock: (request , response , next) => {
        let { id , lock} = request.query;

        // var sessionId = request.sessionID;
        // console.log('sessionId='+sessionId);

        User.updateLock(id , lock).then(results => {   //设置用户锁成功
            request.affectR = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },

    


    /**
     * 用户插入文章
     
    addArticle: (request,response,next) => {
        let { title , content , user_id , time , hot , category_id } =request.body  //从request获取表单请求来的post数据

        let artic = {   //把上面的数据赋值到artic对象的各个属性中
            title: title ,
            content: content ,
            user_id: user_id,
            time: time ,
            hot: hot ? 1 : 0 ,
            category_id: category_id ,
            thumbnail: request.uploadUrl ? request.uploadUrl : null //缩略图路径
        }

        //把这个对象放到request中，使前台用户操作后能给出相应的提示
        request.msgObj = artic;

        Article.setArticle(artic).then(results => {   //获取最新文章且获取成功
            // console.log('new results:'+results);
            request.add_id = results;    //把从model层的article模块中setArticle方法获取的插入文章的id给request，并命名为add_id
            next();
        }).catch(error => {
            next(error);
        })
    },*/


}