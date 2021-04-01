/**
 * 处理category的数据模型 
 */
module.exports = class Category extends require('./model') {

    /**
     * 获取文章类目
     */
    static getNav() {
        return new Promise((reslove,reject) => {
            let sql ='SELECT * FROM category ORDER BY `index` DESC';

            console.log('获取文章类目sql='+sql);
            console.log('------------------------');

            this.dbQuery(sql).then(results =>{
                reslove(results);
            }).catch(error => {
                console.log(`获取文章类目失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 用户端获取文章类目
     */
    static userGetNav() {
        return new Promise((reslove,reject) => {
            let sql ='SELECT * FROM category ORDER BY `index` DESC LIMIT 10';

            console.log('用户端获取文章类目sql='+sql);
            console.log('------------------------')

            this.dbQuery(sql).then(results =>{
                reslove(results);
            }).catch(error => {
                console.log(`用户端获取文章类目失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 通过栏目id获取栏目信息
     * @param {integer} id 栏目id
     */
    static getNavById(id) {
        return new Promise((reslove,reject) => {
            let sql ='SELECT * FROM category WHERE id = ?';

            console.log('通过栏目id获取栏目信息sql='+sql);
            console.log('id='+id+'--------------');

            this.dbQuery(sql,id).then(results =>{
                reslove(results[0]);//因为只获取1条数据，所以要加上此
            }).catch(error => {
                console.log(`通过栏目id获取栏目失败：${ error.message }`)
                reject(error);
            })
        })
    }


    /**
     * 获取类目总条数
     */
    static getNavCount () {
        return new Promise ((resolve , reject) => {
            let sql = 'SELECT COUNT(1) as count FROM category';

            console.log('获取类目总数sql='+sql);
            console.log('----------------------');

            this.dbQuery(sql).then(results => {
                resolve(results[0]);
            }).catch(error => {
                console.log(`获取文章总数失败，${error.message}`)
                reject(error);
            })
        })
    }


    /**
     * 添加类目
     * @param {String} name 栏目名称
     * @param {integer} index 栏目排行索引
     */
    static setNav (name , index) {
        return new Promise ((resolve , reject) => {
            let sql = 'INSERT INTO category ( `name` , `index`) VALUES (?,?) ';

            console.log('添加类目sql='+sql);
            console.log('name='+name+';index='+index+';--------------');

            this.dbQuery(sql , [name , index]).then(results => {
                resolve(results.insertId);
            }).catch(error => {
                console.log(`添加类目失败，${error.message}`)
                reject(error);
            })
        })
    }


    /**
     * 删除类目
     * @param {integer} id 删除的栏目id
     */
    static delNav (id) {
        return new Promise ((resolve , reject) => {
            let sql = 'DELETE FROM category WHERE id = ? ';

            console.log('删除类目sql='+sql);
            console.log('id='+id+';-----------------');

            this.dbQuery(sql , id).then(results => {
                resolve(results.affectedRows);
            }).catch(error => {
                console.log(`删除类目失败，${error.message}`)
                reject(error);
            })
        })
    }


    /**
     * 修改类目名称
     * @param {integer} id 修改的类目的id
     * @param {String} name 修改后的类目名为此
     */
    static updateName (id , name) {
        return new Promise ((resolve , reject) => {
            let sql = 'UPDATE category SET name = ? WHERE id = ? ';

            console.log('修改类目名称sql='+sql);
            console.log('id='+id+'; name='+name+';------------------');

            this.dbQuery(sql , [name , id] ).then(results => {
                resolve(results.affectedRows);
            }).catch(error => {
                console.log(`修改类目名称失败，${error.message}`)
                reject(error);
            })
        })
    }


    /**
     * 修改类目索引Index
     * @param {integer} id 修改的类目的id
     * @param {integer} index 修改后的类目Index为此
     */
    static updateIndex (id , index) {
        return new Promise ((resolve , reject) => {
            let sql = 'UPDATE category SET `index` = ? WHERE id = ? ';

            console.log('修改类目索引Index sql='+sql);
            console.log('id='+id+'; index='+index+';----------------');

            this.dbQuery(sql , [index , id] ).then(results => {
                resolve(results.affectedRows);
            }).catch(error => {
                console.log(`修改类目索引Index失败，${error.message}`);
                reject(error);
            })
        })
    }


}
