/**
 * 登录子应用
 */
const express = require('express');

//获取中间件
const userMid = require('../../middleware/userMid')
const logs = require('../../middleware/logsMid')

const userAPP = express();//登录子应用


/**
 * 用户点击去登录动作的处理     加载登录页
 */
userAPP.get('/login' , (request , response) => {
    response.render('login' , { reg_u: '' , msg: ''});//因为登录页面有msg登录失败提示信息渲染，但是首次点击它是未定义的，所以为了保证正常执行，可以先赋值为空
})


/**
 * 用户登录提交后的动作处理     判断是否登录成功
 */
userAPP.post('/login' , [userMid.login] , (request , response , next) => {
    let { user } = request;//从中间件userMid方法中获取user

    if(user) {   //如果user不为空，即登录成功

        if (user.lock == 2) {   //用户锁为2，即没有锁定允许登录
            //session存储(key = value)
            request.session.u = user;//存储session,     把user命名为u并放入request的session中，之后session会随着页面的下一次请求自动带走

            request.log = { //封装日志入rquest
                time: new Date(),
                user_username: request.usernameL,
                handle: '登录成功',
                ip: request.ip.split(':')[3]
            }
            logs.logsAdd(request , response , next);    //调用写入日志的中间件，发送写入日志request

            response.redirect('/')//登录成功重定向至首页面，其会带走上面名为u的session
        } else {    //即用户锁不为2，用户锁存在，不会允许用户登录

            request.log = { //封装日志入rquest
                time: new Date(),
                user_username: request.usernameL,
                handle: '登录失败',
                ip: request.ip.split(':')[3]
            }
            logs.logsAdd(request , response , next);    //调用写入日志的中间件，发送写入日志request

            response.render('login' , { reg_u: '' , msg: '拒绝登陆,原因:您已被封号！！！'})  //直接渲染登录页面，给出出错信息
        }
        
    } else {    //否则，即登录不成功

        request.log = { //封装日志入rquest
            time: new Date(),
            user_username: request.usernameL,
            handle: '登录失败',
            ip: request.ip.split(':')[3]
        }
        logs.logsAdd(request , response , next);    //调用写入日志的中间件，发送写入日志request

        response.render('login' , { reg_u: '' , msg: '登陆失败！！！你的用户名或密码有误！！！'})  //直接渲染登录页面，给出出错信息
    }
})


//用户点击注册进入注册页面
userAPP.get('/register' , (request , response) => {
    response.render('register' , { msg: '' });
})


//用户失去注册页面输入账号文本框焦点
userAPP.get('/register/ver_username' , userMid.verUsername , (request , response) => {
    let { ver_user } = request ;
    if(ver_user){//如果验证的用户名存在，即不能注册
        response.json({
            statusCode: 0,
            msg: '此账号存在,不可进行注册！！！'
        })
    } else {
        response.json({
            statusCode: 1,
            msg: '账号可以注册'
        })
    }
})


//用户进行注册操作
userAPP.post('/register' , userMid.register , (request , response , next) => {
    let {user} = request ;

    if(request.add_uid){

        request.log = { //封装日志入rquest
            time: new Date(),
            user_username: request.usernameL,
            handle: '注册成功',
            ip: request.ip.split(':')[3]
        }
        logs.logsAdd(request , response , next);    //调用写入日志的中间件，发送写入日志request

        response.render('login' , { reg_u: user , msg: '"'+user.username+'"用户,您已注册成功' })
    } else {

        request.log = { //封装日志入rquest
            time: new Date(),
            user_username: request.usernameL,
            handle: '注册失败',
            ip: request.ip.split(':')[3]
        }

        logs.logsAdd(request , response , next);    //调用写入日志的中间件，发送写入日志request
        response.json({
            statusCode: 0,
            msg: '注册失败！！！'
        })
    }
})



/**
 * 用户点击退出后的动作处理
 */
userAPP.get('/exit' , (request , response , next) => {

    request.log = { //封装日志入rquest
        time: new Date(),
        user_username: request.session.u.username,
        handle: '退出成功',
        ip: request.ip.split(':')[3]
    }
    logs.logsAdd(request , response , next);    //调用写入日志的中间件，发送写入日志request

    request.session.u = null; //把名为u的session设为空
    response.render('login' , { reg_u: '' , msg: '退出成功' })//跳到登录页面，并进行相应的渲染
})


module.exports = userAPP;//挂载
// module.exports = session_use;
