const express = require('express');

//获取中间件
const article = require('../middleware/articleMid');
const category = require('../middleware/categoryMid');
const userMid = require('../middleware/userMid');


const articleApp = express();

/**
 * 处理前台点击导航栏的动作
 */
articleApp.get('/recoms/:id',[article.getRecomByNavId , category.getNav , category.getNavById , userMid.getUserBySession],(request,response) => {
    let {Recoms , navigations , navigation , suser} = request;   //从中间件获取数据
    response.render('recoms' , { recs: Recoms , navs: navigations , nav: navigation , user: suser })   //把从中间件获取的数据重命名且渲染到list.html文件
})

/**
 * 首页位置处理点击文章，查看文章详情的动作
 */
articleApp.get('/:id' , [category.getNav , article.getRecomById , article.getTabsByArticleId , article.getPrev , article.getNext , userMid.getUserBySession] , (request , response) => {
    let { navigations , Recom_Details , tabs_Details , recom_Prev , recom_Next , suser } = request;//从request中取出数据
    response.render('article_details' , { navs: navigations , rec_detail: Recom_Details , tabs_det: tabs_Details , prev: recom_Prev , next: recom_Next , user: suser });
})

module.exports = articleApp;//挂载
