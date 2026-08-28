# bilin-skills

比邻留学（Bilin Admissions）AI 顾问技能库。本仓库是这些 skill 的**唯一真相源**——所有迭代都在这里用 git 进行，再通过软链分发到各 agent 的加载目录。

## 仓库内容

| Skill | 用途 | 版本 |
|-------|------|------|
| `skills/bilin-admissions-consultant` | 美本申请顾问：案例评估、定校定专业、文书方向、推荐信策略 | 3.0 |
| `skills/bilin-wechat-essay-write` | 公众号文章写作：hook 设计、风格模仿、成稿 | — |
| `skills/bilin-wechat-topic-brainstorm` | 公众号选题发散：按维度拆解选题空间 | — |

## 目录约定

```
bilin-skills/
├── skills/          # 每个 skill 一个目录，可独立分发
│   └── <skill-name>/
│       ├── SKILL.md        # 入口，frontmatter 含 name / description
│       ├── references/     # 按需加载的子文档，不一次全读
│       └── assets/         # skill 自带资源（如 logo）
├── CHANGELOG.md     # 版本凭证，务必维护
└── install.sh       # 把 skills 软链到各 agent 加载目录
```

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

**打包发布产物**（`~/.agents/skills/*.zip`）不在本仓库内，由发布流程另行生成。

## 迭代流程

1. 在 `skills/` 下改
2. `git add -p` 逐个确认改动
3. commit message 写清楚"改了什么、为什么"
4. 更新 `CHANGELOG.md`
5. 打 tag：`git tag -a v<x.y> -m "..."`
