# :material-book-open-page-variant-outline: Reference

本项目实现依赖/参考的主要开源组件、协议与外部服务文档如下（按能力域归类，便于溯源与二次开发）。

## Workflow / Agent Orchestration

- **LangGraph**：工作流图谱与节点编排（本项目 `BaseGraph`/`MDGraph`/`HTMLGraph` 的核心依赖）。官方文档见 [LangGraph Documentation](https://langchain-ai.github.io/langgraph/).
- **LangChain**：消息/工具抽象与模型调用接口（项目中大量使用 `langchain_core` / `langchain.tools`）。官方文档见 [LangChain Documentation](https://python.langchain.com/).

## Configuration & Validation

- **Pydantic**：配置/入参模型与校验（例如工具入参 schema、计划结构校验等）。官方文档见 [Pydantic Documentation](https://docs.pydantic.dev/).

## Web / Networking

- **aiohttp**：异步 HTTP 客户端（用于图片/网页等抓取链路）。官方文档见 [aiohttp Documentation](https://docs.aiohttp.org/).
- **Requests**：同步 HTTP 客户端（用于部分模型请求/流式处理等）。官方文档见 [Requests Documentation](https://requests.readthedocs.io/).

## Retrieval / Search / Academic Sources

- **arXiv API**：论文检索与引用信息来源。官方说明见 [arXiv API User Manual](https://info.arxiv.org/help/api/index.html).
- **Tavily Search API**：可选搜索源之一（由配置决定是否启用）。文档见 [Tavily Documentation](https://docs.tavily.com/).
- **Jina AI Reader / Fetch**：可选抓取/读取服务之一（由配置决定是否启用）。文档见 [Jina AI Reader](https://jina.ai/reader/).

## Storage / State / Queue

- **Redis**：会话参数、任务状态与对话日志（可选/按环境启用）。客户端依赖为 redis-py，文档见 [redis-py Documentation](https://redis.readthedocs.io/).
- **PostgreSQL**：LangGraph checkpointer（用于工作流 checkpoint / resume 的持久化）。官方文档见 [PostgreSQL Documentation](https://www.postgresql.org/docs/).
- **Apache RocketMQ**：消息队列（非 `env=test` 时用于事件输出/传输）。官方文档见 [RocketMQ Documentation](https://rocketmq.apache.org/docs/).

## Protocols

- **Model Context Protocol (MCP)**：用于把文件系统等能力以“工具”形式接入工作流（项目中包含 MCP 客户端管理与健康检查）。协议介绍见 [Model Context Protocol](https://modelcontextprotocol.io/).

## Documentation Site

- **MkDocs**：Wiki 文档构建与本地预览工具。官方文档见 [MkDocs Documentation](https://www.mkdocs.org/).
- **Material for MkDocs**：本站点的主题与组件（如 `:material-*:` 图标语法）。官方文档见 [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).
