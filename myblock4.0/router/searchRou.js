/**
 * 处理查询子应用模块
 */
const express = require('express');
const article = require('../middleware/articleMid');
const category = require('../middleware/categoryMid');
const userMid = require('../middleware/userMid');

searchApp = express();//创建子应用

//加载serarch首页面
searchApp.get('/',[article.getRecomsByKeyword , category.getNav , userMid.getUserBySession] , (request , response) => {
    let { Recoms_Search,navigations , suer } = request;

    response.render('search' , { search_res: Recoms_Search , navs: navigations , user: suer , kw: request.query.keyword })
})

module.exports = searchApp;