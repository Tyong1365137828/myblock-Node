const { request } = require('express');
/**
 * 管理员中间件
 */
const Admin = require('../model/admin');

/**
 * 文章类目中间件，即导航条
 */
module.exports = {


    /**
     * 通过session验证是否登录了管理员
     */
    allowAdmin: (request , response , next) => {
        let admin = request.session.adm;    //把session的adm赋值给admin

        if(admin) {//存在admin
            request.adm = admin;//把admin赋值到request并命名为adm
            next();
        } else {    //否则，即不存在admin
            response.redirect('/a_pre/login');  //重定向至管理员登录页面
        }
    },
    
    /**
     * 管理员登录
     */
    loginAdmin: (request , response , next) => {
        let {account , password} = request.body;

        Admin.getAdminByIdAndPwd(account , password).then(results => {
            request.admin = results;    //把results存放至request中并命名为admin
            next();
        }).catch( error => {
            next(error);
        })
    },


    /**
     * 通过管理员account获取管理员信息
     */
    getAdminByAcc: (request , response , next) => {
        let {account} = request.query;

        Admin.getAdminByAcc(account).then(results => {
            request.adm_info = results;    //把results存放至request中并命名为admin
            next();
        }).catch( error => {
            next(error);
        })
    },


    /**
     * 更新管理员账户
     */
    updateAdmin: (request , response , next) => {
        let { account , password , weblog } = request.body;

        let admin = {
            a: account,
            p: password,
            w: request.uploadUrl ? request.uploadUrl : weblog
        }

        Admin.updateAdmin(admin).then(results => {
            request.affectR = results;    //把results存放至request中并命名为admin
            next();
        }).catch( error => {
            next(error);
        })
    },






}