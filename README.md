# Physical AI Monograph Website

专著《Physical AI: Concepts, Techniques, and Challenges》的本地网页项目。
复用 `W0-Homepage-source` 的 Next.js / React / Tailwind 技术栈、原始蓝色主题、字体、
居中首屏、渐变标题、圆角按钮、统计卡片、章节容器和深浅色切换。
原网站文件未修改。本项目的运行和部署不读取原网站目录。

## 本地查看

可直接预览已经生成的静态网页，无需重新构建：

```powershell
cd "D:\桌面\网站\Physical-AI-Monograph-site"
.\scripts\preview.ps1
```

打开 http://localhost:3001 。按 Ctrl+C 停止预览。
当前电脑的默认 Node.js 为 18，不满足模板要求。项目提供 `.\scripts\build.ps1`，
会优先使用兼容的 Node.js，并在必要时使用 Codex 已安装的 Node.js 24 构建。
以下开发命令需要 Node.js 20.9+：

依赖已经安装，运行：

```powershell
cd "D:\桌面\网站\Physical-AI-Monograph-site"
pnpm dev --port 3001
```

访问 http://localhost:3001 。修改源码后页面会自动更新。

生成可部署的静态文件：

```powershell
pnpm typecheck
pnpm build
python -m http.server 3001 --bind 127.0.0.1 --directory out
```

构建产物为 `out/`，可部署至 GitHub Pages 或其他静态托管服务。
首次在其他电脑运行时，先用 Node.js 20.9+ 与 pnpm 安装依赖：

```powershell
pnpm install --frozen-lockfile
```

部署到子路径时，构建前设置实际路径，例如：

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/physical-ai'
pnpm build
```

返回根路径构建前，使用 `Remove-Item Env:NEXT_PUBLIC_BASE_PATH -ErrorAction SilentlyContinue`。
本次只创建本地代码与预览，未发布到网络。

## 发布到 InternRobotics 的 GitHub Pages

建议创建项目仓库 `InternRobotics/physical-ai`，对应网址：
https://internrobotics.github.io/physical-ai/ 。仓库名使用小写和连字符，不使用空格。
网页中显示的书名仍为 Physical AI。
项目站点不需要改动现有 `InternRobotics/internrobotics.github.io` 仓库。

本项目已提供 `.github/workflows/deploy-pages.yml`。推送到 `main` 后，GitHub Actions
自动安装依赖、构建和部署 `out/`。构建时读取 GitHub Pages 的 `base_path`，使图片、
样式、脚本和 PDF 使用正确的子路径；本地无需手动固定 `/physical-ai`。

首次发布步骤：

1. 打开 https://github.com/new ，Owner 选择 `InternRobotics`，Repository name 填
   `physical-ai`，选择 Public，保持新仓库为空，不添加 README、.gitignore 或 License。
   如果无法选择该组织，请组织管理员创建仓库并授予你写入权限及 Pages 管理权限。
2. 在 PowerShell 中进入本项目目录，执行以下命令。它们适用于当前尚未初始化 Git
   的本地项目和新建的空远程仓库，不用于已有提交的远程仓库：

```powershell
cd "D:\桌面\网站\Physical-AI-Monograph-site"
git init -b main
git add .
git commit -m "Add Physical AI monograph website"
git remote add origin https://github.com/InternRobotics/physical-ai.git
git push -u origin main
```

首次通过 HTTPS 推送时，按 Git 的提示登录有权写入该组织仓库的 GitHub 账号。
上传的是本文件夹的内容，使 `package.json`、`src/`、`public/`、`.github/` 位于远程
仓库根目录，不要在远程额外套一层 `Physical-AI-Monograph-site/`。

3. 打开仓库 Settings → Pages → Build and deployment，将 Source 设为 **GitHub Actions**。
4. 打开仓库 Actions → **Deploy Physical AI to GitHub Pages** → **Run workflow**，
   选择 `main` 执行。首次推送如果发生在启用 Pages 之前，手动执行即可重新部署。
5. 等待 build、deploy 均成功，访问 https://internrobotics.github.io/physical-ai/ 。
   网站地址也会显示在仓库 Settings → Pages 中。

之后更新网页，只需要修改源码并推送：

```powershell
git add .
git commit -m "Update Physical AI website"
git push
```

`.gitignore` 已排除 `node_modules/`、`.pnpm-store/`、`.next/`、`out/` 和本地参考资料；
GitHub Actions 会自行生成静态文件。
当前 PDF 为约 66.1 MiB，超过 GitHub 网页上传的 25 MiB 上限，但小于普通 Git 的
100 MiB 单文件上限。因此使用上述 Git 推送命令上传项目，包含 PDF，无需 Git LFS。
发布后，页面上的阅读按钮会提供该 PDF 的公开访问。

官方说明：
[项目站点网址](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)、
[Pages 发布源设置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、
[文件大小限制](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)。

## 已填充的内容

- 首页：真实书名、副标题、团队署名、上海人工智能实验室 Logo、预印本阅读入口。
- 书籍介绍：依据专著摘要与第 1 章整理。
- 图片：PDF 第 12 页的 Figure 1.1，以及第 18 页的 Figure 1.3；由原 PDF 渲染提取。
- 目录：直接从 PDF 书签提取的 3 部分、12 章及二级章节，包含真实页码。
  可展开章节，点击章或节在 PDF 中跳转至对应页。
- PDF：本项目 `public/paper/Physical_AI___Monograph.pdf` 内的独立副本，362 页，约 66.1 MiB。
- 配套资源：预印本可阅读；代码、课件与勘误暂标记为 Coming soon。
- 引用：团队署名的 2026 年预印本 BibTeX，可一键复制。

## 待补充项目与修改入口

主要内容文件为 `src/data/project-page.ts`，目录为 `src/data/contents.json`。

| 待补内容 | 修改位置 |
| --- | --- |
| 出版社、出版日期、纸质书购买链接 | `projectInfo.publisher`、`publicationDate`、`purchaseUrl` |
| 代码仓库、课件、勘误／反馈链接 | `resources`，将 `href: null` 改为真实地址，并修改按钮标签 |
| 正式书籍封面 | 放入 `public/images/monograph/`，按需要替换 `figures.teaser` |
| 个人作者信息、致谢 | `AuthorsSection`；目前仅采用 PDF 明确署名的团队 |
| 正式出版引用、DOI、ISBN | `citationText` 与 `bibtex`；目前不填未经确认的信息 |
| 更新版 PDF | 替换 `public/paper/Physical_AI___Monograph.pdf`，同步更新页数、目录和插图 |

原 PDF 首页标注 “A Preprint Version on Oct. 19, 2026”。制作当天是 2026-10-12，
页面因此使用 Forthcoming / Preprint，不将这一未来日期写成已发布新闻。
没有从原 W0 项目搬入模型结果、模型资源、视频或论文引用。

页面为英文，以匹配专著和原网站。视觉样式保存在 `src/app/globals.css`。
原 W0 样式保留，仅增加书籍目录、资源状态和移动导航所需的样式。

## 内容结构参考

- [Multi-Agent Reinforcement Learning book](https://www.marl-book.com/)
- [Becoming an AI Researcher](https://phd-in-ai.com/)

参考其书籍介绍、目录、作者、配套资源、出版入口和引用结构；未复用其文案、评价或出版信息。

## 素材与维护

`scripts/extract-manuscript.py` 使用 pypdf、pypdfium2 和 Pillow 提取目录与插图。
这些工具只用于维护素材，网页运行不需要 Python 或原工作区的 PDF。
临时提取文件在被 Git 忽略的 `reference/` 中。预览截图放在 `preview/`。

PDF 和所有网页素材均在本项目内；对外部署时应确认该 PDF 是希望公开的版本。
