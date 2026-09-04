# bilin-skills

比邻留学（Bilin Admissions）AI 顾问技能库。本仓库是这些 skill 的**唯一真相源**——所有迭代都在这里用 git 进行，再通过软链分发到各 agent 的加载目录。

## 仓库内容

| Skill | 用途 | 版本 |
|-------|------|------|
| `skills/bilin-admissions-consultant` | 美本申请顾问：方向设计、案例评估、定校定专业、文书方向 | 4.0 |
| `skills/bilin-activity-list-review` | 美本申请活动列表评估：4 维 0-6 诊断分、三层匹配诊断、三级 red mark、排序与逐条修改建议 | 1.1 |
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
├── CHANGELOG.md     # 版本凭证，务必维护
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

**打包发布产物**（`~/.agents/skills/*.zip`）不在本仓库内，由发布流程另行生成。

## 迭代流程

1. 在 `skills/` 下改
2. `git add -p` 逐个确认改动
3. commit message 写清楚"改了什么、为什么"
4. 更新 `CHANGELOG.md`
5. 打 tag：`git tag -a v<x.y> -m "..."`
