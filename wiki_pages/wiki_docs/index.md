# :material-view-dashboard-outline: Overview

`LINK-Researcher` is a system built for **shipping complex research tasks** end-to-end. Instead of a single-turn Q&A bot, it is a **LangGraph-powered multi-agent workflow** that: understands the task, produces a plan, collects evidence in parallel, writes sections in parallel, then post-processes, validates, and packages deliverables.

At an engineering level, it separates responsibilities across nodes so you can quickly diagnose where quality issues occur: planning, retrieval, generation, or validation.

<div class="hero-panel">
  <div>
    <p class="hero-kicker">PROJECT POSITIONING</p>
    <h2>Multi-Agent Research Workflow</h2>
    <p>The goal is not “to sound right”, but “to deliver reliably”: make long-chain research converge into shippable artifacts in an observable, configurable, and extensible workflow.</p>
  </div>
  <div class="hero-metrics">
    <div><strong>10+</strong><span>key workflow nodes<br></br></span></div>
    <div><strong>Parallel</strong><span>parallel collection + parallel section writing</span></div>
    <div><strong>2</strong><span>primary output graphs (HTML / MD)</span></div>
    <div><strong>4+</strong><span>runtime modes<br></br></span></div>
  </div>
</div>

## What problem does LINK-Researcher solve?

Research delivery is hard because inputs are messy, evidence is scattered, the chain is long, and output requirements are strict. This project breaks “long-chain uncertainty” into controllable stages:

- **Decomposition**: break large questions into executable steps to avoid one-shot instability
- **Parallelism**: parallelize collection and writing to improve throughput
- **Convergence**: each stage has clear responsibility; validation and packaging close the loop
- **Observability**: memory + queue events expose intermediate states for debugging and iteration

## From input to deliverable: the main workflow

The core execution chain is defined by `build_graph()` in `src/graph/base_graph.py`:

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

You can think of it as four stages:

1. **Task orientation**: `role_play` / `planner` clarifies goals, roles, and steps.
2. **Evidence building**: `perception/page_replan` + `data_collection` turn inputs and external info into usable evidence.
3. **Content generation**: `init_format` + `format` transform evidence into structured sections.
4. **Delivery hardening**: `post_process`, `validation`, `zip_data` improve consistency and produce shippable artifacts.

## Why this architecture “runs reliably”

<div class="card-grid">
  <div class="wiki-card">
    <h3>Graph as Contract</h3>
    <p>Nodes define stage boundaries, reducing drift in long generation chains.</p>
  </div>
  <div class="wiki-card">
    <h3>Parallel as Default</h3>
    <p>Subtasks are dispatched via <code>Send()</code> to shorten wall-clock latency.</p>
  </div>
  <div class="wiki-card">
    <h3>Tools as Capability Layer</h3>
    <p>Search, fetch, and file ops are injected explicitly as tools, not implicitly coupled.</p>
  </div>
  <div class="wiki-card">
    <h3>Memory as Continuity</h3>
    <p>Plans and intermediate results accumulate across stages to support convergence.</p>
  </div>
  <div class="wiki-card">
    <h3>Mode as Trade-off</h3>
    <p><code>FAST_MODE</code> and related toggles formalize speed-vs-quality trade-offs.</p>
  </div>
  <div class="wiki-card">
    <h3>Validation as Guardrail</h3>
    <p>Post-processing and validation add consistency checks before packaging.</p>
  </div>
</div>

## Recommended reading order

- `Overview`: build a mental model and the key trade-offs
- `Quick Start`: run an end-to-end workflow with minimal setup
- `Architecture`: dive into modules, topology, and sequence diagrams
- `Reference`: references and upstream docs
