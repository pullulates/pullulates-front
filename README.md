# PULLULATES后台管理系统

## 项目介绍

**PULLULATES是一款纯脚手架的后台管理系统，包含pullulates-admin和pullulates-front两个部分**
**项目仅包含一般管理系统的最基础部分，包括用户管理、角色管理、菜单管理、数据字典、组织机构管理、日志管理、定时任务管理、代码生成、缓存管理，您可以在此基础上任意地添加自定义的功能**

> pullulates-admin

1. pullulates-admin使用spring boot开发，开发工具为Idea，为Maven单体应用
2. 集成spring security、JWT、redis完成用户登录和鉴权
3. ORM采用mybatis，分页技术使用pagehelper
4. 集成极验第三方验证码，快速、美观、实用
5. 集成velocity，快速生成CRUD代码
6. JDK1.8、MySQL5.6
7. ...

> pullulates-front

1. pullulates-vue是pullulates后台管理系统的前端部分，开发语言为vue
2. 使用 vs code 工具开发，管理工具使用yarn
3. 前端框架使用 [Ant Design of Vue](https://www.antdv.com/docs/vue/introduce-cn/ "a")
4. 此部分代码已开放,代码传送门：[pullulates-vue](https://github.com/pullulates/pullulates-vue "pullulates-vue")

> pullulates 2.0 规划

1. 添加内容管理功能，开发pullulates门户网站
2. 添加文档管理功能，实现一般办公文档的在线上传、下载、预览
3. 添加移动端内容管理功能，实现多端通用的安卓、IOSAPP和微信支付宝QQ小程序
4. ...

## 项目体验
#### 1.体验账号：superman/superman
#### 2.演示地址：[PULLULATES](http://129.211.62.37 "PULLULATES")

## 沟通交流
#### 1. 微信群聊： 暂无

## 如何使用

#### pullulates-front

> 下载代码

您可以使用git直接clone代码，也可以在登录后下载打包后的源码
```java
git clone https://github.com/pullulates/pullulates-front.git
```

> 环境要求

1. 安装node.js环境，配置yarn
2. 下载安装 vs code
3. 打开编辑器，添加项目至工作区间内，右键打开终端
4. 运行yarn run serve即可

## 快速查看

> 用户登录

![用户登录](src/assets/demo/login.png)

> 系统首页

![系统首页](src/assets/demo/index.png)

> 用户列表

![用户列表](src/assets/demo/users.png)

> 用户新增

![用户新增](src/assets/demo/useradd.png)

> 用户编辑

![用户编辑](src/assets/demo/useredit.png)

> 角色列表

![角色列表](src/assets/demo/roles.png)

> 菜单列表

![菜单列表](src/assets/demo/menus.png)

> 数据字典

![数据字典](src/assets/demo/dicts.png)

> 组织机构

![组织机构](src/assets/demo/orgs.png)

### End