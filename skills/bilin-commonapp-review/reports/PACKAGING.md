# 顾问试用包 · 打包说明

给顾问试用时**只需 7 个文件**（约 51 KB）。其余目录是内部维护与治理资产，不进试用包。

## 试用包内容

```
bilin-commonapp-review/
├── SKILL.md
└── references/
    ├── INTAKE.md              ← 顾问的入口：可直接转发给对接人的收件清单
    ├── MODULE-CHECKLISTS.md   ← 10 模块检查项（含依据纪律）
    ├── CROSS-MODULE.md        ← 四条一致性链
    ├── SEASON-2027.md         ← 当季参数 + 活动时间逻辑判据 + 历史季模式
    ├── SEVERITY.md            ← 红橙黄定级
    └── REPORT-TEMPLATE.md     ← 报告 6 节结构
```

**打包命令**（在仓库根目录执行）：

```bash
SKILL=bilin-commonapp-review
OUT=/tmp/$SKILL-trial
rm -rf "$OUT" && mkdir -p "$OUT/references"
cp "skills/$SKILL/SKILL.md" "$OUT/"
cp skills/$SKILL/references/*.md "$OUT/references/"
# 可选：宿主需要 interface.yaml 时（skills-manager / workbuddy）
# mkdir -p "$OUT/agents" && cp "skills/$SKILL/agents/interface.yaml" "$OUT/agents/"
(cd /tmp && zip -rq "$SKILL-trial.zip" "$SKILL-trial")
echo "包已生成：/tmp/$SKILL-trial.zip"
```

## 不进包的内容与原因

| 目录/文件 | 不进包原因 |
|---|---|
| `reports/`（5 份） | 内部治理证据（三轮评审 + 干跑）。干跑报告即便脱敏也含案例画像（学校/专业/申请季），不宜外发 |
| `evals/`（2 份） | 回归测试资产，顾问用不到 |
| `manifest.json` | 版本治理元数据。版本号已在 SKILL.md frontmatter（`version`），顾问反馈时足够定位版本 |
| `agents/interface.yaml` | **取决于宿主**：skills-manager / workbuddy 加载需要；直接读 SKILL.md 的宿主不需要 |

## 已核验

- SKILL.md 的资源表只指向 `references/` 六个文件，**无任何运行时依赖指向 reports / manifest / evals** —— 裁剪安全。
- 唯一副作用：`SEASON-2027.md` 换季 runbook 第 3 条会提到包内不存在的 `manifest.json` 与 `reports/output-risk-profile.md`。该节是给维护者的，不影响顾问使用；runbook 已注明完整维护资产在内部仓库。

## 顾问试用引导（可随包发出）

1. 入口是 `references/INTAKE.md` —— 直接把里面「转发用」那段发给学生/对接人收材料。
2. 材料到手后对 AI 说：「用 bilin-commonapp-review 审这份 CA，目标校 X，已填板块 Y」。
3. 产出是 6 节报告。**看两处即可判断质量**：① 每条问题是否带「依据」标签；② 总览的「降级项汇总」是否列出了因缺比对源而没查的项。这两处空着说明执行不合格，请反馈。
4. 反馈请带上 SKILL.md 里的 `version` 值。
