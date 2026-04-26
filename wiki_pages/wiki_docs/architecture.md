# :material-sitemap-outline: Architecture

This page focuses on internal system structure, organized around `BaseGraph`, format-specific graphs, the memory/state layer, and the tool layer.

## High-level architecture diagram

![Architecture diagram](assets/architecture-overview.svg)

## Boundaries and configuration trade-offs

- **Workflow boundary**: agents run inside graph nodes; results converge through a unified pipeline.
- **Capability boundary**: tools are injected explicitly from `src/tools/research/`.
- **Performance boundary**: `FAST_MODE`, search count, and recursion limits directly affect latency and quality.
- **Quality boundary**: disabling validation speeds up runs but increases consistency risk.

## Node topology

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

## Key mechanics

### Parallel dispatch

- `send_to_data_collection()`: dispatches collection tasks in parallel based on plan `steps`
- `send_to_format()`: dispatches section writing tasks in parallel and carries collection results

### Conditional branching

- `send_to_perception()`: checks whether user files exist and routes to `perception` or directly to `page_replan`
- `get_validation_agent()`: in the MD graph, validation is gated by `ENABLE_VALIDATION`

### Format graph differences

- `HTMLGraph`: `validation` returns `None` (no validation node)
- `MDGraph`: can enable `ValidationMarkdown` for fact/structure checks

## Component layering

<div class="card-grid">
  <article class="wiki-card">
    <h3>Entrypoint</h3>
    <p>`run_flow_fastapi` orchestrates parameters, queue, MCP, graph execution, and cleanup.</p>
  </article>
  <article class="wiki-card">
    <h3>Graph</h3>
    <p>`BaseGraph` defines the workflow skeleton; `HTMLGraph` / `MDGraph` provide format implementations.</p>
  </article>
  <article class="wiki-card">
    <h3>Memory & State</h3>
    <p>`memoryManager` + `TaskStatus` persist plans, stages, and intermediate artifacts.</p>
  </article>
  <article class="wiki-card">
    <h3>Tools</h3>
    <p>Web Search, Web Fetch, ArXiv, Image Search, and FileSystem tools work together.</p>
  </article>
</div>

## Sequence diagram

![Workflow sequence](assets/workflow-sequence.svg)

## Key modules and code locations

| Domain | Purpose | Key files |
| --- | --- | --- |
| Entrypoint | parse task params, init runtime, run workflow | `run_flow_fastapi.py` |
| Graph routing | route by output format to the correct graph | `src/entrypoint/graph_imports.py` |
| Graph orchestration | nodes, conditional routing, parallel dispatch | `src/graph/base_graph.py` |
| Memory & state | plan / intermediate results / session context | `src/memory/memory_manager.py` |
| Task status | stage status and interruption info | `src/states/task_status.py` |
| Tools | search, fetch, image, ArXiv, filesystem | `src/tools/research/` |
| Model management | agent-to-model mapping and model registry | `config/agent_config.py`, `config/model_config.py` |

## How to extend

- Add a new output format: subclass `BaseGraph` and register it in `graph_imports.py`
- Add new tools: implement under `src/tools/research/` and inject via agent factories
- Add/adjust models: register in `config/model_config.py` and bind in `config/agent_config.py`
