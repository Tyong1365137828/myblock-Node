 const mysql = require('mysql');

 console.log('开始了！！！');
 var conn ;

  /**
  * 数据模型的基类,封装类数据库的常用操作
  */
 module.exports = class Model {
    
    // static conn = null ; //连接对象
    

    static connection() {//数据库连接方法
        conn = mysql.createConnection({//创建连接
            host: '127.0.0.1',
            user: 'root',
            password: '072731',
            database: 'node_myblock'
        });
        conn.connect(error => {//连接数据库
            if(error) {
                console.log(`数据库连接失败:${ error.message }`);
            } else {
                console.log('连接成功......');
            }
        });
    }

    /**关闭连接 */
    static end() {
        if( null != conn) {//如果conn对象不为空
            conn.end();
            console.log('关闭连接成功......')
        }
    }

    /**
     * 通用sql方法
     * @param {string} sql ,执行的sql语句
     * @param {*} args ,给sql语句进行赋值的参数数组
     */
    static dbQuery(sql,args = []) {
        return new Promise ((resolve , reject) => { //同步化
            this.connection();

            conn.query(sql,args,(error,results) => {//使用mysql包内的封装查询再次进行封装
                if(error) {//执行sql失败，外界通过catch方法执行
                    reject(error);
                } else {//执行sql成功，外界通过then()方法执行
                    resolve(results);
                }
            })

            this.end();//关闭连接
        })
    }

 }