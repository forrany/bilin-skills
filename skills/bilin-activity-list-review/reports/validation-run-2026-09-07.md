# v1.3 回归验证记录（2026-09-07）

## 范围

本轮只验证四项行为变更：ED 必填硬闸、显式 `ed_schools` 接口、整表描述一致性、外教版正文只保留排序与修改建议。既有出处纪律、官网时效判定、矩阵评分和改前/改后评分不改语义。

## RED：修改前失败证据

在 v1.2 上执行四条静态行为断言，四条均以退出码 1 失败：

| 断言 | v1.2 失败原因 |
|---|---|
| 活跃规则中不得允许缺 ED 继续 | `SKILL.md`、`INTAKE.md`、`ED-MAJOR-MATRIX.md` 共 5 处允许 ED 未定后继续给共性结论 |
| 接口必须显式要求 `ed_schools` | `interface.yaml` 只要求 `target_schools` |
| 必须有整表一致性终检 | `FIELD-CHECKLIST.md` 只有单条时态/语法检查 |
| 外教模板不得有 Positioning 段 | `CLEAN-VERSION.md` 固定模板包含 `Positioning:` |

这四个失败与本轮需求一一对应，不是语法错误或测试环境问题。

## GREEN：修改后行为契约

| 场景 | 预期行为 | 规则落点 |
|---|---|---|
| Major + 完整活动列表 + RD/目标校，但无 ED | 立即停工，只发 INTAKE；不评分、不排序、不改写 | `SKILL.md`、`INTAKE.md`、`ED-MAJOR-MATRIX.md`、`interface.yaml` |
| 至少一个 ED + 一个 Major | 按单组合正常评估 | `SKILL.md`、`ED-MAJOR-MATRIX.md` |
| 多 ED 或多 Major | 逐组合矩阵 + 推荐锚定组合 + 排序差异 | `ED-MAJOR-MATRIX.md` |
| 全表存在时态/缩写/数字/标点差异 | 列具体活动编号、原文、替换文本；不得只说“统一风格” | `FIELD-CHECKLIST.md`、`REPORT-TEMPLATE.md` |
| 生成外教版 | 正文只含 Recommended order 与 Revisions | `CLEAN-VERSION.md` |

行为样例固化在 `evals/behavior_cases.json` 的 B01–B05；缺 ED 的自然语言触发样例补入 `evals/trigger_cases.json`，确保 skill 仍会被路由，然后由输入硬闸拦截。

## 结构验证

- `manifest.json`、`semantic_config.json`、`trigger_cases.json`、`behavior_cases.json`：`python3 -m json.tool` 解析。
- `agents/interface.yaml`：Ruby 标准 YAML 解析器读取。
- manifest 的全部 `factory_components`：逐项检查文件存在。
- `git diff --check`：检查空白与补丁格式。
- 活跃规则扫描：旧的 ED-optional 语句必须为 0；历史验证报告保留原始记录，不作为运行时规则。

## 验证边界

当前会话策略不允许调度子代理，因此本轮没有声称完成新的独立顾问盲跑。v1.3 的新增证据是可重复的静态行为契约与结构校验；既有真实案例与评分表现继续引用 `validation-run-2026-08-28.md` 和 `field-feedback-2026-09-04.md`。

