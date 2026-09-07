# 外教版 Clean Version 规格

第二份产物。中文报告给顾问与家长，**这一份只给外教**（native-speaker essay coach / writing tutor）。

顾问的原话定义了它的边界：

> 只给出：分专业的活动排序建议和活动修改建议，修改建议按照重要性评级，用英文写；简洁易读，减少外教的阅读工作量。

**这不是中文报告的翻译，是投影。** 翻译会把 7 节 4000 字变成 7 节 4000 词，外教的阅读量没有减少。投影是只留下"外教要动手做的事"，其余全部丢掉。

---

## 硬性边界

### 正文只放两样东西

1. **排序建议**（一张表，含各专业的位次）
2. **修改建议**（按重要性三档，每条给 current / suggested）

标题、学生 / 日期 / 专业元数据，以及存在 `{{ }}` 时的占位符安全说明属于操作性脚手架，不算第三类内容。**不要再加定位段、评分摘要、策略背景或结论。**

### 明确不放（放了就不 clean）

| 不放 | 原因 |
|---|---|
| 0-6 四维分数 | 诊断分是给顾问的改进指引，外教据此无动作可做 |
| red mark 三色体系、独立活动占比 | 内部风险分级语言，外教不需要学 |
| 学校依据卡、URL、检索日期 | 出处是给顾问核查用的，外教不核查 |
| ED 策略推理、矩阵四格分 | 定校是顾问的决定，不是外教的 |
| 单独的 Positioning / 定位段 | 这是顾问判断，不是外教需要执行的排序或修改动作 |
| 编撰自查记录（§0） | 内部质量记录 |
| 任何中文正文 | 外教读不了；占位符里的中文说明是唯一例外（见下） |
| 学生隐私/敏感叙事细节 | 只给要改的文本，不复述背景故事 |

### 篇幅上限（硬约束）

- **总长 ≤1 页 A4**（约 500 词）。超了就是没做投影。
- 条目数：`Must fix` ≤3、`Should fix` ≤5、`Polish` 合并成 1 行清单。**总条目 ≤10。**
- 超上限的处理：**不是压缩每条，是砍条目**。留最重要的，其余在文末写一行 `Additional minor items available on request.`

---

## 三档重要性

用英文动词短语，不用颜色、不用 emoji。外教一眼知道做不做。

| 档 | 标签 | 含义 | 对应内部等级 |
|---|---|---|---|
| 1 | **Must fix** | 不改会伤害可信度或直接矛盾 | 🔴 + 关键 🟠 |
| 2 | **Should fix** | 明显拉低质量，但不致命 | 🟠 |
| 3 | **Polish** | 语法、用词、标点 | 🟡 |

**排序纪律**：三档之内按活动编号升序，**不要再按其他维度二次排序**——外教是照单执行，编号顺序最省认知。

---

## 固定结构（照这个写）

````markdown
# Activity List — Revision Brief
**Student:** {{name}}　**Date:** {{date}}　**Intended majors:** {{Major A}} / {{Major B}}

> **Note on `{{ }}`:** these are facts we do not have. Please ask the student —
> do not fill them in yourself, and do not leave them in the final application.

## 1. Recommended order

| New pos. | # | Activity | {{Major A}} | {{Major B}} |
|---|---|---|---|---|
| 1 | 3 | Original composition "…" | 1 | 4 |
| 2 | 1 | … | 2 | 2 |

Only #3 and #7 change place between the two majors; the other eight stay put.

## 2. Revisions

### Must fix

**#3 · Position**
- Current: `Producer`
- Suggested: `Composer & Performer`
- Why: the score credits production to another person.

### Should fix
…

### Polish
#2 tense, #5 possessive, #8 capitalisation — see marked text below.
````

没有任何 `{{ }}` 占位符时，删除 Note；不要保留一段与本次任务无关的说明。

### 每条修改建议的三行格式

```
**#n · Field**
- Current: `原文照抄`
- Suggested: `可直接粘贴的英文` 或 `{{需要学生提供的事实}}`
- Why: ≤15 词，一句话。
```

四条要求：

1. **Current 必须是原文逐字照抄**，不许概述。外教要能在 CA 里搜到这串字。
2. **Suggested 必须可直接粘贴**（除占位符外）。给方向不给文案 = 把工作推给外教。
3. **Why ≤15 词**，说清"改的依据"不是"改得更好"。这一行是外教判断要不要采纳的唯一信息。
4. **同一条活动的多个字段合并在一个块里**，不要拆成四个条目——那会让 10 条活动变成 40 个条目。

---

## 一致性门禁（生成前必过）

**Clean version 里不许出现中文报告里没有的任何主张。** 它是投影，不是新一轮创作。

生成后逐条比对，问三句：

1. **这条建议在中文报告 §7 里有对应条目吗？** 没有 → 删掉，或先回去补进中文报告。
2. **这个 `Suggested` 文案与中文报告里的改写文案一致吗？** 不一致 → 以中文报告为准（那一份过了 `EVIDENCE.md` 的编撰自查）。
3. **占位符有没有在这一版被"顺手填上"？** 英文写作时补全句子是本能反应，**这是最容易在投影阶段重新引入幻觉的地方**。逐个占位符核对。

第 3 条是这道门禁存在的主要理由。中文报告写 `{{总播放量}}`，英文版为了句子通顺写成 `several thousand streams`——幻觉就这样回来了，而且看起来完全无害。

---

## 交付方式

- **独立文件**，不作为中文报告的一节。文件名建议 `revision-brief-{{student}}-{{date}}.md`。
- 默认 Markdown。需要 Word/PDF 时走 `bilin-admissions-consultant` 的 `references/OUTPUT.md`（含 logo 规范）。
- **两份产物必须同时交付**，并在中文报告 §8 写一行「外教版已随附，共 N 条建议（Must N / Should N / Polish N）」——让顾问知道外教收到了什么，不至于两边口径不一。

---

## 自查清单（交付前）

- [ ] 全文 ≤1 页，条目 ≤10
- [ ] 无分数、无颜色分级、无 URL、无中文正文
- [ ] 正文只有 Recommended order 与 Revisions；无 Positioning 或第三类内容
- [ ] 每条有 Current（逐字原文）/ Suggested / Why（≤15 词）
- [ ] 排序表含各专业位次 + 一句差异说明
- [ ] 占位符原样保留，文首有 `Note on {{ }}` 说明
- [ ] 每条都能在中文报告里找到对应
- [ ] 无学生隐私叙事细节
