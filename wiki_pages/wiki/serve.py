#!/usr/bin/env python3
"""MkDocs runner for the technical wiki."""

from __future__ import annotations

import argparse
import subprocess
import sys
import venv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONFIG = ROOT / "mkdocs.wiki.yml"
DOCS_DIR = ROOT / "wiki_pages" / "wiki_docs"
VENV_DIR = ROOT / ".venv_wiki_docs"
REQUIRED = [
    CONFIG,
    DOCS_DIR / "index.md",
    DOCS_DIR / "stylesheets" / "extra.css",
    DOCS_DIR / "javascripts" / "extra.js",
]


def check_files() -> None:
    missing = [str(path.relative_to(ROOT)) for path in REQUIRED if not path.exists()]
    if missing:
        raise SystemExit(f"Missing required files: {', '.join(missing)}")
    print("Wiki preflight check passed.")


def run_mkdocs(command: list[str]) -> None:
    subprocess.run(command, cwd=ROOT, check=True)


def _venv_python() -> Path:
    if sys.platform.startswith("win"):
        return VENV_DIR / "Scripts" / "python.exe"
    return VENV_DIR / "bin" / "python"


def _ensure_docs_venv() -> list[str]:
    """Ensure mkdocs + plugins exist in a local venv, then return mkdocs command prefix."""
    py = _venv_python()
    if not py.exists():
        VENV_DIR.mkdir(parents=True, exist_ok=True)
        venv.EnvBuilder(with_pip=True, clear=False).create(VENV_DIR)
        subprocess.run([str(py), "-m", "pip", "install", "-U", "pip"], cwd=ROOT, check=True)

    # Install minimal wiki_pages deps (avoid installing full runtime deps).
    subprocess.run([str(py), "-m", "pip", "install", "mkdocs", "mkdocs-material", "mkdocs-static-i18n"], cwd=ROOT, check=True)

    return [str(py), "-m", "mkdocs"]


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve/build wiki using MkDocs")
    parser.add_argument("mode", nargs="?", default="serve", choices=["serve", "build", "check"])
    parser.add_argument("--port", type=int, default=8000, help="Port for mkdocs serve")
    args = parser.parse_args()

    check_files()
    if args.mode == "check":
        return

    mkdocs = _ensure_docs_venv()
    if args.mode == "build":
        run_mkdocs([*mkdocs, "build", "-f", str(CONFIG)])
        return

    run_mkdocs([*mkdocs, "serve", "-f", str(CONFIG), "-a", f"127.0.0.1:{args.port}"])


if __name__ == "__main__":
    main()