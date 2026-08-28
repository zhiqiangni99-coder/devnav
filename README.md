# DevNav · 开发者导航站

纯静态导航网站，零依赖、零构建、数据本地化。

## 运行

方式一（最简单）：直接双击 `index.html` 用浏览器打开。

方式二（推荐，体验一致）：

```bash
cd devnav
python -m http.server 8123
# 或者: npx serve .
```

浏览器访问 http://localhost:8123

## 功能

- **搜索框**：选引擎（Bing/百度/Google/GitHub/npm/掘金）回车直达；输入时实时筛选下方站点，联想面板里点击站点名可直接打开
- **我的常用**：鼠标悬停任意卡片点 ☆ 收藏，置顶展示（存本机浏览器）
- **我的收录**：右上角「＋ 收录」添加内部系统、常用文档等任意地址
- **数据备份**：右上角「⇅ 数据」导出/导入 JSON，换电脑可迁移
- **深浅色主题**、`/` 快捷键聚焦搜索、移动端自适应

## 修改内容（不用碰代码）

全部站点数据在 [`data.js`](data.js)：

```js
{
  engines: [...],                      // 搜索引擎
  categories: [
    { id, name, icon, hue,            // hue 是分类颜色（0-360 色相）
      sites: [{ name, url, desc }] }   // 站点卡片
  ]
}
```

- 想改成 **AI 导航 / 影视导航 / 团队内部导航**：只改这个文件的分类和站点即可
- 删掉不想要的分类、加自己的分类都直接编辑

## 部署（上线三选一，全部免费）

构建产物就是当前文件夹的静态文件，任选一种：

**方式 A · Cloudflare Pages（国内访问较好，推荐）**
1. 注册/登录 [dash.cloudflare.com](https://dash.cloudflare.com)
2. Workers & Pages → Create → Pages → **Upload assets**（直接拖文件夹，不需要 Git）
3. 把 `devnav` 文件夹拖进去 → 项目名填 `devnav` → Deploy
4. 得到 `https://devnav-xxx.pages.dev`，可在设置里绑自己的域名

**方式 B · Vercel（最省事）**
1. 注册/登录 [vercel.com](https://vercel.com)
2. Add New → Project → 拖入文件夹或先推到 GitHub 再导入
3. Deploy 后得到 `https://xxx.vercel.app`

**方式 C · GitHub Pages（适合顺便开源攒 star）**
1. 在 GitHub 新建仓库，把本文件夹推上去
2. 仓库 Settings → Pages → Source 选 `main` / `(root)` → Save
3. 得到 `https://<用户名>.github.io/<仓库名>`

上线后到各搜索引擎站长平台提交网址（百度站长、Bing Webmaster），一般 1–7 天开始有收录。

## 运营建议（如果想让更多人用）

导航站的价值在内容和持续维护，不在功能本身：

1. **定位要窄**：「XX 领域开发者导航」比大而全更容易被搜索和转发
2. **每周更新**：新工具、新模型发布后第一时间收录，保持站点"活着"
3. **可投稿**：后续可以加一个"提交收录"表单，让用户帮你养内容
4. **SEO**：每个分类一个锚点、站点描述写清楚，长尾词自然来
