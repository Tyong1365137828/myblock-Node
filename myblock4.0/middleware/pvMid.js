/**
 * 点击量中间件
 */
const Pv = require('../model/pv');

module.exports = {

    //点击总量
    hitsTotal: (request , response , next) => {
        Pv.getHitsTotal().then(results => {   //获取5条热门推荐且获取成功
            request.h_total = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },


    //获取全部记录用于渲染到admin的图
    allData: (request , response , next) => {
        Pv.getData().then(results => {   
            request.pv_data = results;    
            next();
        }).catch(error => {
            next(error);
        })
    }



}