/**
 * 入口模块
 */
const express = require('express');
const cookie_session = require('cookie-session');
const multer = require('multer')
const path = require('path');
const fs = require('fs');

const app =express();//创建主应用


// 管理员上传文件配置
const adminUpload = multer({
    dest: './static/upload/admin', // 上传文件的存储目录
    limits: {
        fileSize: 1024 * 1024 * 10 // 单个文件大小限制在5M以内,即字节为单位
    }
})

// 用户上传文件配置
const userUpload = multer({
    dest: './static/upload/user', // 上传文件的存储目录
    limits: {
        fileSize: 1024 * 1024 * 8 // 单个文件大小限制在3M以内,即字节为单位
    }
})


//模板引擎的设置
app.set('view engine','html');//设置模板文件后缀为html
app.set('views' , `${ __dirname }/views`)//设置模板引擎的目录
app.engine('html' , require('ejs').renderFile);//使用require('ejs').renderFile渲染后缀名为html的模板

//静态资源配置，即开放某些资源
app.use(express.static('static'));//static目录在url开放为'/'

//post请求处理
app.use(express.urlencoded({extended: true}));


//配置
app.use(cookie_session({    //session配置
    keys: ['userkey'],
    // maxAge: 1000*60*60*24*2 //单位是毫秒，即最大时间为2天
    maxAge: 1000*60*30//最大不活动时间为30分钟
}))


//用户上传文件操作，single表示单文件上传，其中的uploadFile表示前台表单<input type='file'>的name值
app.post('/user/*' , [userUpload.single('upload'),require('./middleware/userMid').allowUser] , (request , response , next) => {
    //上传成功的文件对象
    let { file } = request ;
    if(file) {  //如果这个对象存在，即上传成功
       
        //获取刚上传的文件名
        var fp = file.path; //获取file.path，即刚才上传的文件路径，下面使用此截取出文件名
        var filename = fp.slice(19);    //获取文件名

        //创建用户目录
        var userFile = request.user.username;   //用来创建用户目录的变量
        fs.mkdir('static/upload/user/'+userFile , function(){   //进行创建
            console.log('成功创建用户<'+userFile+'>目录')
        });


         /**进行文件重命名 */
         let extname = path.extname(file.originalname);//此方法是获取文件的后缀名    file.originalname ==> 文件的原名称
         fs.renameSync(file.path , 'static/upload/user/'+userFile+'/'+filename+extname);//此方法对上传文件路径做更改   参数1，旧路径；参数2，新路径   file.path ==> 上传后的文件路径

                                                                                                                                //截去前19位字符
        console.log('extname：《'+extname+'》;file.path：《'+fp+'》;新路径文件：《'+'static/upload/user/'+userFile+'/'+filename+extname+'》;截取file.path：《'+filename+'》;userFile：《'+userFile+'》;username：《'+request.user.username+'》')

        request.uploadUrl = '/upload/user/'+userFile+'/'+ file.filename + extname;//给upload赋值为此，然后放到request中，用来在数据库存储此路径
    }
    next();
})

//管理员上传文件操作，single表示单文件上传，其中的uploadFile表示前台表单<input type='file'>的name值
app.post('/admin/*' , adminUpload.single('upload') , (request , response , next) => {
    //上传成功的文件对象
    let { file } = request ;
    if(file) {  //如果这个对象存在，即上传成功
        /**进行文件重命名 */
        let extname = path.extname(file.originalname);//file.originalname ==> 文件的原名称
        fs.renameSync(file.path , file.path+extname);//file.path ==> 上传后的文件路径
        request.uploadUrl = '/upload/admin/' + file.filename + extname;//给uploadUrl赋值为'/upload/admin/文件名.后缀名',用来存储到数据库的图片url属性，file.filename ==> 上传后的文件名称;    extname ==> 后缀名;     两者组成的uploadUrl就是上传文件路径
    }
    next();
})


//调用首页面的路由
// app.use('/',require('./router/index'));//调用首页子应用
// app.use('/index',require('./router/index'));//调用首页子应用
app.use(/\/(index)?/,require('./router/indexRou'))//用这个代替上面两个
app.use('/search',require('./router/searchRou'))//调用首页关键词搜索子模块
app.use('/article',require('./router/articleRou'))//调用首页文章查看子模块


//调用用户的路由
app.use('/user/?*' , require('./middleware/userMid').allowUser);//如果url访问/user或者/user/*，则就转至中间件验证是否存在user账户，存在就把session放到request中
// app.use(/\/user\/(index)?/,require('./router/user/indexRou'));//当url为'/user'或者'/user/index'时调用后台首页面，当然这个以及所有/user/*操作都要在上述条件满足的条件下进行
app.use('/user/index',require('./router/user/indexRou'))
app.use('/u_pre',require('./router/user/userRou'))//配置用户登录和注册操作的模块
app.use('/user/article',require('./router/user/articleRou'))//调用用户文章子应用
app.use('/user/logs',require('./router/user/logsRou'))//调用用户日志管理子应用
app.use('/user/account',require('./router/user/accountRou'))//调用用户账户管理子应用


//调用管理员路由
app.use('/admin/?*' , require('./middleware/adminMid').allowAdmin);//如果url访问/admin或者/admin/*  ，则就转至中间件验证是否存在admin账户
app.use(/\/admin\/(index)?/,require('./router/admin/indexRou'));//当url为'/admin'或者'/admin/index'时调用后台首页面，当然这个以及所有/admin/*操作都要在上述条件满足的条件下进行
app.use('/a_pre',require('./router/admin/adminRou'));//管理员登录页面和登录提交操作的路由
app.use('/admin/article' , require('./router/admin/articleRou'));//调用后台文章管理的路由
app.use('/admin/category' , require('./router/admin/categoryRou'));//调用后台栏目管理的路由
app.use('/admin/logs' , require('./router/admin/logsRou'));//调用后台日志管理的路由
app.use('/admin/user' , require('./router/admin/userRou'));//调用后台用户管理的路由
app.use('/admin/account' , require('./router/admin/accountRou'));//调用后台账户管理的路由



//监听服务器
app.listen(3000,function(){
    console.log('server running 3000 port......');
});