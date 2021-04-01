/**
 * 管理员后台栏目管理页面
 */
const express = require('express');
const adminMid = require('../../middleware/adminMid');

//加载中间件


const accountApp = express();

//获取修改的页面
accountApp.get('/' , adminMid.getAdminByAcc , (request , response) => {
    let { adm_info } = request; //获取管理员信息
    response.render('admin/account/index' , { a: request.adm , a_i: adm_info , statusCode: '' })
})

//点击修改后的操作
accountApp.post('/' , [adminMid.updateAdmin , adminMid.getAdminByAcc] , (request , response) => {

    let { adm_info } = request; //获取管理员信息
    
    if(request.affectR > 0) {   //如果受影响行数存在，即修改成功

        request.session.adm = null; //把名为adm的session设为空

        response.render('admin/login/login' , { a: request.adm , msg: '管理员重设密码成功,为防止忘记请重新登录' , a_i: adm_info })
    } else {
        response.render('admin/account/index' , { a: request.adm , statusCode: '' , a_i: adm_info } )
    }


} )

module.exports = accountApp