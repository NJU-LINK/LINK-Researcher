#!/usr/bin/env python3
"""Compatibility wrapper that forwards to wiki_pages/wiki/serve.py."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CANONICAL_RUNNER = ROOT / "wiki_pages" / "wiki" / "serve.py"


def main() -> None:
    parser = argparse.ArgumentParser(description="Compatibility wrapper for wiki runner")
    parser.add_argument("mode", choices=["serve", "build", "check"], help="Execution mode")
    parser.add_argument("--port", type=int, default=8000, help="Preview port in serve mode")
    args = parser.parse_args()

    if not CANONICAL_RUNNER.exists():
        raise SystemExit(f"Missing runner file: {CANONICAL_RUNNER}")

    command = ["python3", str(CANONICAL_RUNNER), args.mode]
    if args.mode == "serve":
        command.extend(["--port", str(args.port)])

    subprocess.run(command, cwd=ROOT, check=True)


if __name__ == "__main__":
    main()
