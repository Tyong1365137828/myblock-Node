//用户账户管理页面
const express = require('express');

//获取中间件
const userMid = require('../../middleware/userMid')
const categoryMid = require('../../middleware/categoryMid')
const articleMid = require('../../middleware/articleMid')
const logsMid = require('../../middleware/logsMid')

const accountAPP = express();//登录子应用

//用户账户管理首页面
accountAPP.get('/:id' , userMid.findUserById , (request , response) => {
    let { user } = request;

    response.render('user/account' , { u: user })
} )



//用户修改账户信息updateUser
accountAPP.post('/' , userMid.updateUser , (request , response) => {

    let { user } =request ;

    if(request.affectR > 0) {   //如果受影响行数存在，即修改成功
        request.session.u = null; //把名为u的session设为空

        response.render('login' , { u: user , reg_u: '' , msg: '"'+user.username+'"用户,您修改账户信息成功,请重新登录' })
    } else {
        response.render('user/index' , { u: user })
    }

} )


module.exports = accountAPP;//挂载