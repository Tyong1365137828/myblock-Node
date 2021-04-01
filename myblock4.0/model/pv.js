/**
 * 访问量数据模型
 */
module.exports = class Pv extends require('./model') {

    /**
     * 获取总点击量
     */
    static getHitsTotal() {
        return new Promise((reslove,reject) => {
            let sql ="SELECT SUM(hits) AS total FROM pv";

            console.log('获取总点击量sql='+sql);
            console.log('-------------------------');

            this.dbQuery(sql).then(results =>{
                reslove(results[0]);//因为只获取1行1列数据，所以要加上此
            }).catch(error => {
                console.log(`获取总点击量失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 获取pv表的数据(全部访问量)用于渲染管理员首页的图
     */
    static getData() {
        return new Promise((reslove,reject) => {
            let sql ="SELECT * FROM pv ORDER BY time ASC";

            console.log('获取pv表的数据(全部访问量)用于渲染管理员首页的图sql='+sql);

            this.dbQuery(sql).then(results =>{
                reslove(results);//因为只获取1行1列数据，所以要加上此
            }).catch(error => {
                console.log(`获取pv表的数据(全部访问量)用于渲染管理员首页的图失败：${ error.message }`)
                reject(error);
            })
        })
    }



}