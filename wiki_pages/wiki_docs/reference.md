# :material-book-open-page-variant-outline: Reference

Key upstream libraries, protocols, and external service docs referenced by this project (grouped by capability area).

## Workflow / Agent orchestration

- **LangGraph**: workflow graphs and node orchestration (the foundation of `BaseGraph` / `MDGraph` / `HTMLGraph`). See [LangGraph Documentation](https://langchain-ai.github.io/langgraph/).
- **LangChain**: messaging/tool abstractions and model interfaces (widely used via `langchain_core` and `langchain.tools`). See [LangChain Documentation](https://python.langchain.com/).

## Configuration & validation

- **Pydantic**: schema definition and validation (tool inputs, plan validation, etc.). See [Pydantic Documentation](https://docs.pydantic.dev/).

## Web / networking

- **aiohttp**: async HTTP client used in fetch/image-related paths. See [aiohttp Documentation](https://docs.aiohttp.org/).
- **Requests**: sync HTTP client used in parts of model calling / streaming. See [Requests Documentation](https://requests.readthedocs.io/).

## Retrieval / search / academic sources

- **arXiv API**: paper search and metadata. See [arXiv API User Manual](https://info.arxiv.org/help/api/index.html).
- **Tavily Search API**: optional search source (enabled via config). See [Tavily Documentation](https://docs.tavily.com/).
- **Jina AI Reader / Fetch**: optional fetch/reader service (enabled via config). See [Jina AI Reader](https://jina.ai/reader/).

## Storage / state / queue

- **Redis (redis-py)**: session params, task status, and conversation logs (best-effort / environment dependent). See [redis-py Documentation](https://redis.readthedocs.io/).
- **PostgreSQL**: LangGraph checkpointer persistence for workflow checkpoint/resume. See [PostgreSQL Documentation](https://www.postgresql.org/docs/).
- **Apache RocketMQ**: message queue for event publishing in non-`test` environments. See [RocketMQ Documentation](https://rocketmq.apache.org/docs/).

## Protocols

- **Model Context Protocol (MCP)**: tool-based capability integration (e.g., filesystem) with health checking and client management. See [Model Context Protocol](https://modelcontextprotocol.io/).

## Documentation site

- **MkDocs**: documentation site generator. See [MkDocs Documentation](https://www.mkdocs.org/).
- **Material for MkDocs**: theme and UI components used by this wiki. See [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).
