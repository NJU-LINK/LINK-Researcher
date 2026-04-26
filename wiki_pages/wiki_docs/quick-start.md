# :material-rocket-launch-outline: Quick Start

This page is for a “run it first, understand it later” path.

## Minimal run (end-to-end)

```bash
python3 -m pip install -r requirements.txt

# Run a single research task (default output: HTML)
python3 run_flow_fastapi.py \
  --session_id "$(uuidgen)" \
  --prompt "Analyze multimodal foundation model trends from the last 3 years" \
  --result_format "html" \
  --port 8000 \
  --env test \
  --mode normal
```

Outputs are written to `workspace/` (auto-created on first run), commonly:

- `workspace/result/`: deliverables and intermediate artifacts
- `workspace/user_file/`: local files to ingest (see below)

## CLI arguments (`run_flow_fastapi.py`)

- `--session_id` (**required**): unique session/task id (UUID recommended). Used for parameter lookup, status tracking, and artifact organization.
- `--prompt`: the research question / task description.
- `--result_format` (default: `html`): output format. Routed via `src/entrypoint/graph_imports.py:get_graph_class()`.
- `--port` (default: `8000`): kept for compatibility (the script itself doesn’t start an HTTP server in this entrypoint).
- `--env` (default: `test`): runtime environment. In `test`, local workspace + local file ingestion are enabled; non-`test` initializes RocketMQ in the entrypoint.
- `--mode` (default: `normal`, choices: `fast`): **currently only passed through as `task_param["mode"]`** and does not automatically flip `config/mode_config.py:FAST_MODE`.

## Config knobs that actually change behavior

### 1) Runtime mode & fast mode (`config/mode_config.py`)

- `FAST_MODE`: master switch for fast mode
- `ENABLE_MODEL_THINKING`: enable thinking/reasoning (derived from `FAST_MODE`)
- `ENABLE_VALIDATION`: enable Markdown validation node (derived; see `src/graph/md_graph.py`)
- `ENABLE_ROLE_PLAY`: enable role-play node (derived)
- `ENABLE_CHAPTER_SUMMARY`: section compression/summarization (derived; see `src/agents/format/md/reporter_parallel_md.py`)
- `SEARCH_NUM`: search results per query (derived; used by `src/tools/research/web_search.py`)
- `ENABLE_BROWSER_USE`: enable Browser Use to fetch result pages
- `MD_DEFAULT_TOTAL_WORD_COUNT`: default target length for Markdown reports

### 2) Model thinking differences (`config/model_config.py` + `docs/thinking_mode_api.md`)

`config/model_config.py` adapts request payloads based on `ENABLE_MODEL_THINKING` (e.g., GLM vs Claude thinking control details are documented in `docs/thinking_mode_api.md`).

## Using local files (`workspace/user_file/`)

Put files into `workspace/user_file/` and run the workflow. With `--env test`, the workflow automatically scans this directory (see `send_to_perception()` in `src/graph/base_graph.py`).
