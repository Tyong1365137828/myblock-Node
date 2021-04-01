/**
 * 处理文章页面的数据模型 
 */

module.exports = class Article extends require('./model') {

    /**
     * 查询出num条记录的热门文章
     * @param {integer} num 查询的条目数
     */
    static getHostRecom(num) {  //获取热门文章

        return new Promise((resolve,reject) => {
            // let sql = 'SELECT * FROM article WHERE hot = 1 LIMIT ?';
            let sql = 'SELECT a.category_id, a.content, a.hits, a.hot, a.id, a.thumbnail, a.time, a.title, a.user_id, u.email, u.head, u.name, u.password, u.sex, u.tel, u.username FROM article a, user u WHERE u.id = a.user_id AND hot = 1 LIMIT ?';
            
            console.log('查询出num条记录的热门文章sql='+sql);
            console.log('num='+num+'---------------');

            this.dbQuery(sql,num).then(results => {
                resolve(results);
            }).catch(error => {
                console.log(`获取热门推荐文章失败，${error.message}`)
                reject(error);
            })

        })

    }



    /**
     * 获取最新文章列表
     */
    static getNewRecom() {
        return new Promise((resolve,reject) => {
            // let sql = 'SELECT * FROM article ORDER BY time DESC';//对时间进行逆序排，形成最新
            let sql = 'SELECT a.category_id, a.content, a.hits, a.hot, a.id, a.thumbnail, a.time, a.title, a.user_id, u.email, u.head, u.name, u.password, u.sex, u.tel, u.username FROM article a, user u WHERE u.id = a.user_id ORDER BY time DESC';
            
            console.log('获取最新文章列表sql='+sql)
            console.log('----------------------')

            this.dbQuery(sql).then(results => {
                resolve(results);
            }).catch(error => {
                console.log(`获取最新文章失败，${error.message}`)
                reject(error);
            })

        })
    }


     
    /**
     * 通过目录id获取指定目录的文章列表
     * @param {id} id ,类目id
     */
    static getRecomByNavId(id) {
        return new Promise((resolve,reject) => {
            let sql = 'SELECT a.* , u.email, u.head, u.name, u.password, u.sex, u.tel, u.username FROM article a , user u WHERE category_id = ? AND a.user_id = u.id ORDER BY time DESC';//对时间进行逆序排，形成最新
            
            console.log('通过目录id获取指定目录的文章列表sql='+sql);
            console.log('id='+id+'---------------');

            this.dbQuery(sql,id).then(results => {
                resolve(results);
            }).catch(error => {
                console.log(`获取指定类目下的文章失败，${error.message}`)
                reject(error);
            })

        })
    }


    /**
     * 通过关键字查找博客文章
     * @param {String} keyword 搜索栏内的关键字
     */
    static getRecomsByKeyword(keyword) {
        return new Promise((resolve,reject) => {
            let sql = 'SELECT a.* , u.email, u.head, u.name, u.password, u.sex, u.tel, u.username FROM article a , user u  WHERE title LIKE ? AND a.user_id = u.id  ORDER BY hits DESC';//对点击量进行逆序排，形成点击越多，越靠前展示
            
            console.log('通过关键字查找博客文章sql='+sql);
            console.log('keyword='+keyword+'------------');
            
            this.dbQuery(sql,`%${ keyword }%`).then(results => {
                resolve(results);
            }).catch(error => {
                console.log(`获取指定类目下的文章失败，${error.message}`)
                reject(error);
            })

        })
    }


    /**
     * 通过指定的文章id获取文章详情
     * @param {*} id 
     */
    static getRecomById (id) {
        return new Promise ((resolve , reject) => {
            let sql = 'SELECT a.id,a.title,a.content,a.`time`,a.hot,a.hits,a.category_id,a.thumbnail,c.name FROM article a , category c WHERE a.id = ? AND a.`category_id` = c.id';

            console.log('通过指定的文章id获取文章详情sql='+sql);
            console.log('id='+id+'-------------------');

            this.dbQuery(sql,id).then(results => {
                resolve(results[0]);
            }).catch(error => {
                console.log(`通过指定的文章id获取文章详情失败，${error.message}`)
                reject(error);
            })
        })
    }

    /**
     * 通过当前的文章id获取上一篇文章
     * @param { integer } id 当前文章的id
     */
    static getPrevRecom (id) {
        return new Promise ((resolve , reject) => {
            let sql = 'SELECT * FROM article WHERE id < ? ORDER BY id DESC LIMIT 1';

            console.log('通过当前的文章id获取上一篇文章sql='+sql);
            console.log('id='+id+'----------------');

            this.dbQuery(sql,id).then(results => {
                resolve(results[0]);
            }).catch(error => {
                console.log(`通过当前的文章id获取上一篇文章失败，${error.message}`)
                reject(error);
            })
        })
    }

    /**
     * 通过当前的文章id获取下一篇文章
     * @param { integer } id 当前文章的id
     */
    static getNextRecom (id) {
        return new Promise ((resolve , reject) => {
            let sql = 'SELECT * FROM article WHERE id > ? ORDER BY id ASC LIMIT 1';

            console.log('通过当前的文章id获取下一篇文章sql='+sql);
            console.log('id='+id+'-------------------');

            this.dbQuery(sql,id).then(results => {
                resolve(results[0]);
            }).catch(error => {
                console.log(`通过当前的文章id获取下一篇文章失败，${error.message}`)
                reject(error);
            })
        })
    }



    //通过用户ID获取文章条数
    static getRecomCountByUID (car_id , hot , uid) {
        return new Promise ((resolve , reject) => {
    
            //使用动态拼接SQL语句
            let sql = 'SELECT COUNT(1) as count FROM article WHERE 1 =1 ';
    
            sql +=  car_id != -1 && car_id ? ` AND category_id = ${ car_id }` : ''  //即如果参数car_id的值不为-1且不为空，则拼入引号内的sql语句；否则，拼入空
            sql +=  hot != -1 && hot ? ` AND hot = ${ hot }` : '' //即如果参数hot不为-1且不为空，则拼入引号内的SQL语句；否则，拼入空
            
            sql += ' AND user_id = ? '
    
            console.log('通过用户ID获取文章条数sql='+sql);
            console.log('car_id='+car_id+';hot='+hot+';uid='+uid+'---------------------');

            this.dbQuery(sql , uid).then(results => {
                resolve(results[0]);
            }).catch(error => {
                console.log(`如果用户ID获取文章数失败，${error.message}`)
                reject(error);
            })
        })
    }


    //获取文章总记录数
    static getRecomCount (car_id , hot) {
        return new Promise ((resolve , reject) => {

            //使用动态拼接SQL语句
            let sql = 'SELECT COUNT(1) as count FROM article WHERE 1 =1 ';

            sql +=  car_id != -1 && car_id ? ` AND category_id = ${ car_id }` : ''  //即如果参数car_id的值不为-1且不为空，则拼入引号内的sql语句；否则，拼入空
            sql +=  hot != -1 && hot ? ` AND hot = ${ hot }` : '' //即如果参数hot不为-1且不为空，则拼入引号内的SQL语句；否则，拼入空
            // sql += uid != '' && uid

            console.log('获取文章总记录数sql:'+sql);
            console.log('car_id='+car_id+';hot='+hot+'------------------------');

            this.dbQuery(sql).then(results => {
                resolve(results[0]);
            }).catch(error => {
                console.log(`获取文章总数失败，${error.message}`)
                reject(error);
            })
        })
    }


    /**
     * 通过用户UID分页获取文章列表
     * @param {integer} start 从哪一条记录开始，使用当前页码减1*每页几条记录得出
     * @param {integer} size 出几条记录(每页几条记录)
     */
    static getAPageByUID(start , size , car_id , hot , uid) {
        return new Promise((resolve,reject) => {
            let sql = 'SELECT * FROM article WHERE 1=1 ';//对时间进行逆序排，形成最新

                                            //注意前面留空格
            sql +=  car_id != -1 && car_id ? ` AND category_id = ${ car_id }` : ''  //即如果参数car_id的值不为-1且不为空，则拼入引号内的sql语句；否则，拼入空
            sql +=  hot != -1 && hot ? ` AND hot = ${ hot }` : '' //即如果参数hot不为-1且不为空，则拼入引号内的SQL语句；否则，拼入空

            sql += ' AND user_id = ? '
            sql += ' ORDER BY time DESC LIMIT ?,?'   //拼入此sql语句

            console.log('通过用户UID分页获取文章列表sql:'+sql);
            console.log('c_id='+car_id+';hot='+hot+';user_id='+uid+';start='+start+';size='+size+'------------------------');

            this.dbQuery(sql , [ uid , start , size] ).then(results => {
                resolve(results);
            }).catch(error => {
                console.log(`通过用户UID分页获取文章列表失败，${error.message}`)
                reject(error);
            })

        })
    }


    
    /**
     * 分页获取文章列表
     * @param {integer} start 从哪一条记录开始，使用当前页码减1*每页几条记录得出
     * @param {integer} size 出几条记录(每页几条记录)
     * @param {integer} car_id 类目id
     * @param {integer} hot 热门与否<1/2>
     */
    static getRecomPage(start , size , car_id , hot) {
        return new Promise((resolve,reject) => {
            let sql = 'SELECT * FROM article WHERE 1=1 ';//对时间进行逆序排，形成最新

                                            //注意前面留空格
            sql +=  car_id != -1 && car_id ? ` AND category_id = ${ car_id }` : ''  //即如果参数car_id的值不为-1且不为空，则拼入引号内的sql语句；否则，拼入空
            sql +=  hot != -1 && hot ? ` AND hot = ${ hot }` : '' //即如果参数hot不为-1且不为空，则拼入引号内的SQL语句；否则，拼入空

            sql += ' ORDER BY time DESC LIMIT ?,?'   //拼入此sql语句

            console.log('分页获取文章列表sql:'+sql);
            console.log('start='+start+';size='+size+';car_id='+car_id+';hot='+hot+'---------------------------')

            this.dbQuery(sql , [start , size] ).then(results => {
                resolve(results);
            }).catch(error => {
                console.log(`分页获取文章列表失败，${error.message}`)
                reject(error);
            })

        })
    }



    /**
     * 设置文章热门
     * @param {integer} id 文章id
     * @param {integer} hot 热门与否状态<1/2>
     */
    static setHotByid(id , hot) {
        return new Promise((resolve,reject) => {
            let sql = 'UPDATE article SET hot = ? WHERE id = ?';//对时间进行逆序排，形成最新

            console.log('设置文章热门sql='+sql);
            console.log('id='+id+';hot='+hot+'---------------------');

            this.dbQuery(sql , [hot , id] ).then(results => {
                resolve(results.affectedRows);  //修改成功，则返回受影响行
            }).catch(error => {
                console.log(`设置文章热门失败，${error.message}`)
                reject(error);
            })

        })
    }    


    /**
     * 添加文章
     * @param {object} article 文章对象
     */
    static setArticle(article) {
        return new Promise((resolve,reject) => {
            let sql = 'INSERT INTO article SET  ?';//插入，node的特有写法，直接传入对象即可

            console.log('添加文章sql:'+sql);
            console.log('title='+article.title+';content='+article.content+';hot='+article.hot+';category_id='+article.category_id+';thumbnail='+article.thumbnail+';id='+article.id+'--------------------');

            this.dbQuery(sql , article ).then(results => {
                resolve(results.insertId);  //插入成功，则返回插入成功数据的id
            }).catch(error => {
                console.log(`添加文章方法失败，${error.message}`)
                reject(error);
            })

        })
    }
    

    /**
     * 通过文章id删除文章
     * @param { integer } id 要删除的文章编号
     */
    static deleteArticleById (id) {
        return new Promise ((resolve , reject) => {
            let sql = 'DELETE FROM article WHERE id = ?';

            console.log('删除文章sql='+sql);
            console.log('操作id='+id+'-------------------------')

            this.dbQuery(sql,id).then(results => {
                resolve(results.affectedRows);
            }).catch(error => {
                console.log(`通过文章id删除文章失败，${error.message}`)
                reject(error);
            })
        })
    }
    


    /**
     * 修改文章方法
     * @param {修改文章的文章对象} article 
     */
    static updateArticle (article) {
        return new Promise ((resolve , reject) => {
            let sql = 'UPDATE article SET title=? , content=? , hot=? , category_id=? , thumbnail=? WHERE id=?';

            console.log('编辑文章sql='+sql);
            console.log('title='+article.title+';content='+article.content+';hot='+article.hot+';category_id='+article.category_id+';thumbnail='+article.thumbnail+';id='+article.id+'--------------------------');
            
            this.dbQuery(sql,[article.title , article.content , article.hot , article.category_id , article.thumbnail , article.id ]).then(results => {
                resolve(results.affectedRows);
            }).catch(error => {
                console.log(`编辑文章失败，${error.message}`)
                reject(error);
            })
        })
    }


    /**
     * 通过用户id获取文章
     * @param {integer} uid 用户id
     */
    static getArticleByUID (uid) {
        return new Promise ((resolve , reject) => {
            let sql = 'SELECT * FROM article WHERE user_id = ?';

            console.log('通过用户id获取文章sql='+sql);
            console.log('uid='+uid+'----------------------------');

            this.dbQuery(sql,uid).then(results => {
                resolve(results);
            }).catch(error => {
                console.log(`通过用户id获取文章失败，${error.message}`)
                reject(error);
            })
        })
    }



}
