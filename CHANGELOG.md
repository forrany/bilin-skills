# Changelog

本文件记录 bilin-skills 的每次实质变更。它是向比邻交付时的版本凭证，改动即更新。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

## [Unreleased]

### Added

- **新 skill：`bilin-activity-list-review` v1.0**（首发版，可交顾问使用）。美本申请活动列表评估。

  来源：2026-08-28 客户录音（`~/Downloads/bilin-活动列表对话录音.txt`）+ 客户第二轮确认
  （red mark 分级并给占比红线 / 报告需评分与综合评估 / 不内置 Common App 字段约束），
  并参照客户提供的耶鲁录取样例（Jason，耶鲁 AO 评 EC=6；耶鲁用 1-7 制）。

  **已完成干跑验证**（详见下节）：四维均打到量表顶端，硬闸有效，反例压分正确。
  v0.2 是验证后按实测发现做的评分体系加固；**v1.0 关闭了全部 5 条开放问题**（见本节末）。

  核心设计：
  - **输入硬闸**：申请 Major 与目标校（尤其 ED 校）必填，缺则停工并发信息收集清单。
    客户原话：没有岗位，简历无从评估。主文书 + 补充文书 optional，缺则文书一致性标 N/A。
  - **4 维 0-6 评分**：整体综合分 / 专业匹配度 / 学校匹配度 / 文书一致性。
    **这是改进指引用的诊断分**，不对应也不预测任何学校的内部 reader 评分。Red mark 会压分
    （红 → 整体上限 3 分）。
  - **Red mark 三级**：黄（注意）/ 橙（必改）/ 红（重做），附**真独立活动占比红线**
    （0-30% 绿 / 30-50% 黄 / 50-70% 橙 / ≥70% 红）。
  - **7 节固定报告模板**：概览 → 主题定位 → 三大匹配 → Red mark → 排序 → 逐条修改 → 综合判断。
  - 逐字段审核：每个活动的 title / description / position / time 四字段逐一给结论。
  - 不内置 Common App 系统级约束（条数、字符数），只做 review。

  资源：
  - `references/` 6 份：SCORING / REDMARK / FIELD-CHECKLIST / REPORT-TEMPLATE / INTAKE /
    gold-6-yale-jason
  - `references/gold-6-yale-jason/README.md`：耶鲁录取、EC 6 分满分样例的**文字版**
    （活动全表 + 四维拆解 + 可提取的六个模式 + 老师评语校验器）。**比邻内部教学资产，不要外传。**
    原始截图 4 张**已删除**——图片承载的是具体学生原文，skill 需要的是"6 分长什么样"的抽象标准，
    后者已由文字完整吸收，且文字更好检索。评估真实学生时不需要回看 Jason 的截图。
  - `evals/`：trigger 正例 12 / 负例 10 / 近邻 3，配专属 `semantic_config.json`
  - `reports/`：output-risk-profile（10 条风险）、artifact-design-profile、
    validation-run（干跑完整记录，含 6 分与 2 分两个完整报告样例）

### v0.2 — 干跑验证后的加固

派 subagent 以资深顾问角色**独立**使用 skill 跑真实材料（事先不告知真实分数），结果：

| 测试 | 结果 |
|---|---|
| Jason / Yale 主测试 | **四维 6/6/6/6，与真实 EC=6 一致**（锚点可被独立执行者复现） |
| 硬闸测试（缺专业+缺学校） | 正确拦截，发出 INTAKE 清单 |
| 低分反例（虚构 CS/CMU 问题列表） | 2/2/2/2 + 🔴1 🟠3 🟡2 + 真独立占比 70%，五项检验全通过 |

客户 7 条诉求：**5 条完全达成，2 条部分达成**（学校匹配度依赖检索质量；顾问口吻缺负向样例）。

据此做了 5 处加固：
- `SCORING.md` **专业匹配度加「成果门坎」**：无 closed-loop 成果（发表/获奖/上线/被采用/被收藏）
  一律 4 分封顶。堵住"上了很多课但没产出"被打出虚高分的隐蔽漏洞——这是实测发现的最大风险。
- `SCORING.md` **学校匹配度加「检索失败给分规则」**：查不到默认 3 分（中性）+ 标"待核实"，
  0 分只留给"对接人拒绝提供"，不留给"我查不到"。
- `REDMARK.md` **橙色新增第 6 条**：排在前 3 位的活动若描述全是空话/感受，触发 🟠。
  把最宝贵的版面浪费在正确的废话上，危害不低于 Position 不匹配。
- `REPORT-TEMPLATE.md` **第 2 节补负向示范**：主题不成立时的标准写法（附错误示范对比），
  防止退回"涉猎广泛、综合素质全面"这类委婉废话。
- `FIELD-CHECKLIST.md` **通读步骤做实**：读完必须回答三个问题（两个词概括学生 /
  只能看一条是哪条 / 哪条让你皱眉），先见林再见木。

  校验（yao-meta-skill Production 模式 gate 全绿）：
  - `validate_skill.py`：ok
  - `resource_boundary_check.py`：ok，初始加载 947/1000 token，质量密度 100.3，无警告
  - `trigger_eval.py`：precision 1.0 / recall 1.0（正 12/12、负 10/10、近邻 3/3）

### v1.0 — 关闭 5 条开放问题（2026-08-31，客户确认）

**背景澄清**：Review Form 是**耶鲁招生官**给的评语与打分，耶鲁用 **1-7 制**（7 为最高），
样例的 EC=6 属"很强"而非满分。客户明确指出：**各校评分规则不同，打分不必去逼近样例或照搬示例**；
但活动列表**确实存在跨校通用标准**——因为 Common App 全平台只有一份表，那位优秀学生拿到了多个 offer。

据此做了两处关键修正：

- **量表与任何学校内部评分彻底解耦。** `SCORING.md` 开篇新增"这个分数是什么、不是什么"：
  是改进指引用的诊断分；不对应任何学校的 reader 评分、不预测录取、不以单个标杆学生为校准目标。
  `SKILL.md` 输出契约同步写明，避免顾问误用。
- **新增「通用标准」8 条作为打分依据**（`SCORING.md` 开篇）：有主线 / 深度>广度 /
  有 closed-loop 成果 / 可核查 / 角色与实质匹配 / 投入真实 / 与文书咬合 / 表达高效。
  这 8 条是锚，不是某个学生的特征。

**纠正一处此前的错误表述**：样例 README 原写"EC = 6（满分档）"，且验证记录称"四维 6/6/6/6
与真实 EC=6 一致"——**两个量表根本不同（0-6 vs 1-7），数字相同纯属巧合，不能算互相验证**。
已改为：有意义的是"独立执行者用这套锚点能识别出这是一份顶端列表"，不等于分数对齐。

5 条问题的最终裁决（完整记录见 `manifest.json` 的 `resolved_questions`）：

| # | 裁决 |
|---|---|
| 1 | 量表不与耶鲁 1-7 对齐 → 做成独立诊断分，扎根 Common App 通用标准 |
| 2 | 红 mark 分级处置：1 条红 = 该条重做；≥2 条红 或 占比≥70% = 整份重做；与文书矛盾 = 改该条并回头核文书 |
| 3 | 排序必须给到 1-10 具体位次 + 每条 20-40 字理由 |
| 4 | 老师评语不独立成维度，保留为第 2 节的 reader 视角校验器（不是人人都有，成维会造成大面积 N/A） |
| 5 | v1.0 不加轻量模式——不为想象的需求加结构，待真实使用数据证明有需求再说 |

  已知边界：只评成型列表不做从零规划；学校匹配度依赖公开资料、且依赖执行者的解读能力
  （同一份搜索结果，新手可能给 4 分、资深顾问给 6 分，建议头几份报告人工复核这一维）；
  真实性只做文档层面可核查性判断。

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
