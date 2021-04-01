/**
 * logs日志中间件
 */
const Logs = require('../model/logs');

/**
 * 文章类目中间件，即导航条
 */
module.exports = {

    //管理员上次登录
    lastLogin: (request , response , next) => {
        let admacc = request.session.adm.account;
        Logs.getLastLogin(admacc).then(results => {   //获取5条热门推荐且获取成功
            request.log = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },


    //获取全部日志记录条数
    logsCount: (request , response , next) => {
        Logs.getLogsCount().then(results => {   //获取5条热门推荐且获取成功
            request.logsCount = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },


    //获取指定用户日志记录条数
    userLogsCount: (request , response , next) => {

        let uname = request.query.username;

        Logs.userGetLogsCount(uname).then(results => {
            request.userLogsCount = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },


    //分页获取全部日志记录
    logsAllPage: (request , response , next) => {
        let { index , size} = request.page;
        let start = (index-1)*size

        Logs.getLogsPage(start , size).then(results => {   //获取5条热门推荐且获取成功
            request.pageLogs = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },


    //用户日志分页
    userLogsPage: (request , response , next) => {
        let uname = request.query.username;
        let { index , size} = request.page;
        let start = (index-1)*size

        Logs.userGetLogsPage(start , size , uname).then(results => {   //获取5条热门推荐且获取成功
            request.userPageLogs = results;    //把从model层的article模块中getHostRecom方法获取的集合给request，并命名为hotsRecom
            next();
        }).catch(error => {
            next(error);
        })
    },



    //添加日志
    logsAdd: (request , response , next) => {
        Logs.setLog(request.log).then(results => {   
            request.affR = results;    
            next();
        }).catch(error => {
            next(error);
        })
    },



}