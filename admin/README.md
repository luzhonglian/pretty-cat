# admin
美猫网后台管理
### jwt登录逻辑
  
登陆后,后端发token，前端拦截响应存localStorage（axios:response）

前端之后发送请求都带上token（axios:request拦截）

后端用中间件判断是否有token以及token的有效性
有效：用token的payload生成更新过期时间的token，setHeader  
无效/过期：返回401

前端对401拦截（axios:response），移除过期token，回到登录页 

>https://github.com/luzhonglian/pretty-cat/blob/main/admin/src/utils/axios.config.js
### 权限控制的终极解决方案
>https://github.com/luzhonglian/pretty-cat/blob/main/admin/src/router/%E6%9D%83%E9%99%90%E6%8E%A7%E5%88%B6%E7%9A%84%E7%BB%88%E6%9E%81%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.md

### wangEditor封装以及配置
Editor.vue
>https://github.com/luzhonglian/pretty-cat/blob/main/admin/src/components/editor/Editor.vue

>https://github.com/luzhonglian/pretty-cat/blob/main/admin/src/components/editor/wangEditor%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87%E5%89%8D%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE(Vue%2BNodejs%2BMongoDB).md





