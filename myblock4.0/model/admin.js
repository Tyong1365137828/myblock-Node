/**
 * 处理管理员的数据模型 
 */

module.exports = class Admin extends require('./model') {

    /**
     * 通过account和password获取管理员
     * @param {*} account 管理员账号
     * @param {*} password 管理员密码
     */
    static getAdminByIdAndPwd(account , password) {
        return new Promise((reslove,reject) => {
            let sql ='SELECT * FROM admin WHERE account = ? AND password = ?';

            console.log('通过account和password获取管理员sql='+sql);
            console.log('account='+account+';password='+password+';-----------------------------')

            this.dbQuery(sql , [account , password]).then(results =>{
                reslove(results[0]);//因为只获取1条数据，所以要加上此
                console.log('hbadcabhjscasbhjcsacbhjascbhjashj')
            }).catch(error => {
                console.log(`通过account和password获取管理员：${ error.message }`)
                reject(error);
            })
        })
    }

    
    /**
     * 通过account获取管理员
     * @param {String} acc 管理员账号
     */
    static getAdminByAcc (acc) {
        return new Promise((reslove,reject) => {
            let sql ='SELECT * FROM admin WHERE account = ?';

            console.log('通过account获取管理员sql='+sql);
            console.log('acc='+acc+';------------------');

            this.dbQuery(sql , [acc]).then(results =>{
                reslove(results[0]);//因为只获取1条数据，所以要加上此
                console.log('hbadcabhjscasbhjcsacbhjascbhjashj')
            }).catch(error => {
                console.log(`通过account获取管理员失败，${ error.message }`)
                reject(error);
            })
        })
    }



    /**
     * 管理员账户修改
     * @param {Admin} adm 修改数据-----管理员对象
     */
    static updateAdmin (adm) {
        return new Promise ((resolve , reject) => {
            let sql = 'UPDATE admin SET password=? , weblog=? WHERE account=? ';

            console.log('管理员账户修改sql='+sql)
            console.log('password:'+adm.p+';account='+adm.a+';weblog='+adm.w+'---------------')

            this.dbQuery(sql,[ adm.p , adm.w , adm.a ]).then(results => {
                resolve(results.affectedRows);
            }).catch(error => {
                console.log(`管理员账户修改失败，${error.message}`)
                reject(error);
            })
        })
    }

    

    

}