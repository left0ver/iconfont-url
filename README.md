<div align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/left0ver/iconfont-url/ci.yml?branch=main"/>
</div>

# Why

项目中使用 CDN 的方式引入字体图标,正常情况下我们每次更新图标之后就要重新手动复制 iconfont 的在线链接,通过该项目,我们可以使用代码直接获取 [iconfont](https://www.iconfont.cn/) 的在线链接,然后通过 webpack 的插件自动生成对应的 script 标签

# Install
```shell
npm i iconfont-url
# or
yarn add iconfont-url
```

# Usage

```typescript
import { getOnlineUrl } from 'iconfont-url'

// projectName: required, iconfont的项目名称,自己拥有的项目或者自己参与的项目
//     cookie : required , https://www.iconfont.cn 站点 的 cookie
getOnlineUrl('your project name ', 'your cookie')

// return   promise<FontUrl| null>

type FontUrl= {
  svg_file: string
  woff_file: string
  woff2_file: string
  eot_file: string
  ttf_file: string
  js_file: string
  css_file: string
  json_file: string
  css_font_face_src: string
}

```

# with Webpack

你可以使用[iconfont-url-plugin](https://github.com/left0ver/iconfont-url-plugin),该 webpack 插件可以获取 iconfont 在线链接并将对应的 html 标签自动注入到生成的 html 中

# get cookie

登录 [iconfont](https://www.iconfont.cn/) , 打开网络面板,随便找一个请求,复制 cookie
![leftover](https://leftover-md.oss-cn-guangzhou.aliyuncs.com/img-md/20230109165530-2023-01-09.png)

# TODO

1. - [ ] add unit test

# LICENSE

[MIT](./LICENSE)
