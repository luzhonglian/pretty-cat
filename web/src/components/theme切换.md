## 第一步：将 element-plus 的 css 样式引入到 main.js/main.ts

```javascript
import "element-plus/theme-chalk/dark/css-vars.css";
```

## 第二步：安装 vueuse 后布置样式切换，我这里是通过点击图标切换

```html
//template
<el-icon :size="30" @click="toggleDark()">
  <i-ep-moon v-if="isDark" />           
  <i-ep-sunny v-else />
</el-icon>
```

```javascript
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);
```

## OK了家人们！
>https://element-plus.gitee.io/en-US/guide/dark-mode.html#by-css
>https://vueuse.org/core/useDark/#usedark