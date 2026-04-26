# :material-rocket-launch-outline: Quick Start

这部分面向“先跑起来，再深入”的使用路径。

## 快速开始

### 1）环境配置
```bash
python3 -m pip install -r requirements.txt
```

### 2）API配置

####  API / 搜索 / 抓取配置（`config/api_config.py`）

- **LLM 接入**：`API_BASE_CONFIG.base_url`、`API_BASE_CONFIG.api_key`
- **超时**：`LLM_TIMEOUT`、`LLM_FIRST_TOKEN_TIMEOUT`（会覆盖 thinking 阶段首 token 等待）、`LLM_STREAM_CHUNK_TIMEOUT`

#### 智能体选用的模型（`config/agent_config.py`）

- 用于把不同 agent（role_play / planner / data_collection / format / post_process / validation / perception 等）映射到不同 `model_config`。

### 3）运行一次研究任务
```bash
python3 run_flow_fastapi.py \
  --session_id "$(uuidgen)" \
  --prompt "分析近三年多模态大模型研究趋势" \
  --result_format "html" \
  --port 8000 \
  --env test \
  --mode normal
```

运行产物默认写入 `workspace/`（首次运行自动创建），常见目录：

- `workspace/result/`：最终报告与中间文件
- `workspace/user_file/`：本地投喂文件目录

## 命令行参数

- `--session_id`（必需）：会话/任务唯一 ID（建议 UUID）。用于 Redis 取参、状态追踪、产物归档等。
- `--prompt`：研究问题/任务描述。
- `--result_format`（默认 `html`）：输出类型。代码通过 `src/entrypoint/graph_imports.py:get_graph_class()` 分流到不同 Graph。
- `--port`（默认 `8000`）：保留参数（当前脚本不启动 HTTP server，但为 FastAPI 兼容保留）。
- `--env`（默认 `test`）：运行环境。`test` 下使用本地工作目录与本地文件读取逻辑；非 `test` 时会初始化 RocketMQ（见 `run_flow_fastapi.py`）。
- `--mode`（默认 `normal`，可选 `fast`）：**目前仅作为 task_param 字段透传**（写入 `task_param["mode"]`），并不会自动修改 `config/mode_config.py` 的 `FAST_MODE`。

## 可配置参数总览

### 1) 运行模式与 fast mode（`config/mode_config.py`）

- `FAST_MODE`：快速模式总开关
- `ENABLE_MODEL_THINKING`：是否启用模型 thinking/reasoning
- `ENABLE_VALIDATION`：是否启用 Markdown 验证节点
- `ENABLE_ROLE_PLAY`：是否启用role play节点
- `ENABLE_CHAPTER_SUMMARY`：章节压缩摘要
- `SEARCH_NUM`：每次搜索返回数量
- `ENABLE_BROWSER_USE`：是否启用 Browser Use 抓取搜索结果页面
- `MD_DEFAULT_TOTAL_WORD_COUNT`：Markdown 报告默认总字数

### 2) Thinking 模式各模型差异

- `config/model_config.py` 会根据 `ENABLE_MODEL_THINKING` 自动处理每个模型的 thinking 配置。

## 使用本地文件（`workspace/user_file/`）

将要分析的文件放入 `workspace/user_file/` 后直接运行主流程即可；在 `--env test` 下会自动扫描该目录。
