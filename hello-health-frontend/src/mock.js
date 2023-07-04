import Mock from 'mockjs'
// 获取 mock.Random 对象
const Random = Mock.Random;
//使用mockjs模拟数据
Mock.mock('/api/Login', (req, res) => {//当post或get请求到/api/data路由时Mock会拦截请求并返回上面的数据

    return Math.random() < 0.7 ?{
        errorCode: 200,
        status: true,
        data:{
            msg: "登录成功"
        }
    } : {
        errorCode: 200,
        status: false,
        data: {
            errorType: 1
        }
    }
})