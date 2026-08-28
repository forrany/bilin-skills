# 输出格式

生成 Markdown 报告 / DOCX / PPT / PDF / 口播稿时读这一份。

## Markdown 报告

- 不放"目录"、"摘要"、"前言"套话章节，除非客户明确要求
- 每章不写总结段，让结论自然落在最后一句
- 表格用于事实对照（学校 / 录取率 / 课程匹配），不用于罗列概念

## Word（.docx）/ PPT（.pptx）/ PDF

### Logo 水印（强制）

- Logo 路径：`assets/logo.png`（skill 相对路径）
- **Logo 不存在 → 先问客户要，不要继续生成**
- **DOCX**：页眉右侧 或 页脚居中放 Logo 缩略
- **PPT**：每页**右上角**放 Logo（不超过页面宽度 8%）；封面页可放标题下方居中
- **PDF**：先生成 docx，再导出 PDF，保留 Logo

### 生成工具

- DOCX → 调用 `docx` skill
- PPT → 调用 `pptx` skill
- PDF → 调用 `pdf` skill

### 大型交付分 batch 生成

输出 ≥ 5000 字 / 多页 PPT / 完整策略报告：

1. 先出 plan——章节大纲 + 每个 batch 包含什么
2. 与用户确认 plan
3. 分 batch 生成：
   - 第一个 batch：`fs_write` 建文件
   - 后续 batch：`fs_append`
   - 每 batch ≤ 300 行（避免 max-token 截断）
4. 每个 batch 完成后简短确认，不需要全文反馈

## 口播稿 / Talking points

- 单句 ≤ 25 字
- 每段一个核心点，段间空行
- 数据用"大概…"、"差不多…"软化（口语自然）
- 不用"首先、其次、最后"，用"先说…接下来…回到…"等自然过渡
