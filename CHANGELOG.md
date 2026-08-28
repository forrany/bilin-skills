# Changelog

本文件记录 bilin-skills 的每次实质变更。它是向比邻交付时的版本凭证，改动即更新。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

## [Unreleased]

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
- [ ] 三个在用 skill 的 frontmatter 补 `version` 字段
- [ ] 确认远端仓库可见性为 private，并决定是否给比邻开只读权限
- [ ] 处理 `~/Project/bilin-evalution-system` 的 69 个未提交改动（含真实学生姓名，
      需先决定脱敏策略再提交）
