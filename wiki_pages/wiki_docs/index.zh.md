# :material-view-dashboard-outline: Overview

`LINK-Researcher` 是**由南京大学和Alibaba Group设计的**, 由 LangGraph 驱动的多 Agent 系统。它不是单次问答助手，而是一个为“复杂研究任务交付”设计的系统：先理解任务，再拆解计划，随后并行检索和写作，最后完成后处理、校验与打包输出。  
在工程实现上，它把“计划可信度、证据覆盖度、输出一致性”拆到不同节点各自负责。因此当结果不理想时，你可以快速定位问题发生在规划、采集、生成还是校验阶段。

<div class="hero-panel">
  <div>
    <p class="hero-kicker">PROJECT POSITIONING</p>
    <h2>Multi-Agent Research Workflow</h2>
    <p>核心目标不是“回答得像”，而是“交付得稳”：让研究任务在可观测、可配置、可扩展的流程中稳定收敛为最终产物。</p>
  </div>
  <div class="hero-metrics">
    <div><strong>10+</strong><span>关键节点链路<br></br></span></div>
    <div><strong>Parallel</strong><span>并行采集 + 并行章节生成</span></div>
    <div><strong>2</strong><span>主格式图谱（HTML / MD）</span></div>
    <div><strong>4+</strong><span>可选模式<br></br></span></div>
  </div>
</div>

## LINK-Researcher在解决什么问题

研究类任务常见痛点是：输入复杂、证据分散、链路很长、结果要求高。这个项目把“长链路不确定性”拆成可控阶段：

- **任务拆解**：把大问题拆成可执行步骤，避免一次性生成失稳
- **并行执行**：将资料搜集和章节写作并行化，提升吞吐
- **状态收敛**：每个阶段都有明确职责，最终在校验与打包节点收口
- **可观测运行**：通过 memory 与队列事件持续暴露中间状态，便于排障与优化

## 从输入到交付：项目主流程

核心执行链路来自 `src/graph/base_graph.py` 的 `build_graph()`：

```text
START
  -> role_play
  -> planner
  -> (perception | page_replan)
  -> data_collection (parallel)
  -> init_design_guide
  -> init_format
  -> format (parallel)
  -> post_process
  -> validation
  -> zip_data
  -> END
```

主要分成四个阶段：

1. **任务定向**：`role_play` / `planner` 明确目标、角色与步骤。
2. **证据构建**：`perception/page_replan` + `data_collection` 把输入材料和外部信息变成可用证据。
3. **内容生成**：`init_format` + `format` 将证据转为结构化章节。
4. **交付优化**：`post_process`、`validation`、`zip_data` 保障产物完整性与可交付性。

## 这套架构为什么“能跑起来”

<div class="card-grid">
  <div class="wiki-card">
    <h3>Graph as Contract</h3>
    <p>节点定义了阶段边界，减少“想到哪写到哪”的漂移。</p>
  </div>
  <div class="wiki-card">
    <h3>Parallel as Default</h3>
    <p>通过 <code>Send()</code> 分发子任务，缩短长链路等待。</p>
  </div>
  <div class="wiki-card">
    <h3>Tools as Capability Layer</h3>
    <p>检索、抓取、文件操作能力被显式注入到 Agent，而非隐式耦合。</p>
  </div>
  <div class="wiki-card">
    <h3>Memory as Continuity</h3>
    <p>计划和中间结果可持续累积，支持多阶段收敛。</p>
  </div>
  <div class="wiki-card">
    <h3>Mode as Tradeoff</h3>
    <p><code>FAST_MODE</code> 与相关开关在速度和质量间做工程化权衡。</p>
  </div>
  <div class="wiki-card">
    <h3>Validation as Guardrail</h3>
    <p>后处理与校验节点为最终交付增加一致性保障。</p>
  </div>
</div>


## 读文档建议路径

- `Overview`：先建立系统全景与核心设计取舍
- `Quick Start`：按最小路径跑通一次端到端流程
- `Architecture`：查看关键模块与源码落点、拓扑图与时序示意
- `Reference`：参考文献
