# Changelog

本文件记录 bilin-skills 的每次实质变更。它是向比邻交付时的版本凭证，改动即更新。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

## [Unreleased]

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

- [ ] 把 `~/Project/bilin-share/skills/` 下的 4 个 shareflow skill（case-screener / shareflow-builder / shareflow-review / shareflow-to-article）收编进来，届时 skill 只存在一处
- [ ] 三个 skill 的 frontmatter 补 `version` 字段
- [ ] 接入远端（GitHub private），并确认是否给比邻开只读权限
