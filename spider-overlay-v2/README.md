# 🕷 Spider Overlay — Netlify 部署版

**一个 JS 管理所有项目，改链接只改一个文件。后台地址只有你知道。**

---

## 文件说明

```
netlify/
├── spider-overlay.js        ← 所有项目引入这一个文件（零配置）
├── config.json              ← 唯一的配置文件（改链接只改这里）
├── admin_c84f2a.html        ← 后台管理页面（只有你知道这个地址）
├── demo.html                ← 演示页面
├── netlify.toml             ← Netlify 部署配置
└── README.md
```

> ⚠️ **重要**：部署前把 `admin_c84f2a.html` 重命名为只有你自己知道的名字，比如 `admin_x7k3m9q2.html`。`spider-overlay.js` 里没有写任何后台地址，别人看不到。

---

## 部署步骤

### 1. 推送到 GitHub

把整个 `netlify/` 文件夹（或直接把文件放到仓库根目录）推送到 GitHub。

### 2. 连接 Netlify

在 Netlify 中选择对应的 GitHub 仓库，部署设置：
- **Build command**：留空（无需构建）
- **Publish directory**：`.` （或文件所在目录）

### 3. 在项目中引入 JS

所有项目加上同一行：

```html
<script src="https://你的-netlify-域名/spider-overlay.js"></script>
```

### 4. 修改跳转链接

打开 `https://你的-netlify-域名/admin_c84f2a.html`（你已重命名的地址）：
- 默认密码：`admin123`
- 修改配置 → 下载 `config.json`
- 提交到 GitHub → Netlify 自动部署

或者配置 GitHub Token 一键提交。

---

## 修改管理员密码

1. 打开浏览器控制台
2. 执行 `hashPassword('你的新密码')`，得到哈希值
3. 在 `admin_xxx.html` 源码中搜索 `STORED_HASH`，替换等号右边的值
4. 提交到 GitHub

---

## 安全说明

1. **后台地址不可见**：`spider-overlay.js` 不包含任何 admin 路径
2. **robots 标签**：admin 页面有 `noindex, nofollow`，搜索引擎不会收录
3. **密码保护**：admin 页面有密码登录
4. **建议**：把 admin 文件名改成足够随机，只有你自己知道
5. **进阶**：也可以用 Netlify 的 [Password Protection](https://docs.netlify.com/visitor-access/password-protection/) 功能给 admin 路径再加一层密码

---

## 工作流程

```
你修改 config.json → 推送到 GitHub → Netlify 自动部署
                                        ↓
项目A ─┐                            新配置上线
项目B ─┼── spider-overlay.js ──→  fetch config.json ──→ 覆盖/放行
项目C ─┘                            (缓存 30 分钟)
```
