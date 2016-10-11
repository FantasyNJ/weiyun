# 微云
## 项目描述  
使用Node.js、express模块和Mongodb数据库搭建，使用mongoose对数据库进行操作  
使用babel将es6代码转换成es5  
使用swig模板引擎渲染页面  
主页使用jQuery，网盘页面使用原生JS  
登录注册使用Ajax数据交互完成  
云盘数据使用对象模拟JSON  
云盘实现了对文件夹的创建、删除、拖拽移动、拖拽选中、重命名、右键菜单等功能
## 使用方法  
- 首先确保系统中已经安装了node.js和mongodb服务器
- 进入项目的根目录  
- 在终端运行命令 npm -i安装项目所依赖的node模块  
- 创建mongodb数据文件夹 mkdir ./db(linux环境下)  
- 在终端运行命令 mongod --dbpath ./db  
- 之后运行命令 node ./app.js 启动服务器  
- 在浏览器中访问 127.0.0.1:9999 