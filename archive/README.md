# 归档区

这里放**已停用但不想丢**的 skill。

## 与 skills/ 的区别

| | `skills/` | `archive/` |
|---|---|---|
| 状态 | 在用 | 已停用 |
| 是否被 `install.sh` 软链到 agent 加载目录 | 是 | **否** |
| 是否会被 agent 自动触发 | 会 | **不会** |
| 改动是否需要更新 CHANGELOG | 需要 | 不需要 |

`install.sh` 只扫描 `skills/` 目录，所以放在这里的内容不会被激活、不会被 agent 读到。这是刻意的——归档就是归档，不要悄悄生效。

## bilin-share/

比邻线下分享会工作流，共 4 个 skill + 1 个共享目录：

- `case-screener` — 初筛录取 case，判断是否值得深挖
- `shareflow-builder` — 从 case 生成线下分享会完整内容
- `shareflow-review` — 对分享会成稿做系统 review
- `shareflow-to-article` — 把分享会内容重构为公众号文章并执行公开性降级
- `_shared` — 共享的方法论、品牌语料、原始素材

**归档原因**：2026 年比邻分享会工作流期间开发和使用，之后该工作流未再继续，2026-08-28 归档。

**历史**：完整提交历史保留在 `~/Project/bilin-share`，快照取自该仓 `80fdd18`（feat/bilin-case-shareflow-skills 分支）。本目录是快照，不含历史。

**注意**：`_shared/` 下含比邻内部材料——`case-examples/chuhao-case.md`（真实学生案例）与 `source-materials/录取 Case 宣传操作手册.md`。**不要外传。**

## 如何重新启用

```bash
git mv archive/bilin-share/shareflow-builder skills/
```

然后：

1. 检查 `SKILL.md` 的 `name` 字段是否与目录名一致
2. 补 `version` 字段
3. 在 `CHANGELOG.md` 记一条 `### Changed`：从归档恢复
4. 跑 `./install.sh` 重新软链
