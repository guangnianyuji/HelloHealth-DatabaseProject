# HelloHealth前端

- 我们使用Axios这个库来处理请求，使用ApiFox来测试接口
- 设计前端时为了统一风格尽量采用ElementPlus中的组件，[参考文档](https://element-plus.org/zh-CN/component/button.html)
- 我们使用Vue的路由组件，除了登录功能外的页面都有个导航栏与侧边栏，页面的具体内容通过RouterView显示，所以写好的页面还请放到views文件夹里，然后在router/main.js里添加路由
- 为了风格统一，除了黑白灰色外，设计颜色时请尽量使用`--el-color-primary`、`--el-color-primary-light-x`、`--el-color-primary-dark-2`这些颜色变量
- 图标库请使用flaticon，[可以在这里查询图标的代码](https://www.flaticon.com/search?type=uicon)
- 用户信息、用户是否登录等信息请引用global/global.js中的值，其中的值会在页面刷新时更新。由需要的全局变量也可以加到其中。