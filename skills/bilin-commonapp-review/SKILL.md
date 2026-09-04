---
name: bilin-commonapp-review
description: 审核 Common App 表单填写的错误与一致性：10 大模块（Profile/Family/Education/Testing/Activities/Writing/Courses & Grades/Supplements/Recommenders & FERPA/My Colleges）逐块查错 + 跨模块一致性核对。Use when 审核/检查/复核 Common App 填写、CA 表单、查填写错误、提交前终检、查姓名/GPA/活动名一致性、查小时周数合理性、查 Taken 次数、查标化政策、查推荐人提交状态/FERPA、查 ED/EA 轮次与学院选择、查补充文书串稿。产出红/橙/黄三级问题清单 + 跨模块一致性专项 + 待顾问确认清单 + 一页总览。支持分次提交（填到哪审到哪）。活动条目事实一致性（名称/时间/数字/年级/字段逻辑/家庭责任/排序类别级倒挂）归本 skill；活动质量/打分/具体位次排序/重写 route to bilin-activity-list-review；不规划活动/选校（bilin-admissions-consultant）、不写文书。
license: Proprietary
metadata:
  org: bilin-admissions
  version: "1.4"
---

# 比邻留学 · Common App 表单填写审核

审核**已填写的** Common App 表单，抓填写错误、合规问题和跨材料不一致，防止低级失误毁掉一份好申请。

核心定位：**查错，不打分。** 填对就是对的——没有"6 分的姓名"或"4 分的 GPA 填报"，只有「一致/不一致」「合规/违规」。质量评估（活动价值、排序、文书好坏）归别的 skill，本 skill 只保证**这份表填得没有错**。

## 何时用 / 何时不用

**用**：顾问填完（或填了一部分）CA 表单，要查错误、查一致性、提交前终检。

**不用**（归别的 skill）：
- 活动列表的**质量评估 / 打分 / 具体位次排序 / 重写建议** → `bilin-activity-list-review`（本 skill 查 Activities 的**事实一致性**：名称/时间/数字/年级与文书及材料的核对、小时周数合理性、暑假年级归属、家庭责任经历体现、**排序类别级明显倒挂**。事实核对结论以本 skill 报告为准，activity skill 的 essay coherence 只评叙事层面）
- 从零规划活动、选校、定专业 → `bilin-admissions-consultant`
- 写 / 改文书本身 → **本仓库没有申请文书写作 skill**，改写交顾问人工；战略层的 Why Us 定位可咨询 `bilin-admissions-consultant`。本 skill 只**读**文书做一致性校验，不代写、不改写

## 输入门槛（硬闸）

开工前必须拿到，**缺任一项就停下来发 [`references/INTAKE.md`](references/INTAKE.md) 清单，不要硬推**：

1. **CA 填写内容**（必填，至少一个板块）—— 截图 / 文本均可
2. **目标校清单**（必填）—— Testing 政策核对、Supplements 检查都依赖它

以下**有则启用对应检查，无则在报告标「无法核验」**，不阻塞开工：
- 比对源：护照信息页、成绩单、标化成绩单（姓名/生日/GPA/Taken 次数等硬校验）
- 主文书 + 补充文书（跨板块一致性）
- 申请 Major（Activities 与专业相关度检查）

## 工作流

1. **收件校验** → 缺必填就停，发清单。确认本次覆盖哪些板块（分次提交是常态）。**判定申请季**：非当季案例（往季复盘 / 已提交材料）按 SEASON-2027.md 的「历史季案例运行模式」切换取数规则，并在报告总览注明。
2. **逐模块查错** → 读 [`references/MODULE-CHECKLISTS.md`](references/MODULE-CHECKLISTS.md)，对已覆盖板块逐条过检查项。审完 Activities 后用一句话提示对接人：是否同轮执行 `bilin-activity-list-review`（质量评估），不展开。**Recommenders & FERPA、My Colleges 两模块逐校核对，缺目标校清单则该模块标「未覆盖」而非「通过」。**
3. **跨模块一致性** → 读 [`references/CROSS-MODULE.md`](references/CROSS-MODULE.md)，做姓名 / GPA / 活动名 / 年级归属的交叉核对。
4. **标化政策检索** → 目标校逐个检索官网核实标化要求。**必须检索，不许脑补**；查不到标「待核实」。当季案例先查 [`references/SEASON-2027.md`](references/SEASON-2027.md) 已核实的政策记录避免重复检索；**历史季案例该表不可复用**，按当季重新检索。
5. **定级** → 读 [`references/SEVERITY.md`](references/SEVERITY.md)，红/橙/黄三级。**每条结论标依据标签**，标签决定等级天花板（铁律 6）。
6. **出报告** → 按 [`references/REPORT-TEMPLATE.md`](references/REPORT-TEMPLATE.md) 写。

## 输出契约

报告结构（分次提交时未覆盖板块在总览标「未覆盖」）：

1. **一页总览** —— 各板块状态（✅通过 / 🟡🟠🔴 有问题 / ⚪未覆盖 / ⚪无法核验）+ 问题计数
2. **逐模块问题清单** —— 每条含：等级 / 涉及字段 / 问题原文 / 改法 / **依据标签**
3. **跨模块一致性专项** —— 姓名链 / GPA 链 / 活动名链 / 时间线链，逐链结论
4. **待顾问确认清单** —— 材料里查不到、必须人核实的事（班级排名是否公布、复杂家庭情况等）
5. **终检结论**（全量时）—— 可否提交；不可提交则列出必改项
6. **待向官方确认清单** —— 事实不明/来源冲突项（❔），单列、不作为违规判据

**红/橙/黄三级**：黄（注意）→ 橙（必改）→ 红（会导致材料无法归档 / 触发审核预警，必须改）。

## 六条铁律

1. **没有比对源，硬校验降级不豁免。** 姓名一致性没有护照就标「无法核验」进待确认清单，不能默认没问题。
2. **标化政策必须逐校检索，不许脑补**；查不到标「待核实」。政策年年变，去年的结论不能沿用。
3. **只查错，不评审。** 不给表单打分、不评价活动价值——那是 `bilin-activity-list-review` 的事（唯一例外：A4 排序**类别级明显倒挂**按 🟡 内联提示，具体位次与重写仍路由）。发现质量问题可以一句话提示路由，不展开。
4. **每条问题必须给可执行的改法**，具体到"改成什么"，不能只说"建议修改"。改法只能来自材料与依据本身——**不许替学生编内容**（编获奖比率、编职业描述、编活动细节），只能指出缺什么、让顾问向学生取值。
5. **待顾问确认清单不是垃圾桶。** 只放真正需要人工核实的事实性问题，不放本 skill 该查却没查的懒账。
6. **每条结论必须有依据标签，无依据不许写。** 五类标签见 [`references/MODULE-CHECKLISTS.md`](references/MODULE-CHECKLISTS.md) 顶部「依据纪律」：`[顾问]` / `[官方]` / `[检索 YY-MM]` / `[推导]` / `[待确认]`。**标签决定等级天花板**：`[待确认]` 不进红橙黄；二手 `[检索]` 最高 🟠；🔴 只能由 `[官方]`、`[推导]` 或与比对源的直接冲突支撑。说不出依据就是幻觉，宁可漏报。

## 相关资源（按需加载）

| 文件 | 何时读 |
|---|---|
| [`references/INTAKE.md`](references/INTAKE.md) | Step 1 缺件时（可直接转发对接人） |
| [`references/MODULE-CHECKLISTS.md`](references/MODULE-CHECKLISTS.md) | Step 2 逐模块查错时 |
| [`references/CROSS-MODULE.md`](references/CROSS-MODULE.md) | Step 3 跨模块核对时 |
| [`references/SEASON-2027.md`](references/SEASON-2027.md) | Step 4 检索前后（季节性参数 + 已核实政策记录） |
| [`references/SEVERITY.md`](references/SEVERITY.md) | Step 5 定级时 |
| [`references/REPORT-TEMPLATE.md`](references/REPORT-TEMPLATE.md) | Step 6 出报告时 |

## 已知边界

- 只审已填的表，不代填、不规划
- 截图输入依赖 OCR/视觉识别，字段辨认存疑时标「请顾问复核字段值」而不是猜
- 学校排名是否公布、家庭内部情况等无法从材料验证的，一律归待确认清单
- 标化政策以官网检索为准，检索不到不脑补
- 季节性参数只覆盖当季（SEASON-2027），且**多为 CA 系统自拦项，默认只作提示不作硬判据**；参数超期或历史季案例按该文件的「时效自检 / 历史季案例运行模式」降级运行
- 顾问经验类判据（活动时长区间等）超出即提示 + 要顾问背书，不单独判错；只有物理/逻辑不可能才上红
- 涉及学生隐私与安全的敏感内容（文书披露的创伤、家庭变故）只做填报口径核对，不在报告复述叙事细节，转主顾问人工处理
