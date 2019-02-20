// 账号管理路由模块
var express = require('express');
var router = express.Router();

// 引入连接数据库模块(引入自定义的模块用相对路径)
const connection = require('./connect')

// 统一设置响应头 解决跨域
router.all('*', (req, res, next) => {
    // 设置响应头 解决跨域(目前最主流的方式)
    res.header('Access-Control-Allow-Origin', '*');
    // 让下一次可以继续调用
    next();
})

// 添加账号的路由/accountadd
router.post('/accountadd', function (req, res) {
    // 设置响应头 解决跨域(目前最主流的方式)
    // res.header('Access-Control-Allow-Origin', '*')
    // 接收前端发送的添加账号的数据
    let { username, password, usergroup } = req.body;
    console.log(username, password, usergroup)
    // 把数据存入数据库
    // 构造增加账号的sql语句
    const sqlStr = `insert into account (username,password,usergroup) values('${username}','${password}','${usergroup}')`
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 判断受影响的行数
        if (data.affectedRows > 0) {//大于0,插入成功 返回成功的数据对象
            res.send({ "error_code": 0, "reason": "插入数据成功" });
        } else {
            //返回失败的数据对象
            res.send({ "error_code": 1, "reason": "插入数据失败" });
        }
    })
    // console.log(sqlStr);
});
// 显示账号列表的路由 /accountlist
router.get('/accountlist', (req, res) => {
    // 查询所有账号数据(按照时间排序)
    // 构造所有用户数据的sql语句
    const sqlStr = 'select * from account order by ctime desc';
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        //  把查询到的数据响应给前端
        res.send(data);
    })
})
// 删除账号请求的路由 /accountdel
router.get('/accountdel', (req, res) => {
    // 接收前端传来的id (使用结构)
    let { id } = req.query;
    // 根据id 执行删除
    // 构造sql语句删除数据
    const sqlStr = `delete from account where id=${id}`;
    // 执行sql删除
    connection.query(sqlStr,(err,data)=>{
        if(err)throw err;
        // 根据删除结果判定
        // 判断受影响的行数
        if (data.affectedRows > 0) {//大于0,删除成功 返回成功的数据对象
            res.send({ "error_code": 0, "reason": "删除数据成功" });
        } else {
            //返回失败的数据对象
            res.send({ "error_code": 1, "reason": "删除数据失败" });
        }
    })
})
module.exports = router;