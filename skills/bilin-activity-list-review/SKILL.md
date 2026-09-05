---
name: bilin-activity-list-review
description: 审核美本申请的 Common App 活动列表：对照 intended major、target schools 与 essays 评估。Use when 审核/评估 活动列表、activity list、EC list、打分、排序、提修改建议、查专业匹配/学校匹配/主文书矛盾、查真实性与可核查性。产出中文 8 节报告 + 外教英文 clean version（分专业排序建议 + 按重要性分级的修改建议，必须英文、简洁）。每条结论必须有出处标签（[原文]/[材料]/[官方 URL]/[检索]/[推导]/[缺]）；改写作案凡材料没有的数字与头衔一律写 {{占位符}}，不替学生编。多 ED 候选或专业候选时输出学校×专业矩阵。给现状分与改后预期分。开工前必须有 major 与目标校。Does NOT plan activities, write essays, or select schools — route to bilin-admissions-consultant。活动条目事实一致性核对（名称/时间/数字/年级 vs CA 表单与文书）归 bilin-commonapp-review；本 skill 的 essay coherence 只评叙事与定位层面，活动逐条事实核对以 bilin-commonapp-review 为准。
license: Proprietary
metadata:
  org: bilin-admissions
  version: "1.2"
---

# 比邻留学 · 活动列表评估

审核**已存在**的美本申请活动列表，判断它撑不撑得起学生的申请定位。

核心比喻：活动列表 = 简历，**Major = 岗位**，**学校（尤其 ED 校）= 公司**，PS = 个人故事，补充文书 = Why this company。**没有岗位，简历无从评估。**

## 何时用 / 何时不用

**用**：已有活动列表，要打分、排序、提修改建议、查匹配度、查真实性。

**不用**（归 `bilin-admissions-consultant`）：从零规划活动、选校、定专业。也不写文书——本 skill 只**读**文书做一致性校验。公众号文章归 `bilin-wechat-essay-write`。

## 输入门槛（硬闸）

开工前必须拿到。**缺任一项就停下来发 [`references/INTAKE.md`](references/INTAKE.md) 清单，不要硬推**。

1. **申请 Major**（必填）—— 可多个候选，但**至少一个确定**；专业未定则硬闸拦截
2. **目标校 / ED 校**（必填）—— 可多个候选；ED 未定可以开工，但学校匹配度只能给共性结论，报告显著位置标注
3. **活动列表原文** —— 每条含 `title` / `description` / `position` / `time`
4. **主文书 + 补充文书**（optional）—— 有则查一致性，无则标 `N/A`
5. **其他材料**（强烈建议）—— 作品集、活动信息表、会议逐字稿、成绩单、推荐信。这是出处对账的地基，见 `EVIDENCE.md`

## 工作流

1. **收件校验 + 建材料索引** → 缺必填就停，发清单；列齐手里所有材料的文件名清单（`FIELD-CHECKLIST.md` 第 0 步）。
2. **判定是否矩阵化** → ED 候选 ≥2 或专业候选 ≥2 就走 [`ED-MAJOR-MATRIX.md`](references/ED-MAJOR-MATRIX.md)，否则单一组合。
3. **检索学校偏好** → 逐（学校 × 候选专业）检索官方 criteria。**必须检索、必须留 URL 和检索日、必须做时效判定**，不许脑补；查不到标"待核实"。见 `EVIDENCE.md` 学校依据卡。
4. **三层匹配评分** → 读 [`references/SCORING.md`](references/SCORING.md)，打整体 + 专业 + 学校 + 文书，各 0-6（学校匹配多候选时逐组合给分）。
5. **逐字段审核 + 标风险** → 读 [`references/FIELD-CHECKLIST.md`](references/FIELD-CHECKLIST.md) 逐条过四字段 + 出处对账表；读 [`references/REDMARK.md`](references/REDMARK.md) 定级并算出独立活动占比。
6. **排序建议** → 多组合时先做矩阵收敛（`ED-MAJOR-MATRIX.md`），再给锚定顺序和差异。
7. **逐条修改建议** → 按 [`references/REPORT-TEMPLATE.md`](references/REPORT-TEMPLATE.md) §7 写，占位符纪律生效。
8. **出报告 + 外教版** → 中文报告按 REPORT-TEMPLATE §0–§8，外教英文版按下 `CLEAN-VERSION.md`。**出报告前跑 `EVIDENCE.md` 五种编撰模式自查，交出两份产物。**

## 输出契约

**两份产物，同时交付：**

1. **中文报告**（§0–§8）：更正与撤回 → 一页概览（现状/预期分）→ 主题定位 → 三大匹配 → ED×专业矩阵 → red mark → 排序 → 逐条修改 → 综合判断
2. **外教英文版**：独立文件，只含 分专业排序 + 按重要性分级的修改建议，英文、≤1 页、无分数无颜色无 URL。规格见 `CLEAN-VERSION.md`

四个 0-6 分：**整体 / 专业匹配 / 学校匹配 / 文书一致性**，每维给**现状 → 改后预期**两个数。Red mark 三级：**黄（注意）→ 橙（必改）→ 红（重做）**。

**0-6 是改进指引用的诊断分**，不对应、不预测任何学校的内部 reader 评分——各校量表不同（有的 1-7、有的 1-9），不要拿去逼近或换算。判据来自 Common App 活动列表的跨校通用标准，见 `SCORING.md` 开篇。

Common App 系统级约束（10 条上限、字符数）**不用管**，系统自己会拦。

## 八条铁律

1. **无专业、无学校 → 不开工。** 专业未定是硬闸；ED 未定可开工但标共性结论。
2. **无出处的事实不许写进报告。** 每条事实性陈述带标签（`EVIDENCE.md` 七类），指不出出处就删掉或改占位符。
3. **改写作案不许替学生编内容。** 材料里没有的数字、机构、头衔、术语，一律 `{{占位符}}`。这五类编撰（头衔升级/跨条移植/术语加料/空白填充/年限拉长）是 P0 事故，出报告前逐条自查。
4. **学校匹配度必须检索、留 URL、留检索日、判时效，不许脑补。** 查不到标"待核实"，过期页面降级或标"需二次确认"。
5. **分数必须配顾问式段落**——比邻禁止冷冰冰的多维评分表，每个分数后面跟一段人话；且给**改前/改后预期分**，预期分只能由本报告已写出的建议支撑。
6. **ED 候选和专业候选都要给全，逐组合出结论。** 不给矩阵等于拿一个组合的结论代表全部。
7. **真实性存疑必打 red mark，独立活动占比必算。** 但「材料里查不到」≠「与材料矛盾」，两者定级不同（`REDMARK.md` 两条区分）。
8. **不替家长做决定，但必须说清位次**：现在什么水平 + 三大风险 + 如果只改三件事该改哪三件。

## 相关资源（按需加载）

| 文件 | 何时读 |
|---|---|
| [`references/INTAKE.md`](references/INTAKE.md) | Step 1 缺件时（可直接转发对接人） |
| [`references/EVIDENCE.md`](references/EVIDENCE.md) | **全流程**：出处标签、五种编撰模式、学校依据卡、占位符。开工前必读 |
| [`references/SCORING.md`](references/SCORING.md) | Step 4 打分前 |
| [`references/REDMARK.md`](references/REDMARK.md) | Step 5 标风险时 |
| [`references/FIELD-CHECKLIST.md`](references/FIELD-CHECKLIST.md) | Step 5 逐条审核时 |
| [`references/ED-MAJOR-MATRIX.md`](references/ED-MAJOR-MATRIX.md) | Step 2/6 多候选时 |
| [`references/CLEAN-VERSION.md`](references/CLEAN-VERSION.md) | Step 8 出外教英文版时 |
| [`references/REPORT-TEMPLATE.md`](references/REPORT-TEMPLATE.md) | Step 7/8 出报告时 |
| [`references/gold-6-yale-jason/README.md`](references/gold-6-yale-jason/README.md) | 打分前建立"强列表长什么样"的直觉 |

## 已知边界

只评成型列表，不做从零规划；学校匹配度依赖公开资料质量，**且官网常挂过期信息，时效判定是硬动作**；真实性只做文档层面可核查性判断，做不出处对账时如实标 `[缺]` 进待补清单，不下"造假"结论。