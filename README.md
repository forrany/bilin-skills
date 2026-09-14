# bilin-skills

比邻留学（Bilin Admissions）AI 顾问技能库。本仓库是这些 Skill 的**唯一真相源**：所有迭代都在这里用 Git 进行。本地开发仍可通过软链即时加载；面向比邻 Aside 客户端则构建、签名并发布一个完整的 `bilin-education` Plugin，无需重新发布桌面客户端。

## 仓库内容

| Skill | 用途 | 版本 |
|-------|------|------|
| `skills/bilin-admissions-consultant` | 美本申请顾问：方向设计、案例评估、定校定专业、文书方向 | 4.0 |
| `skills/bilin-activity-list-review` | 美本申请活动列表评估：ED 硬闸、4 维 0-6 诊断分、三层匹配、三级 red mark、排序与逐条修改建议 | 1.3 |
| `skills/bilin-commonapp-review` | Common App 表单填写审核：10 大模块查错（含 Recommenders & FERPA、My Colleges）、跨模块一致性四链核对、红橙黄三级问题清单、待顾问确认清单、支持分次提交 | 1.4 |
| `skills/bilin-wechat-essay-write` | 公众号文章写作：hook 设计、风格模仿、成稿 | 3.0 |
| `skills/bilin-wechat-topic-brainstorm` | 公众号选题发散：按维度拆解选题空间 | 1.0 |

版本号写在各自 `SKILL.md` frontmatter 的 `metadata.version`。改动 skill 时同步升版本 +
更新 `CHANGELOG.md`。

`bilin-admissions-consultant` v4.0 起，方向设计是独立的一步（Step 8 硬闸）：
必须先产出《方向预案》交人工确认，才能写完整方案。

## 目录约定

```
bilin-skills/
├── skills/          # 在用。每个 skill 一个目录，可独立分发
│   └── <skill-name>/
│       ├── SKILL.md        # 入口，frontmatter 含 name / description
│       ├── references/     # 按需加载的子文档，不一次全读
│       └── assets/         # skill 自带资源（如 logo）
├── archive/         # 已停用。不会被软链、不会被 agent 读到
├── release/         # 确定性打包、签名与发布工具
├── CHANGELOG.md     # Skill 与 Plugin 版本凭证，务必维护
└── install.sh       # 把 skills/ 软链到各 agent 加载目录（不碰 archive/）
```

`install.sh` 只扫 `skills/`，`archive/` 下的内容不会生效。详见 [`archive/README.md`](archive/README.md)。

新增 skill 时：在 `skills/` 下建同名目录，`SKILL.md` 的 `name` 字段必须与目录名一致。

## 安装

```bash
./install.sh
```

脚本会把 `skills/*` 软链到：

- `~/.skills-manager/skills/`（skills-manager 管理的 agent）
- `~/.workbuddy/skills/`（WorkBuddy）

**软链而非复制**，是为了保证只有一份源码。改本仓库的文件，所有 agent 立即生效；不要直接编辑软链目标目录里的内容。

已存在的同名目录会先备份到 `<加载目录>/<skill>.bak-<时间戳>`，不会直接删除。

## 注意事项

**仓库保持私有。** `bilin-wechat-essay-write/references/style_samples/` 下 05–07 号样本是比邻已发布的公众号定稿（L 同学系列），属于比邻内容资产；`01–04` 同理。这些是 skill 的风格基准，不要删除，但不要随仓库外传。

**学生材料更要紧。** `bilin-activity-list-review/references/gold-6-yale-jason/` 下是**真实学生的活动列表、补充文书片段与校内 Review Form 评语**。这是 skill 校准"什么叫 6 分"的基准，不要删除，但敏感度高于公众号样本——不要随仓库外传，也不要拿去做示例演示。

**打包发布产物**不进入 Git。一次 Plugin 发布只产生一个 ZIP，ZIP 内包含全部运行时 Skills；客户端也只会原子安装整个 Plugin 版本，避免多个 Skill 版本互相不兼容。

## 客户端发行

根目录 `.claude-plugin/plugin.json` 中的 `version` 是唯一发行版本。`skills/*/SKILL.md` 中的版本仅用于记录 Skill 自身演进，不用于客户端独立升级。运行时文件默认只包括：

- 每个 Skill 的 `SKILL.md`
- `references/`、`assets/`、`scripts/`、`templates/` 下的常规文件
- `release/runtime-files.json` 显式列出的额外文件

`reports/`、`evals/`、`docs/`、`archive/`、隐藏文件、符号链接和未声明文件不会进入发行包。若需要执行脚本，必须同时在 `runtime-files.json` 的 `include` 和 `executables` 中声明，且路径位于 `scripts/`。

本地校验和打包：

```bash
npm ci
npm test
npm run validate
npm run package
```

`dist/stable.json` 是签名清单，`dist/bilin-education-<version>.zip` 是确定性产物。同一提交、同一锁定工具链重复打包应得到完全相同的 SHA-256。

## 签名与发布

发布前先更新 `CHANGELOG.md` 和 `.claude-plugin/plugin.json` 中的 `version`、`publishedAt`、`releaseNotes`，完成评审后打与版本严格一致的 tag：

```bash
git tag -a bilin-education-v1.2.0 -m "bilin-education 1.2.0"
git push origin bilin-education-v1.2.0
```

发布环境使用 Node.js 22，依次运行测试、校验、确定性打包、Ed25519 签名和上传。需要配置：

- `BILIN_CONTENT_UPDATE_URL`：经过确认的 HTTPS 内容服务地址
- `CONTENT_SIGNING_PRIVATE_KEY_PEM`：离线生成的 Ed25519 PKCS#8 私钥
- `BILIN_CONTENT_PUBLISH_TOKEN`：仅允许上传发行版的 bearer token

四类密钥职责严格分离：内容私钥只签名；publisher token 只上传；administrator token 只签发激活码和吊销设备；build token 只下载桌面安装包内置的 fallback。它们不能复用，也不能互相替代。客户端只持有激活后换取的单设备凭证，凭证由操作系统安全存储保管，界面与日志均不展示。

发布同一版本两次会被服务安全拒绝。需要修正内容时必须提升 Plugin 版本，不覆盖既有不可变产物。

## 分支与部署上下文

- **不要在 `main` 上直接开发或发布。** 打包、签名、发布工具链的改动放在功能分支，评审后再合入。
- **内容服务不在本仓库。** 它由 Aside 仓库的 `services/skills-distribution` 提供；服务器部署步骤见该仓库的 `services/skills-distribution/DEPLOY.md`。
- **密钥归属。** Ed25519 密钥对在部署内容服务时生成。公钥被钉进比邻桌面客户端（`ASIDE_CONTENT_UPDATE_PUBLIC_KEY`），私钥只保存在本仓库的 `CONTENT_SIGNING_PRIVATE_KEY_PEM` secret 中，**任何情况下都不进本仓库**。
- **不提交私钥。** `*.pem` 已被 `.gitignore` 忽略；`release/test/release.test.mjs` 在运行时现场生成一次性密钥，仓库里不存任何私钥文件。

## 迭代流程

1. 在 `skills/` 下修改，并同步更新 Skill frontmatter 版本和 `CHANGELOG.md`
2. 若运行时文件边界有变化，更新 `release/runtime-files.json`
3. 提升根 Plugin 版本，更新发布时间和发行说明
4. 运行测试、校验、打包，并确认重复打包的哈希一致
5. `git add -p` 检查改动后提交，再按受控发布流程上传签名产物
