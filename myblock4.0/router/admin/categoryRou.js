/**
 * 管理员后台栏目管理页面
 */
const express = require('express');

//加载中间件
const categoryMid = require('../../middleware/categoryMid');


const categoryApp = express();

//类目管理首页
categoryApp.get('/' , categoryMid.getNav , (request , response) => {

    let { adm } = request;
    let{ navigations } = request;

    response.render('admin/category/index' , { a: adm , navs: navigations })
})


//添加类目
categoryApp.post('/add' , categoryMid.addNav , (request , response) => {

    if(request.add_navId) { //如果request.add_navId存在，即添加栏目成功
        response.json({
            statusCode: 1,
            msg: '添加栏目成功！！！'
        })
    } else {
        response.json({
            statusCode: 0,
            msg: '添加栏目失败！！！'
        })
    }
})


//删除类目
categoryApp.get('/del' , categoryMid.delNav , (request , response) => {

    if(request.affectR > 0) { //如果request.affectR存在，即删除栏目成功
        response.json({
            statusCode: 1,
            msg: '添加栏目成功！！！'
        })
    } else {
        response.json({
            statusCode: 0,
            msg: '添加栏目失败！！！'
        })
    }
})


//修改类目名称
categoryApp.post('/updateName' , categoryMid.upDateName , (request , response) => {
    if(request.affectR > 0) { //如果request.affectR存在，即删除栏目成功
        response.json({
            statusCode: 1,
            msg: '修改栏目名称成功！！！'
        })
    } else {
        response.json({
            statusCode: 0,
            msg: '修改栏目名称失败！！！'
        })
    }
})
//修改类目索引
categoryApp.post('/updateIndex' , categoryMid.upDateIndex , (request , response) => {
    if(request.affectR > 0) { //如果request.affectR存在，即删除栏目成功
        response.json({
            statusCode: 1,
            msg: '修改栏目索引成功！！！'
        })
    } else {
        response.json({
            statusCode: 0,
            msg: '修改栏目索引失败！！！'
        })
    }
})


module.exports = categoryApp