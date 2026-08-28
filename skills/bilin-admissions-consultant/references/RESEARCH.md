# 调研与求证

调研先于设计 + 数据可溯源。Step 3、Step 6、Step 7 触发时读这一份。

## 核心原则：调研结果会改变方向

在没有数据支撑的情况下先定方案，等调研出来要么打脸要么硬撑。

**Cornell 教训**：用录取率友好选 anchor，调研后发现 profile 与 Brown 更匹配，方案推翻重来。**Williams 教训**：第一档候选，调研后发现帆船是 club（不 recruit），匹配理由失去一条。

## 调研触发条件

- 选校列表（每所学校的 CDS、录取率、国际生比例、招生 factors）
- 项目门槛（夏校、竞赛、recruiting）
- 政策类问题（奖学金、test-optional、专业要求）
- 任何要写进报告的"客观事实"

## 网络任务用 TinyFish（不用 WebSearch / WebFetch / curl）

按 `.kiro/steering/tinyfish.md` 规则：

| 任务 | 工具 |
|------|------|
| 搜索 | `mcp_tinyfish_search` |
| 读网页 | `mcp_tinyfish_fetch_content`（多 URL 并发） |
| 浏览器交互 | `mcp_tinyfish_run_web_automation` |
| 多任务批处理 | `mcp_tinyfish_batch_create` |

**出错先 `get_run` / `list_runs` 查状态，不要盲重试**。

## 数据求证优先级

引用任何数据点：

1. 学校官网 / 项目官网
2. 学校 Common Data Set / Published Profile
3. Crimson、Cosmic、Ivy Coach、CollegeData 等可信二手
4. 客户提供官方文档

**Reddit / Quora / 论坛**：可作为方向参考，**不能作为报告中的"证据"**，必须标"非官方信息"。

## 数据落地

每个数据点在附录或脚注标 URL + 验证日期。无法验证 → 标"待核实，建议向 X 确认"，不写假数字。

## 调研工作流

1. **调研前** → 扫 pipeline.md §3 调研索引 + §4 sub-agent 调用历史，确认不是重复问题
2. **调研中** → 调研报告写到 `research/` 或 `source_documents/research/` 目录
3. **调研完成** → pipeline.md §3 索引登记一行（路径 + 一句话摘要 ≤ 25 字 + 日期）
4. **调研改方向** → pipeline.md §2 旧决策标"已推翻"+ §7 红旗加一条

## 调研完成后必做

用调研数据 review 之前的初步判断。如果数据推翻了某个判断，立刻在 pipeline.md 登记，不要硬撑原方案。
