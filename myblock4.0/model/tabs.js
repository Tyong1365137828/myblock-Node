/**
 * 处理标签的数据模型 
 */
module.exports = class Tabs extends require('./model') {
    
    /**
     * 通过文章的id获取其标签列表
     * @param {integer} id 文章id
     */
    static getTabsByArticleId(id) {
        return new Promise((reslove,reject) => {
            let sql ='SELECT * FROM tabs WHERE article_id = ?';

            console.log('通过文章的id获取其标签列表sql='+sql);
            console.log('id='+id+'-------------------------------------');

            this.dbQuery(sql,id).then(results =>{
                reslove(results);//因为只获取1条数据，所以要加上此
            }).catch(error => {
                console.log(`通过文章的id获取其标签列表失败：${ error.message }`)
                reject(error);
            })
        })
    }

}
