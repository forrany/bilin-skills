# Changelog

本文件记录 bilin-skills 的每次实质变更。它是向比邻交付时的版本凭证，改动即更新。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

## [Unreleased]

### Changed

- **`bilin-admissions-consultant` v3.0 → v4.0**（重大升级）。来源：`~/Downloads/bilin-admissions-consultant.skill`
  （2026-08-28 导出，内容实为 5-23 定稿）。此前仓库收编的 v3.0 来自 `~/.skills-manager/skills/`，
  该处副本自五月起就未跟上，一直是过期的 v3.0。

  主要变化：
  - 铁律由四条增至五条，新增「**方向先确认，再展开**」
  - 原 Step 8 拆为两步：新增 **Step 8「方向设计与人工确认（硬闸）」**，要求先产出轻量
    《方向预案》交人工确认，通过后才允许写完整方案；原写作步骤顺延为 Step 9，
    不可逆决策顺延为 Step 10
  - 新增 `references/STRATEGY.md`（179 行）：战略创造六步法、八个坑反模式、候选方向发散、
    合格方向标准、《方向预案》模板
  - 新增 `references/CASE-LIBRARY.md`（72 行）：标杆案例与反例库，方向设计与写作前各看一遍
  - `references/WRITING.md` 报告结构改为「方向判断开篇」：方向是结论，结论先行，
    学生画像降级为第 2 章用来支撑已抛出的方向；新增「设计理念显性成段」「招牌项目独立成节」等自检项

- 三个 skill 的 frontmatter 统一补 `metadata.version`：
  - `bilin-admissions-consultant` 4.0（随 v4.0 包带入）
  - `bilin-wechat-essay-write` **3.0** —— 有据可查：与 `~/.agents/skills/bilin-wechat-essay-write-v3.zip`
    内容逐字节一致
  - `bilin-wechat-topic-brainstorm` **1.0** —— 无历史版本产物可比对，按此前从未打过版本处理，
    仅作为基线。若实际已有更高版本，请更正本条

### Added

- `archive/bilin-share/`：收编比邻分享会工作流的 4 个已停用 skill（case-screener /
  shareflow-builder / shareflow-review / shareflow-to-article）及 `_shared/` 共享目录。
  以**归档**状态收编：位于 `archive/` 而非 `skills/`，不会被 `install.sh` 软链，
  因此不会被任何 agent 加载或触发。快照取自 `~/Project/bilin-share` 的 `80fdd18`。

  归档原因：该工作流 2026 年用过，之后未再继续。恢复方式见 `archive/README.md`。

## [0.1.0] - 2026-08-28

### Added

- 建立仓库，收编此前散落在 `~/.skills-manager/skills/` 下、无版本控制的三个 skill：
  - `bilin-admissions-consultant`（v3.0）
  - `bilin-wechat-essay-write`
  - `bilin-wechat-topic-brainstorm`
- `.gitignore`：`_user_meta.json`（agent 安装元数据）与 `*.zip`（发布产物）不入仓
- `install.sh`：以软链方式分发到 `~/.skills-manager/skills/` 与 `~/.workbuddy/skills/`

### Changed

- `bilin-admissions-consultant` 采用 `.skills-manager` 版本而非 `.workbuddy` 版本。后者落后一个修复：
  `references/OUTPUT.md` 中 Logo 路径仍为 workspace 相对路径 `reports/logo.png`，
  正确值应为 skill 相对路径 `assets/logo.png`（随 skill 自带 logo）。

### Notes

- 三个 skill 均未声明各自的版本号（仅 admissions-consultant 有 `version: "3.0"`）。
  后续应统一在 frontmatter 加 `version` 字段，便于按版本交付。

## 待办

- [x] 收编 `~/Project/bilin-share/skills/` 下 4 个 shareflow skill（已按归档状态完成）
- [x] 三个在用 skill 的 frontmatter 补 `version` 字段
- [x] 确认远端仓库可见性为 private
- [ ] 决定是否给比邻开只读权限
- [ ] 处理 `~/Project/bilin-evalution-system` 的 69 个未提交改动（含真实学生姓名，
      需先决定脱敏策略再提交）
- [ ] 核实 `bilin-wechat-topic-brainstorm` 的实际版本（现标 1.0，为无据可查的基线值）
- [ ] `~/.agents/skills/` 下的软链指向 `.skills-manager`，与本仓库构成三级链，
      可考虑直接指向本仓库减少一层间接
