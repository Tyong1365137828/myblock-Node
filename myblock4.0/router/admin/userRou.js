/**
 * 管理员后台管理用户路由
 */
const express = require('express');

//加载中间件
const userMid = require('../../middleware/userMid');


const userApp = express();


//管理用户首页面
userApp.get('/' , userMid.userCount , (request , response , next) => {

    let page = {    //页对象
        index: request.query.i ? request.query.i : 1,   //当前页
        count: request.userCount.count,   //总记录数从userMid.userCount方法获取
        size: 3,    //每页10条记录

    }
    page.total = Math.ceil(page.count / page.size); //总页码数,通过取天花板整数得到
    page.index = page.index > page.total ? request.page.total : page.index    //当前页面,如果这个参数大于页面页数,就取页面页数;否则，就取参数
    page.index = page.index < 1 ? 1 : page.index    //当前页面,如果这个参数小于1，则取1;否则，就取当前参数

    request.page = page ;   //把上面的page放到request中并命名为page
    next();
} , userMid.userPage , (request , response) => {
    let { page } = request
    let { usersPage } = request

    page.list = usersPage;

    response.render('admin/user/index' , { a: request.adm , pg: page })
})

//锁定用户
userApp.get('/setLock' , userMid.updateLock , (request , response) => {
    if (request.affectR > 0) {  //从中间件传来的受影响行参数大于0，即修改成功
        response.json({ statusCode: 1 , msg: '设置成功' })
    } else {    //即从中间件传来的受影响行参数小于0，修改失败
        response.json({ statusCode: 0 , msg: '设置失败' })
    }
})

//删除用户
userApp.get('/del' , userMid.deleteUser , (request , response) => {
    if(request.affectR) {   //如果受影响行数存在，即删除成功
        response.json({
            statusCode: 1,
            msg: '删除用户成功！！！'
        })
    } else {    //否则，即删除失败
        response.json({
            statusCode: 0,
            msg: '删除用户失败！！！'
        })
    }
})

module.exports = userApp;