# admin
美猫网后台管理
### jwt登录逻辑
  
登陆后,后端发token，前端拦截响应存localStorage（axios:response）

前端之后发送请求都带上token（axios:request拦截）

后端用中间件判断是否有token以及token的有效性
有效：用token的payload生成更新过期时间的token，setHeader  
无效/过期：返回401

前端对401拦截（axios:response），移除过期token，回到登录页 

[axios.config.js](./src/utils/axios.config.js)
### 权限控制的终极解决方案
[权限控制的终极解决方案.md](./src/router/权限控制的终极解决方案.md)

### wangEditor封装以及配置
Editor.vue  
[Editor.vue](./src/components/editor/Editor.vue)

[wangEditor上传图片前后端配置](./src/components/editor/wangEditor上传图片前后端配置(Vue+Nodejs+MongoDB).md)




