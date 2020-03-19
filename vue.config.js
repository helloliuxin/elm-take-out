// 获取本地json数据
let sellerData = require('./mock/seller.json');
let goodsData = require('./mock/goods.json');
let ratingsData = require('./mock/ratings.json');

let seller = sellerData.seller;
let goods = goodsData.goods;
let ratings = ratingsData.ratings;

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {

        app.get("/api/seller", function(req,res) {
          res.json({
            code: 0,
            data: seller
          })
        })

        app.get("/api/goods", function(req,res) {
          res.json({
            code: 0,
            data: goods
          })
        })

        app.get("/api/ratings", function(req,res) {
          res.json({
            code: 0,
            data: ratings
          })
        })

        // 登录验证
        app.post("/api/login", function(req,res) {
          let body = [];
          req
            .on("data", chunk => {
              // 接受到一部分数据
              // console.log('chunk ==> ', chunk);
              body.push(chunk);
            })
            .on("end", () => {
              // 数据接收完毕
              // 将body转换为完整的buffer
              body = Buffer.concat(body).toString();
              // 转换并保存前台传递的username,password
              let {username, password, users} = JSON.parse(body);
              users = Array.from(JSON.parse(users)) || [];
              // console.log('username ==> ', username);
              // console.log('password ==> ', password);
              // console.log('users ==> ', users);

              const v = users.filter(item => (item.username == username) && (item.password == password));
              // console.log('v ==> ', v);

              if (String(v)) {
                res.json({
                  code: 0,
                  token: `haha-${new Date().getTime() + 300000}`
                })
              } else {
                res.json({
                  code: 1,
                  message: "用户名或者密码错误"
                })
              }
            })
        })

        // 注册验证
        app.get("/api/register", function(req,res) {
          let {setUsername, users} = req.query;

          users = Array.from(JSON.parse(users)) || [];

          const v = users.filter(item => setUsername == item.username);

          if (v.length) {
            res.json({
              code: 1,
              message: '用户名已存在'
            })
          } else {
            // 注册成功
            res.json({
              code: 0,
              message: '注册成功'
            })
          }
        })

      }
    }
  }
}
