/**
 * 处理log的数据模型 
 */
module.exports = class Logs extends require('./model') {
    
    /**
     * 获取最后一次登录的信息
     * @param {String} username 用户名
     */
    static getLastLogin(username) {
        return new Promise((reslove,reject) => {
            let sql ="SELECT * FROM logs WHERE handle='登录成功' AND user_username = ? ORDER BY `time` DESC LIMIT 1";

            console.log('获取最后一次登录的信息sql='+sql);
            console.log('获取最后一次登录的信息username='+username+';-----------------------');

            this.dbQuery(sql,username).then(results =>{
                reslove(results[0]);//因为只获取1条数据，所以要加上此
            }).catch(error => {
                console.log(`获取最后一次登录的信息失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 获取全部日志记录数
     */
    static getLogsCount() {
        return new Promise((reslove,reject) => {
            let sql ="SELECT COUNT(1) as count FROM `logs` ";

            console.log('获取全部日志记录数sql='+sql);

            this.dbQuery(sql).then(results =>{
                reslove(results[0]);//因为只获取1条数据，所以要加上此
            }).catch(error => {
                console.log(`获取全部日志记录数失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 用户端通过username获取全部日志记录数
     */
    static userGetLogsCount(un) {
        return new Promise((reslove,reject) => {
            let sql ="SELECT COUNT(1) as count FROM `logs` WHERE user_username =? AND ( handle ='登录成功' OR handle = '注册成功' OR handle ='退出成功' OR handle ='登录失败' ) ORDER BY time DESC ";

            console.log('用户端通过username获取全部日志记录数sql='+sql);
            console.log('un='+un+';--------------------------');

            this.dbQuery(sql , un).then(results =>{
                reslove(results[0]);//因为只获取1条数据，所以要加上此
            }).catch(error => {
                console.log(`用户端通过username获取全部日志记录数失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 查询全部日志用于分页
     */
    static getLogsPage(start , size) {
        return new Promise((reslove,reject) => {
            let sql ="SELECT * FROM `logs` ORDER BY time DESC LIMIT ? , ? ";

            console.log('查询全部日志用于分页sql='+sql);
            console.log('start='+start+';size='+size+';------------------------------------');

            this.dbQuery(sql , [start , size]).then(results =>{
                reslove(results);
            }).catch(error => {
                console.log(`查询全部日志用于分页失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 用户端查询全部日志用于分页
     */
    static userGetLogsPage(start , size , un) {
        return new Promise((reslove,reject) => {
            let sql ="SELECT `logs`.id , `logs`.user_username , `logs`.handle , `logs`.time , `logs`.ip FROM `logs` WHERE user_username =? AND ( handle = '注册成功' OR handle ='登录成功' OR handle ='退出成功' OR handle ='登录失败') ORDER BY time DESC LIMIT ? , ? ";

            console.log('用户端查询全部日志用于分页sql='+sql);
            console.log('start='+start+';size='+size+';un='+un+';------------------------------------');

            this.dbQuery(sql , [un,start , size]).then(results =>{
                reslove(results);
            }).catch(error => {
                console.log(`用户端查询全部日志用于分页失败：${ error.message }`)
                reject(error);
            })
        })
    }


     /**
     * 添加日志
     */
    static setLog(log) {
        return new Promise((reslove,reject) => {
            let sql ="INSERT INTO `logs` SET ? ";

            console.log('添加日志sql='+sql);
            console.log('user_username='+log.user_username+';handle='+log.handle+';time='+log.time+';ip='+log.ip+';----------------------------');

            this.dbQuery(sql , log).then(results =>{
                reslove(results.affectedRows);//受影响行数
            }).catch(error => {
                console.log(`添加日志失败：${ error.message }`)
                reject(error);
            })
        })
    }
    

}