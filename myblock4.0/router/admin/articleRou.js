/**
 * 管理员后台文章管理页面
 */
const express = require('express');

//加载中间件
const articleMid = require('../../middleware/articleMid');
const categoryMid = require('../../middleware/categoryMid');

const articleApp = express();


articleApp.get('/' , articleMid.RecomCount  , (request , response , next) => { //先获取总记录条数，以计算下面的必要参数
    
    let { rec_count } = request;

    let size = 5;   //每页显示5条

    request.page = {};  //创建一个空对象page
    request.page.count = rec_count.count;   //总记录数
    request.page.total = Math.ceil(request.page.count / size); //页数,通过取天花板整数得到
    request.page.index = request.query.i ? request.query.i : 1;   //当前页面参数,通过url传入,如果有这个参数，就取，没有则为1
    request.page.index = request.page.index > request.page.total ? request.page.total : request.page.index    //当前页面,如果这个参数大于页面页数,就取页面页数;否则，就取参数
    request.page.index = request.page.index < 1 ? 1 : request.page.index    //当前页面,如果这个参数小于1，则取1;否则，就取当前参数

    response.start = (request.page.index - 1) * size;   //获取从哪个记录条数开始，(当前页-1)*size
    response.size = size;   //获取查询几条记录，即每页记录数

   next();

} , [ articleMid.getRecomPage , categoryMid.getNav ] , ( request , response ) => {   //这时起始记录数，每页记录数都已经有了，再调用getRecomPage方法即可
                        //取到上面的page
    let { adm , pageRecom , page , navigations } = request;

    let { category_id , hot } = request.query;  //获取筛选的条件词，用于将此赋给前台进行特定的渲染

    page.list = pageRecom;

    response.render('admin/article/index' , { a: adm , pg: page , navs: navigations , cid: category_id , h: hot })
} )


//修改文章热门与否，异步请求
articleApp.get('/setHot' , articleMid.updateHot , (request , response) => {
    if (request.affectR > 0) {  //从中间件传来的受影响行参数大于0，即修改成功
        response.json({ statusCode: 1 , msg: '设置成功' })
    } else {    //即从中间件传来的受影响行参数小于0，修改失败
        response.json({ statusCode: 0 , msg: '设置失败！！！' })
    }
})

//点击添加文章，弹出添加页面
articleApp.get('/add' , [categoryMid.getNav] , (request , response) => {

    let {adm} = request;

    let { navigations } = request ; 

    response.render('admin/article/add' , { a: adm , navs: navigations , statusCode: '' });
} )


 //ckeditor上传文章内的图片
articleApp.post('/ckeditor' , (request , response) => {
    if(request.uploadUrl) { //存在，即上传成功
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

//添加文章操作路由
articleApp.post('/add' , [articleMid.addArticle , categoryMid.getNav] , (request , response) => {

    let {adm} = request;

    let {msgObj} = request;

    let { navigations } = request ; 

    if(request.add_id) {    //在request中存在add_id，则添加文章成功
        response.render('admin/article/add' , { a: adm , navs: navigations , o: msgObj , statusCode: 1 } )
    } else {    //否则，即提交失败
        response.render('admin/article/add' , { a: adm , navs: navigations , o: msgObj , statusCode: 2 } )
    }
})


//删除文章操作的路由
articleApp.get('/del' , articleMid.deleteArticle , (request , response) => {
    if(request.affectR) {   //如果受影响行数存在，即删除成功
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



//编辑文章首页面
articleApp.get('/edit/:id' , [articleMid.getRecomById , categoryMid.getNav] , (request , response) => {
    let {adm} = request;

    let {Recom_Details} = request;

    let {navigations} = request;

    response.render('admin/article/edit' , { a: adm , ar: Recom_Details , navs: navigations })
})


//编辑文章首页面
articleApp.post('/edit' , [articleMid.editArticle] , (request , response) => {
    let {adm} = request;

    let {Recom_Details} = request;

    let {navigations} = request;

    if(request.affectR > 0) {   //如果受影响行数存在，即修改成功
        // response.json({
        //     statusCode: 1,
        //     msg: '删除文章成功！！！'
        // })
        response.render('admin/alert' , {code: true , title: '修改成功' , message: '文本修改成功' , url: '/admin/article/' })
    } else {    //否则，即删除失败
        response.render('admin/alert' , {code: true , title: '修改失败' , message: '文本修改失败' , url: '/admin/article/edit'+request.body.id })
    }

    // response.render('admin/article/edit' , { a: adm , ar: Recom_Details , navs: navigations })
})





module.exports = articleApp
