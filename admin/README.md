# admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### jwt登录逻辑

登陆后,后端发token，前端拦截响应存localStorage（axios:response）

前端之后发送请求都带上token（axios:request拦截）

后端用中间件判断是否有token以及token的有效性
有效：用token的payload生成更新过期时间的token，setHeader  
无效/过期：返回401

前端对401拦截（axios:response），移除过期token，回到登录页 


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
