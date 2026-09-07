# Changelog

本文件记录 bilin-skills 的每次实质变更。它是向比邻交付时的版本凭证，改动即更新。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

## [Unreleased]

### Changed

- **`bilin-activity-list-review` v1.2 → v1.3**（严格 ED 硬闸 + 描述统一性 + 外教版收口）。修复 v1.2
  将「目标校 / ED 校」标成必填、却又允许「ED 未定继续做共性评估」的自相矛盾：现在 Major、至少一个
  ED 校/候选、完整活动列表是三个独立硬闸；只有 EA / RD / 一般目标校清单不能替代 ED，缺失时不评分、
  不排序、不改写。`interface.yaml` 同步将 `ed_schools` 列为 required，`target_schools` 降为 optional。

  `FIELD-CHECKLIST.md` 新增整表描述一致性终检，覆盖平行动词结构、时态逻辑、大小写、缩写、数字格式、
  标点和术语稳定性；`REPORT-TEMPLATE.md` 要求给具体活动编号、原文和替换文本，不能只写「统一风格」。
  `CLEAN-VERSION.md` 删除 Positioning 段，正文严格只保留分专业排序与 Must fix / Should fix / Polish
  修改建议。新增 `evals/behavior_cases.json` 和 2026-09-07 回归记录，覆盖缺 ED 拦截、多候选矩阵、
  整表一致性与外教版两节限制。

- **`bilin-activity-list-review` v1.1 → v1.2**（首次真实使用失败后的防幻觉加固 + 双产物）。证据见
  `skills/bilin-activity-list-review/reports/field-feedback-2026-09-04.md`。真实学生案例（ED 候选 2 所、
  专业候选 Music + Philosophy）暴露四类问题，本版全部修复：

  **1. 出处纪律（反幻觉，回应「不能瞎编」）。** 新增 `references/EVIDENCE.md`：七类出处标签
  `[原文]`/`[材料]`/`[文书]`/`[官方 URL·检索日]`/`[检索]`/`[推导]`/`[缺]`，标签决定等级天花板；
  **五种编撰模式自查**（头衔升级/跨条移植/术语加料/空白填充/年限拉长——全是本次事故的实际形态，
  而非假想）；**`{{占位符}}` 纪律**：改写文案里材料没有的数字、机构、头衔一律写 `{{中文说明}}`，不填示例值。
  理由：编出来的内容比原文更漂亮，特别难自查，所以要求「每个数字/专有名词/头衔回材料指认」。
  `FIELD-CHECKLIST.md` 加第 5 项「出处对账」三列表；`REDMARK.md` 开篇加「依据天花板」，
  并新增「材料没有」≠「与材料矛盾」两条区分——`[缺]` 只进待补清单，不标 red mark、不下造假结论。

  **2. 学校建议要有出处、要判时效（回应「他们会放过期的东西」）。** 学校依据卡六字段：
  学校·院系 / 主张 / URL·具体页面 / 检索日 / 页面声明的适用季 / 时效判定（✅当季 ⚠️无日期 ❌往季）。
  截止日期、可选提交通道规格、学院归属三类信息最易过期，非 ✅ 一律降级。逐（校×专业）对检索，不许一张卡覆盖多格。

  **3. ED × 专业矩阵。** 新增 `references/ED-MAJOR-MATRIX.md`：ED 候选 ≥2 或专业候选 ≥2 时逐格给学校匹配分 +
  依据卡，收敛到推荐锚定组合 + 排序差异（分叉几条）；单一 ED 不变量（只能投一所）、双专业人设判据、
  空转提交通道单独成行、重跑触发条件写进报告。回应「ED 选项和专业选项没有」。

  **4. 改前/改后预期分。** SCORING.md 加「改前/改后预期分」：每维给现状→改后两个数，五条纪律 +
  涨幅自查（≥3 分回炉）。预期分只由本报告已写出的建议支撑，文案改写改不出新事实。回应「改了之后评级对比」。

  **5. 外教英文 clean version。** 新增 `references/CLEAN-VERSION.md`：独立英文文件，只含分专业排序 +
  按重要性分级（Must fix/Should fix/Polish）的修改建议，≤1 页，无分数无颜色无 URL 无中文，占位符原样保留
  并防外教自己填。报告改为**双产物交付**（中文 §0–§8 + 英文 clean version）。回应「给外教一个 clean version」。

  REPORT-TEMPLATE 重构为 §0–§8（§0 更正与撤回 / §1 概览含改前后分与锚定组合 / §4 ED×专业矩阵 / §7 逐条修改
  含出处对账 / §8 综合判断 + 交付两份）；SKILL.md 五条铁律扩为八条；manifest/interface/evals 同步；
  output-risk-profile 将编撰升为 R0 高风险并新增 R11 矩阵缺失、R12 外教版污染两条真实命中风险。

- **`bilin-commonapp-review` v1.3.1 → v1.4**（依据溯源体系 + 活动时间改逻辑优先）。两项结构性变更：

  **1. 全库依据标签（反幻觉）**。新增五类标签 `[顾问]` / `[官方]` / `[检索 YY-MM]` / `[推导]` / `[待确认]`，
  MODULE-CHECKLISTS 全部 50 余条检查项、SEASON 参数表、待确认区逐条标注来源。新增**铁律 6**：
  无依据标签的结论不许写进报告，且**标签决定等级天花板**——`[待确认]` 不进红橙黄；二手 `[检索]` 最高 🟠；
  🔴 只能由 `[官方]`、`[推导]`（物理/逻辑不可能）或与比对源（护照/成绩单/表内字段）的直接冲突支撑。
  报告模板问题格式加「依据」**必填字段**；铁律 4 补「不许替学生编内容」（编获奖比率、编职业描述）；
  checklist 外的新发现必须标 `[推导]` + 写出推导链且**首次最高 🟡**，经顾问确认后才由维护者固化——
  给 skill 成长留低风险入口。

  **2. 活动时间从「区间合规」改为「逻辑优先」**（顾问原话：有学生把一周所有时间填满，显然不合理）：
  - **第一层逻辑红线**（`[推导]`，跨季永久有效）：一周 168 h 扣在校 40–50 h、睡眠 49 h 后的物理可能性。
    学年每周合计 ≥50 h 或同一时段两地并行 → 🔴；30–49 h → 🟠；单条 `weeks/year` 超学年周数 → 🟠；
    单条 `hours/week` ≥25 h（非暑期）→ 🟠
  - **第二层经验区间**（`[顾问]`，软参考）：超区间但未触红线 → 🟡 提示 + 要顾问背书，**不判错**
  - 经验值全部固化保留（搜不到官方源），但降为参考；报告需将学年合计与暑期分列

  **季节参数分层处理**（回答「是否该让 Agent 自己检索当年要求」）：三类事实分开对待——顾问经验值固化；
  逐校标化政策强制检索（铁律 2 不变）；**平台级数值（150 字符/10 条/650 词/300 词）保留为参考但默认
  降为提示、不作硬判据**——CA 系统自己会拦，与 `bilin-activity-list-review`「系统级约束不用管」口径统一；
  仅文本稿（未粘进系统）超限才按等级判。新增**参数核实日期**（2026-09-01）+ **时效自检**：
  超 12 个月未复核则数值类检查项自动降级为提示。理由：平台数值检索噪音极大（本项目自身证据：源文档
  「AP 新增 3 门」「多邻国仅单次」两处错误均来自二手机构稿），且过期数值导致的误报比漏报危害大。

  **新增 `reports/PACKAGING.md`**：顾问试用包边界——只发 `SKILL.md` + `references/*.md`（7 文件约 51 KB），
  `reports/` / `evals/` / `manifest.json` 不进包（已核验运行时链路无依赖）；含打包命令与试用引导。
  manifest 加 `trial_package` 块。

- **`bilin-commonapp-review` v1.3 → v1.3.1**（首次真实案例干跑后加固）。隔离 subagent 只读执行 skill，
  对一份真实学生材料（国内国际学校 A-Level 体系、Fall 2023 入学、RD 单校、已提交、故意缺四类比对源）
  跑完整六步工作流。证据见 `skills/bilin-commonapp-review/reports/dry-run-2026-09-04.md`（脱敏，不含学生 PII）。

  **干跑成绩**：抓到 8 条真实问题（1🔴 同一项目在活动列表写 Founder、在 Additional Info 写 co-founded 的
  职位矛盾 / 2🟠 活动时长超档 + 父母职业笼统 / 5🟡），**零误报**；T1 Taken 次数、S5 串稿、A8 字段完整性
  三个高误报风险项正确沉默；v1.3 新增的 A7（家庭责任）首战命中；降级纪律严格执行，缺比对源时无一项默认通过。

  暴露 8 处缺陷，本版全部修复（前两项为用户指定优先）：
  - **A1 合理性参照表补四条口径定义**：「每周总小时」=同年级全部活动合计**含校外**（从严口径）；
    「总周数」=单条活动 weeks/year 上限**而非各活动合计**；暑期集中型活动单列不入学年合计；逐年级分别核对。
    此前口径不清直接决定 🟠 判定，两个执行者会得出两个结论
  - **新增「历史季案例运行模式」**（SEASON-2027）：Step 0 判定申请季 + 五类取数优先级（平台数值 /
    板块存在性 / 政策表 / 参照值 / 跨季不变逻辑）+ 已提交材料走「提交后动作双轨」，不对已提交材料写「必须改」。
    SKILL.md 工作流 Step 1/4、INTAKE 收件动作、SEVERITY 执行纪律 6 三处挂钩
  - **SEVERITY 新增执行纪律 2「一处事实只报一条」计数锚定规则**（链 3 / E3 / A1 / 更具体项四类），
    解决 E3 与 T6 抢同一问题且等级不同的重复计数
  - **报告模板六处补口**：总览标签纪律（⚪ 必带「未覆盖/无法核验」后缀，❔ 专指待官方确认）、计数纪律、
    **降级项汇总表**（按缺失比对源批量列检查项编号，替代散在正文）、**2b 标化政策检索记录小表**、
    第 5 节**提交后动作双轨**、第 6 节跨季取数规则
  - 新增 **E6**（大学学分课程未列入 Colleges & Universities，干跑外推发现）；**A5 边界收紧**为「只查有无、
    不评好坏」；**F3 补敏感项指引**（表单事实与文书敏感叙事张力：不定级、不复述叙事、转主顾问）；
    SKILL.md 已知边界补隐私条与季节边界条
  - INTAKE 写死「单校也算清单」（此前执行者需自行判定是否过硬闸）；evals 补 T23 历史季+已提交回归用例
  - manifest 新增 **validation 块**（案例画像 / 结果 / 缺陷数 / 隐私说明 / 覆盖缺口），
    known_limitations 首条由「未经干跑」改为「已完成首次干跑，当季+多校+全套比对源场景待验证」

- **`bilin-commonapp-review` v1.2 → v1.3**（终审三方审计修订）。主 leader 派遣三个互不通气的 subagent 终审 v1.2：
  源材料保真度审计 / 工程审计（14 条采纳项回文件核验 + 换季模拟）/ 路由边界裁决（Activities）。证据见
  `skills/bilin-commonapp-review/reports/final-review-2026-09-01.md`。结论：12/14 条真落地、0 条谎报、
  忠实度 8.5/10。修复 7 类问题：
  - **A4 排序升 🟡 类别级倒挂检查**（对齐 E4/E3b 先例；具体位次与重写仍路由 activity skill）——回应「活动 review
    是否该路由出去」的裁决：质量半区路由正确，错误半区（类别倒挂）应内联，否则终检静默放行
  - 补源文档遗漏：A7 家庭责任类经历（Responsibilities and circumstances）、A8 活动字段完整性与逻辑、
    F5 兄弟姐妹、T6 IB/A-Level 独立检查、T3 补专业相关示例
  - 修复定级残留：SEVERITY 🔴8 串稿补 S5 二段式限定（防误杀夏校/竞赛等合法提及）；🟠4 同步 A3 长期口径；
    🟠3 指针指错区修正
  - 配套断裂修复：INTAKE 勾选清单补两新板块 + 表单状态截图项；interface.yaml「8 大模块」→「10 大模块」+ 补输入；
    报告模板 4.5 节重编号为第 6 节（SKILL.md / manifest / interface 输出契约三处同步）
  - 政策表回填交叉验证已裁决的标化结论（Harvard 等 9 校 Required、Princeton/Columbia TO、UT Austin/UF/Purdue 等），
    全部标「二手来源，待官网复核」
  - 国际学校小时档位回归源文档明确值（15–20h）；Honors 名额/字符数值收敛进 SEASON 单文件（补 Honors 行）；
    报告图例统一（⚪=未覆盖/无法核验，❔ 专指待向官方确认）
  - 换季 runbook 按模拟结果重写（补 7 处漏网引用点、删 2 处幽灵条目、加历史证据豁免说明）；
    evals 补 T21/T22 回归用例；manifest 加 final_review 块并在 known_limitations 注明未经干跑

- **`bilin-commonapp-review` v1.1 → v1.2**（交叉验证修订）。派遣两个互不通气的 subagent 独立评审：
  A 角「留学运营与合规专家」复核上一轮事实结论 + 查修订质量，B 角「Skill 工程审计师」审内部一致性、
  路由健壮性、可执行性与仓库约定（检索时间 2026-09-01）。证据见
  `skills/bilin-commonapp-review/reports/cross-validation-2026-09-01.md`。

  **两角独立指向同一处失实**：v1.1 的 CHANGELOG 声称已修正 Challenges 措辞，`SEASON-2027.md` 实际未改。
  已在换季 runbook 加入「改完自核对引用点」步骤——评审报告的「✅ 已改」必须回文件复核，不看报告自述。

  采纳 14 条，结构性补强如下：
  - **新增第九模块 Recommenders & FERPA（R1–R6）**：推荐人提交状态、FERPA 签署、counselor 指派、
    漏分配到学校——提交前一刻最经典事故，纯表单状态可查
  - **新增第十模块 My Colleges（M1–M5）**：轮次选错、A&S 选成 Engineering、漏答必答 Question
  - **S5 串稿改二段式判据**：区分「论述该校为何适合我」与「个人经历提及他校」（夏校/竞赛/推荐人隶属/
    父母校友均属后者），解决误报后保留 🔴
  - **换季 runbook + 数值收敛**：字数/字符上限等季节参数单点定义在 SEASON-2027.md，checklist 只写
    「见 SEASON-2027.md」。此前数值散落三个文件、文件名硬编码 6 处，「换季只改一个文件」的承诺是假的——
    明年换季会留下一份半新半旧但能跑完流程的 skill，静默错误比报错更危险
  - **定级打架修复**：SEVERITY 🟠3 改为 E3 一致性判据（专业匹配移出橙区）、🟠7 移除多邻国、
    🟡6 删除（Why Us 已路由化）；T5b 补替代动作，避免顾问遇多次 DET 时卡住
  - **死路由修正**：写明本仓库无申请文书 skill，改写交人工（原指向不存在的「对应写作 skill」）
  - 链 1 补 DET 账号注册名；链 3 去重（汇总 A2/S2 结论不重复产条目）；T3 加 AP 全报分支；
    S6 AI 辅助声明归待确认；A1 补国际学校/Gap year 档位
  - **evals 补到 20 条**（含 5 条路由压力测试句）+ 新建 `semantic_config.json`，对齐 activity skill 规格
  - **Yale 标化政策推翻上一轮**：2026-05-27 官方公告后 test-flexible 已终止，Yale = Required
    （上一轮判为「口径冲突」即收工，是误判）。另补 Princeton/Columbia 本季仍 TO、2027-28 转强制

  部分采纳 2 条、明确不采纳 2 条：S5 降级为提示（串稿是终检最高频不可逆事故，保留 🔴）；
  改 consultant 的 description（风险外溢，本 skill 侧已用强语义词压过，真抢单再动）。

- **`bilin-commonapp-review` v1.0 → v1.1**（同行评审修订）。subagent 以资深美本顾问视角评审 +
  事实核查（WebSearch，检索时间 2026-08-31），证据见
  `skills/bilin-commonapp-review/reports/peer-review-2026-08-31.md`。

  5 条必改全采纳：
  - 多邻国「仅单次分数」判据无官方佐证 → 降级 T5b 待确认，不作违规判据（错的红线比漏项危害大）
  - AP 新增科目修正：Business with Personal Finance / Cybersecurity 2026-27 开课（2027-05 首考，
    本季申请人不可能已有成绩）；Networking 为 2027-28 —— 源文档「3 门」有误
  - 新增 S5 串稿检查：补充分册出现他校校名/专属资源 = 🔴（终检最高频翻车点，纯文本可查）
  - 链 2（GPA/成绩链）补自报分数逐位核对：SAT/ACT/TOEFL/DET vs 官方成绩单（1490→1940 类手滑）
  - A4/S4 的质量判断降为路由提示（违反「只查错不评审」铁律的内容清除）

  建议改采纳 4 条 + 1 条部分采纳：
  - F1 改写：first-gen 不是 CA 通用表勾选项，父母教育程度如实填，判定归各校问题页
  - A3 收窄：仅「文书以长期活动口径具名提及却缺失」才标 🟠，防黄灯泛滥
  - P4 转待确认（推荐信审核时通常拿不到）；P2 明写「月/日顺序逐位核对」
  - Challenges and Circumstances 措辞修正：2025-26 起生效，非本季新增
  - E3 拆分（部分采纳评审建议）：一致性归 E3 🟠；专业匹配保留为 E3b「经验提醒，非错误判定」
    —— 源自比邻顾问自己的经验文档，有意嵌入，但标注为方向性提醒

  边界双向加排除句：活动条目事实一致性（名称/时间/数字/年级）归 commonapp-review；
  报告模板加固定脚注提示可同轮执行 activity skill。

- **`bilin-activity-list-review` v1.0 → v1.1**（仅边界修订，无行为变更）：description 加排除句
  「活动条目事实一致性核对归 bilin-commonapp-review；本 skill 的 essay coherence 只评叙事与
  定位层面」，消除与新 skill 的触发词重叠。

### Added

- **新 skill：`bilin-commonapp-review` v1.0**（首发版）。Common App 表单填写审核：查错不打分。

  来源：比邻顾问经验文档《Common App 2026-2027 申请季填写检查》
  （微信收到的 docx）+ 2026-08-31 方案确认（grill-me 逐分支确认）。

  核心设计（已与用户逐项确认）：
  - **定位**：表单查错，与 `bilin-activity-list-review` 互补——Activities 只查信息类错误
    （小时周数合理性、名称与文书一致、暑假年级归属），质量评估/打分/排序路由旧 skill。
  - **8 大模块检查清单**：Profile / Family / Education / Testing / Activities / Writing /
    Courses & Grades / Supplements，每条检查项注「核验来源」。
  - **跨模块一致性四链**：姓名链（护照基准）/ GPA 链（成绩单基准）/ 活动名链 / 时间线链。
  - **红橙黄三级**：不打分——填对就是对的，错误的严重度才是可行动信息。
  - **季节规则独立**：`references/SEASON-2027.md`（字数上限、新增 3 门 AP、标化政策检索记录表），
    换季只改一个文件；标化政策必须逐校 WebSearch，检索后回填政策表复用。
  - **分次提交**：填到哪审到哪，未覆盖板块在总览显式标注；提交前全量终检给「可否提交」结论。
  - **intake 硬闸**：CA 内容（至少一个板块）+ 目标校清单；无比对源（护照/成绩单/标化）时
    硬校验降级为「无法核验」，不默认通过。

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
