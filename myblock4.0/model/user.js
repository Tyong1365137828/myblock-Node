/**
 * 处理user用户的数据模型 
 */
module.exports = class User extends require('./model') {
    
    /**
     * 通过用户名和密码获取用户
     * @param {*} username 用户名
     * @param {*} password 用户密码
     */
    static getUserByUnameAndPwd(username , password) {
        return new Promise((reslove,reject) => {
            let sql ='SELECT * FROM `user` WHERE username = ? AND password = ?';

            console.log('通过用户名和密码获取用户sql='+sql);
            console.log('username='+username+';password='+password+';-----------------------');

            this.dbQuery(sql , [username , password]).then(results =>{
                reslove(results[0]);//因为只获取1条数据，所以要加上此
            }).catch(error => {
                console.log(`通过用户名和密码获取用户失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 通过用户id查询用户信息
     * @param {integer} id 
     */
    static getUserById(id) {
        return new Promise((reslove,reject) => {
            let sql ='SELECT * FROM `user` WHERE id = ? ';

            console.log('通过用户id查询用户信息sql='+sql);
            console.log('id='+id+';-----------------------------');

            this.dbQuery(sql , id).then(results =>{
                reslove(results[0]);//因为只获取1条数据，所以要加上此
            }).catch(error => {
                console.log(`通过用户id查询用户信息失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 通过username查询用户名
     * @param {String} uname 用户名
     */
    static getUserByUsername(uname) {
        return new Promise((reslove,reject) => {
            let sql ='SELECT * FROM `user` WHERE username = ? ';

            console.log('通过username查询用户名sql='+sql);
            console.log('ver_username='+uname+';------------------------------');

            this.dbQuery(sql , uname).then(results =>{
                reslove(results[0]);//因为只获取1条数据，所以要加上此
            }).catch(error => {
                console.log(`通过username搜索用户名失败：${ error.message }`)
                reject(error);
            })
        })
    }

    /**
     * 获取全部用户记录数
     */
    static getUserCount() {
        return new Promise((reslove,reject) => {
            let sql ="SELECT COUNT(1) as count FROM `user` ";

            console.log('获取全部用户记录数sql='+sql);
            console.log('-------------------------------');

            this.dbQuery(sql).then(results =>{
                reslove(results[0]);//因为只获取1条数据，所以要加上此
            }).catch(error => {
                console.log(`获取全部用户记录数失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 查询全部用户用于分页
     * @param {integer} start 
     * @param {integer} size 
     */
    static getUserPage(start , size) {
        return new Promise((reslove,reject) => {
            let sql ='SELECT * FROM `user` ORDER BY id DESC LIMIT ? , ? ';

            console.log('查询全部用户用于分页sql='+sql);
            console.log('start='+start+';size='+size+';--------------------------');

            this.dbQuery(sql , [start ,size]).then(results =>{
                reslove(results);//因为只获取1条数据，所以要加上此
            }).catch(error => {
                console.log(`查询全部用户用于分页失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 插入用户
     * @param {user} user 插入的user对象
     */
    static setUser( user ) {
        return new Promise ( (reslove,reject) => {
            let sql = 'INSERT INTO user SET ?';

            console.log('插入用户sql='+sql);
            console.log('username='+user.username+';password'+user.password+'--------------------------');

            this.dbQuery(sql , user ).then(results => {
                reslove(results.insertId);  //插入成功，则返回插入成功数据的id
            }).catch(error => {
                console.log(`插入用户失败，${error.message}`)
                reject(error);
            })
        } )
    }


    /**
     * 修改用户账户信息
     * @param {user} u 修改用户的数据------用户对象
     */
    static updateUser (u) {
        return new Promise ((resolve , reject) => {
            let sql = 'UPDATE user SET password=? , name=? , email=? , sex=? , tel=? , head=? WHERE id=? ';

            console.log('修改用户账户信息sql='+sql)
            console.log('password:'+u.p+';name='+u.n+';email='+u.e+';sex='+u.s+'tel='+u.t+';head='+u.h+'id='+u.i+';-----------------------------');
            
            this.dbQuery(sql,[ u.p , u.n , u.e , u.s , u.t , u.h , u.i ]).then(results => {
                resolve(results.affectedRows);
            }).catch(error => {
                console.log(`修改用户账户信息失败，${error.message}`)
                reject(error);
            })
        })
    }


    /**
     * 通过username删除用户
     * @param {String} username 需要删除用户的username
     */
    static deleteUserByUsername (username) {
        return new Promise ((resolve , reject) => {
            let sql = 'DELETE FROM user WHERE username = ?';

            console.log('通过username删除用户sql='+sql);
            console.log('username='+username+'-------------------------')

            this.dbQuery(sql,username).then(results => {
                resolve(results.affectedRows);
            }).catch(error => {
                console.log(`通过username删除用户失败，${error.message}`)
                reject(error);
            })
        })
    }


    /**
     * 设置用户账户锁定
     */
    static updateLock (id , lock) {
        return new Promise ((resolve , reject) => {
            let sql = 'UPDATE user SET `lock` = ? WHERE `id` = ? ';

            console.log('设置用户账户锁定sql='+sql)
            console.log('id='+id+';local='+lock+';-----------------------------');
            
            this.dbQuery(sql,[lock , id]).then(results => {
                resolve(results.affectedRows);
            }).catch(error => {
                console.log(`设置用户账户锁定失败，${error.message}`)
                reject(error);
            })
        })
    }
    

}