//用户管理文章子应用
const express = require('express');

//获取中间件
const userMid = require('../../middleware/userMid')
const categoryMid = require('../../middleware/categoryMid')
const articleMid = require('../../middleware/articleMid')
const logsMid = require('../../middleware/logsMid')

const articleAPP = express();//登录子应用



//分页业务显示本账号下的文章
articleAPP.get('/' , articleMid.CountArticleByUID , (request , response , next) => {
    console.log('我是Account下的文章');
    let {uA_count} = request;

    let size = 5;

    request.page = {};  //创建一个空对象page
    request.page.count = uA_count.count;   //总记录数
    request.page.total = Math.ceil(request.page.count / size); //页数,通过取天花板整数得到
    request.page.index = request.query.i ? request.query.i : 1;   //当前页面参数,通过url传入,如果有这个参数，就取，没有则为1
    request.page.index = request.page.index > request.page.total ? request.page.total : request.page.index    //当前页面,如果这个参数大于页面页数,就取页面页数;否则，就取参数
    request.page.index = request.page.index < 1 ? 1 : request.page.index    //当前页面,如果这个参数小于1，则取1;否则，就取当前参数

    response.start = (request.page.index - 1) * size;   //获取从哪个记录条数开始，(当前页-1)*size
    response.size = size;   //获取查询几条记录，即每页记录数

    next();
    
} , [ articleMid.getArtiPageByUID , categoryMid.getNav ] , ( request , response ) => {   //这时起始记录数，每页记录数都已经有了，再调用getRecomPage方法即可
    //取到上面的page
    let { user , u_AP , page , navigations } = request;

    let { category_id , hot } = request.query;  //获取筛选的条件词，用于将此赋给前台进行特定的渲染

    page.list = u_AP;

    response.render('user/article/index' , { u: user , pg: page , navs: navigations , cid: category_id , h: hot })
} )


/**
 * 用户后台点击自己的文章，查看文章详情的动作
 */
articleAPP.get('/show/:id' , [categoryMid.getNav , articleMid.getRecomById , articleMid.getTabsByArticleId , articleMid.getPrev , articleMid.getNext , userMid.getUserBySession] , (request , response) => {
    let { navigations , Recom_Details , tabs_Details , recom_Prev , recom_Next , suser } = request;//从request中取出数据
    response.render('user/article/show' , { navs: navigations , rec_detail: Recom_Details , tabs_det: tabs_Details , prev: recom_Prev , next: recom_Next , user: suser });
})


//删除文章操作的路由
articleAPP.get('/del' , articleMid.deleteArticle , (request , response , next) => {
    if(request.affectR) {   //如果受影响行数存在，即删除成功

        request.log = { //封装日志入rquest
            time: new Date(),
            user_username: request.user.username,
            handle: '删除文章<'+request.idL+'>《'+request.titleL+'》',
            ip: request.ip.split(':')[3]
        }
        logsMid.logsAdd(request , response , next);    //调用写入日志的中间件，发送写入日志request

        response.json({
            statusCode: 1,
            msg: '删除文章成功！！！'
        })
    } else {    //否则，即删除失败
        response.json({
            statusCode: 0,
            msg: '删除文章失败！！！'
        })
    }
})


 //article文章ckeditor上传文章内的图片
 articleAPP.post('/ckeditor' , (request , response , next) => {
    if(request.uploadUrl) { //存在，即上传成功

        request.log = { //封装日志入rquest
            time: new Date(),
            user_username: request.user.username,
            handle: '上传图片'+request.uploadUrl,
            ip: request.ip.split(':')[3]
        }
        logsMid.logsAdd(request , response , next);    //调用写入日志的中间件，发送写入日志request

        response.json({
            uploaded: true,
            url: request.uploadUrl
        })
    } else {
        response.json({
            uploaded: false,
            err: { message: '上传失败！！！'}
        })
    }
})



//用户点击添加文章，弹出添加页面
articleAPP.get('/add' , [categoryMid.userGetNav] , (request , response) => {
    let {user} = request;

    let { navigations } = request ; 

    response.render('user/article/add' , { u: user , navs: navigations , statusCode: '' });
} )


//用户添加文章操作路由
articleAPP.post('/add' , [articleMid.addArticle ,  categoryMid.userGetNav] , (request , response , next) => {
    let {user} = request;

    let {msgObj} = request;
    let { navigations } = request ; 

    if(request.add_id) {    //在request中存在add_id，则添加文章成功

        request.log = { //封装日志入rquest
            time: new Date(),
            user_username: user.username,
            handle: '添加文章【'+request.aidL+'】.《'+request.articleL+'》',
            ip: request.ip.split(':')[3]
        }
        logsMid.logsAdd(request , response , next);    //调用写入日志的中间件，发送写入日志request

        response.render('user/article/add' , { u: user , navs: navigations , o: msgObj , statusCode: 1 } )
    } else {    //否则，即提交失败

        response.render('user/article/add' , { u: user , navs: navigations , o: msgObj , statusCode: 2 } )
    }
} )



//用户编辑文章首页面
articleAPP.get('/edit/:id/:title' , [articleMid.getRecomById , categoryMid.userGetNav] , (request , response) => {
    let {user} = request;

    let {Recom_Details} = request;

    let {navigations} = request;

    response.render('user/article/edit' , { u: user , ar: Recom_Details , navs: navigations })
})


//编辑文章
articleAPP.post('/edit' , [articleMid.editArticle] , (request , response , next) => {
    let {user} = request;

    let {Recom_Details} = request;

    let {navigations} = request;

    if(request.affectR > 0) {   //如果受影响行数存在，即修改成功
        // response.json({
        //     statusCode: 1,
        //     msg: '删除文章成功！！！'
        // })

        request.log = { //封装日志入rquest
            time: new Date(),
            user_username: request.user.username,
            handle: '修改文章为<'+request.idL+'>【'+request.cidL+'】.《'+request.titleL+'》',
            ip: request.ip.split(':')[3]
        }
        logsMid.logsAdd(request , response , next);    //调用写入日志的中间件，发送写入日志request


        response.render('user/alert' , {code: true , title: '修改成功' , message: '文本修改成功' , url: '/user/article?user_id='+user.id })
    } else {    //否则，即编辑失败

        response.render('user/alert' , {code: true , title: '修改失败' , message: '文本修改失败' , url: '/user/article/edit'+request.body.id })
    }

    // response.render('admin/article/edit' , { a: adm , ar: Recom_Details , navs: navigations })
})


module.exports = articleAPP;//挂载