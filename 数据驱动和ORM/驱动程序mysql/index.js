const mysql = require('mysql2/promise');

// async/promise 的mysql
// async function test(id) {
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '123456',
//         database: 'userdb'
//     })
//     // 使用execute防止sql注入
//     const [result] = await connection.execute("select * from user where id=?", [id]);
//     console.log(result);
//     connection.end();
// }
// test(1);


// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'user'
// })

// 查
// connection.query('select * from user where id=1', (err, result) => {
//     console.log(result);
// })

// 增
// connection.query("insert into user values(7, 'bc', 20, '1')", (err, result) => {
//     console.log(result);
// })

// 删
// connection.query("delete from user where id=7", (err, result) => {
//     console.log(result);
// })

// 改
// connection.query("update user set `name`='刘备' where id=5", (err, result) => {
//     console.log(result);
// })



// 连接池
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'userdb',
//     multipleStatements: true, // 允许执行多条sql语句
//     waitForConnections: true, // 当达到最大连接数量事，后面的连接需等待
//     connectionLimit: 10,  // 限制的最大连接数量
// });

// async function test(name) {
//     // 模糊查询
//     const sql = "select * from user where `name` like concat('%', ?, '%')";
//     const [result] = await pool.execute(sql, [name]);
//     console.log(result);
// }
// test('张');