# Vite+Vue

## 技术栈
- Vite@4
- Vue3
- vue-router@4
- vant@4
- pinia
- scss
- eslint&prettier

## 点
- 默认具备KeepAlive、404(src/views/errorPage/404、权限指令（后期还需要根据实际情况更改）)、全局组件 TitleBar/svg-icon
- 路由守卫已经预配置，和登录互相挂钩
- 移动端默认不开启路由权限校验，在修改config/.env.development&.production 中的 VITE_OPEN_PERMISSION 进行修改
- 全局已配置的规则，默认开发软件为VSCode(已设置配置文件)
- 基本全局配置在config中的env分别设置
- 默认配置src路径别名为 @
- vant组件设置自动导入，直接使用即可，无需引入
- 默认配置对应的UI框架 icons 插件
- svg-icon组件内可直接使用 src/assets/icons 下的svg

## rules
- 每个页面顶层默认id为 [Page]_Page_Container
```html
<div id="Login_Page_Container">
</div>
``` 
- 每个组件顶层默认class为 [Component]_Component_Container
```html
<div id="Table_Component_Container">
</div>
``` 
- 请求文件统一从api中以views相同的结构进行创建，使用是以：
```js
import * as api from '@/api/home'

api.testApi({
	// ...datas
}).then(console.log)
```
- 项目内默认以驼峰形式开发
- 普通页面的路由存放至 src/router/asyncRoutes
- 全局样式在src/style.scss下
- svg图标存放至src/assets/icons中配合 svg-icon组件使用
- 存储一般通过src/utils/storage.ts内提供的方法调用