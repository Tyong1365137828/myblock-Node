/**
 * 首页相关的路由
 */

const express = require('express');

//加载中间件
const article = require('../middleware/articleMid');
const category = require('../middleware/categoryMid');
const userMid = require('../middleware/userMid');

const indexApp = express();//首页子应用

//加载首页页面
indexApp.get('/',[article.getHostRecom,article.getNewRecom,category.getNav , userMid.getUserBySession],(request,response)=>{
    // response.render('index',{hots: request.hotsRecom , news: request.newRecom});

    let {hotsRecom,newRecom,navigations , suser} = request;
    // request.session.userfile = suer;    //用来创建用户文件的session
    response.render('index',{hots: hotsRecom , news: newRecom , navs: navigations , user: suser});//渲染名字叫index的html文件
    // console.log('hosts:'+hotsRecom);
    // console.log('news:'+newRecom);
})



module.exports = indexApp