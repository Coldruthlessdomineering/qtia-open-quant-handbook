# 参与 QTIA CUHK(SZ) 知识库

欢迎分享你觉得有趣的题目和解法。登录 GitHub 后可以直接贴出内容

## 你可以做的

- 提交社区题目：在[网站题库](https://praymo.github.io/qtia-open-quant-handbook/questions/)点“提交社区题目”，或直接打开[社区题目表单](https://github.com/Praymo/qtia-open-quant-handbook/issues/new?template=question-proposal.yml)。粘贴中文或英文题面；主题、难度、标签、相关题目和出处都可选填，题号、翻译与排版由维护者处理。
- 提交答案
  两种方式：
  1. 分享你的答案：在[网站题库](https://praymo.github.io/qtia-open-quant-handbook/questions/)打开一道题，点击“直接贴答案”，在这道题的 Discussion 里粘贴正文。想法和完整答案都可以，支持 Markdown、`$...$` 和 `$$...$$` 公式；部署完成后显示在题目下的“社区讨论”。
  2. 提交 Markdown PR：希望成熟解法单独展示在“社区解答”，就在对应题目页点“新建本题 solution.md”。路径、题号和文件头会预填；修改署名并写好正文，提交文件后创建 Pull Request（合并请求）。审核合并后，网站会展示解答并保留署名；仅保存到 fork 不会通知维护者，也不会更新网站。
- 指出错误或讨论题意：在题目页点击“报告问题”，写明题号、相关文字和理由。
- 修改题面或翻译：在题目页点击“编辑题目”。小勘误和更清晰的解释同样欢迎。

## 第一次用 GitHub 提交

以 [02.3 玻璃球测试](https://praymo.github.io/qtia-open-quant-handbook/questions/02.3/) 为例：

1. 打开题目，点击“直接贴答案”，登录 GitHub 后把答案粘贴到这道题的 Discussion。
2. 点 “Comment” 发布。你的答案会显示在题目页；别人可以在原帖回复、点赞。网站会定时同步。

题目页的“社区讨论”也欢迎完整的 Markdown 答案；“社区解答”单独展示经过 PR 审核并合并的解答，保留贡献者署名。

如果想自己提交 Markdown，在题目页“社区解答”点 **新建本题 solution.md**。GitHub 会打开对应题号的目录并预填内容；请把 `your-github-username` 换成自己的账号，再补充解法。若已有同名 `solution.md`，先改为其他文件名，如 `my-method.md`。已有解答可点其下方的 **修改这份解答**。没有写入权限时 GitHub 会引导你使用 fork；保存文件后，还需要按提示创建 PR。若只保存到了副本，在副本首页点 **Contribute → Open pull request**，确认目标是 `Praymo/qtia-open-quant-handbook:main`，最后点 **Create pull request**。只有 PR 出现在[主仓库的待审核列表](https://github.com/Praymo/qtia-open-quant-handbook/pulls)，维护者才能审核，合并后网站才会显示正式解答。

如果 GitHub 的直达编辑器报错，可打开[仓库 Fork 页面](https://github.com/Praymo/qtia-open-quant-handbook/fork)进入自己的副本，参照[解答模板](templates/solution.md)手动在 `content/solutions/<题号>/` 新建文件，再按上面步骤发 PR。

写出结论和关键思路即可，正文可以按自己的方式组织。修改错字或解释时，可以用“编辑题目”入口。GitHub 会保留提交和审阅记录。

## 解答文件格式

同一题的不同方法分开存放，例如：

```text
content/solutions/02.3/mathematical-derivation.md
content/solutions/02.3/python-simulation.md
```

每份解答的文件头示例：

```yaml
---
question: "02.3"
title: "你的解法名称"
method: "数学推导"
contributors: ["你的 GitHub 用户名"]
date: "2026-09-23"
order: 0
---
```

`question` 必须是已经存在的题号，所在文件夹也要与题号一致。`contributors` 至少包含一个真实 GitHub 用户名，不写 `@`。`date` 使用实际提交日期；`order` 可省略，仅控制页面排序，不表示解答优劣。正文应交代问题理解、假设、推理或模拟过程、验证和局限。模拟结果请说明随机种子、依赖、试验次数，以及它不能证明什么。

## 公式与代码

行内公式可以写 `$x^2$`，独立公式可以写：

```text
$$
f(x) = x^2
$$
```

网站也支持 `\( ... \)` 和 `\[ ... \]`。推荐美元符号写法，方便在 GitHub 直接阅读。代码块请注明语言，例如 `python`。不要提交密码、令牌、个人信息或需要运行的自定义 HTML 脚本。

## 想自己用 Markdown 新增或修改题目

下面的格式供自己提交 Markdown 文件时参考。使用“分享新题目”表单时，维护者会处理这些字段。自己提 PR 时，请先阅读 [题目更新维护指南](docs/题目更新维护指南.md)，从 [题目模板](templates/question.md)复制新文件到 `content/questions/week-XX/`。同一文件包含完整的中文和英文题面；数字、事件、规则和小问请逐项核对。解答写入独立文件。

文件头需要填写：

| 字段 | 要求 |
| --- | --- |
| `id` | 稳定且唯一的题号，例如 `"03.1"`；与周次一致 |
| `title`、`titleEn` | 中文和英文标题 |
| `summary` | 不剧透答案的简短中文摘要 |
| `week` | 正整数；与所在 `week-XX` 文件夹一致 |
| `date` | 期次月份，格式为 `"YYYY-MM"` |
| `category` | `algorithm`、`probability` 或 `brainteaser` |
| `difficulty` | `D1` 到 `D5`，或 `Optional` |
| `tags` | 至少一个小写英文主题标签，用连字符分词 |
| `contributors` | GitHub 用户名列表；无明确作者的历史导入可用 `[]` |

公开后的题号不要随意更改，因为旧链接和社区解答依赖它。引用题目来源时请注明出处，确认有权公开分享。

## 署名、审阅和修订

维护者想把 Discussion 中的一条答案变成**正式解答**时，复制它的链接。在仓库 Actions 中打开 **Promote community answer to solution PR**，点 **Run workflow**，填写 Discussion 编号和链接末尾 `discussioncomment-` 后的数字。流程会生成 `content/solutions/<题号>/` 下的 Markdown，保留原作者署名与原帖链接，并检查内容、尝试创建 PR。仓库若限制 Actions 创建 PR，运行摘要会给出打开 PR 的链接。请核对推理、题号、方法和署名，再合并；网页随后更新。

旧答案 Issue 仍可通过添加 `promote-to-solution` 标签晋升，但新的“直接贴答案”进入 Discussion。

实质性改进解答时，保留原作者并将自己的用户名加到 `contributors`；小勘误也会留在 Git 历史中。解答可以由后来的贡献者继续修订。维护者审阅时会检查题意、假设、推理、边界情况和可复现性；合并不意味着内容绝对正确。

如果改动了网站代码，请在本地运行：

```sh
npm ci
npm test
npm run check
npm run build
```

网站界面的更改还应检查手机宽度、键盘导航、筛选、空状态、公式和 GitHub 链接。

## 来源与许可

投稿者需确认自己有权分享内容。代码和文档按 [MIT](LICENSE) 许可；内容的许可范围和来源说明见 [LICENSE-CONTENT.md](LICENSE-CONTENT.md)。引用第三方材料时，请保留来源和许可信息。
