<div align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/left0ver/iconfont-url/ci.yml?branch=main"/>
</div>

# Why

项目中使用 CDN 的方式引入字体图标,正常情况下我们每次更新图标之后就要重新手动复制 iconfont 的在线链接,通过该项目,我们可以使用代码直接获取 iconfont 的在线链接,然后通过 webpack 的插件自动生成对应的 script 标签

# Usage

```typescript
import { getOnlineUrl } from 'iconfont-url'

getOnlineUrl('your project name ', 'your cookie')
```

# get cookie

登录 [iconfont](https://www.iconfont.cn/) , 打开网络面板,随便找一个请求,复制 cookie
![leftover](https://leftover-md.oss-cn-guangzhou.aliyuncs.com/img-md/20230109165530-2023-01-09.png)

# TODO

1. - [ ] add unit test
2. - [ ] add a example

# LICENSE

[MIT](./LICENSE)
