import re
from html import escape
from typing import Optional


CONTROL_CHARS = re.compile(r"[\x00-\x1f\x7f]")
MULTI_SPACE = re.compile(r"\s+")


def sanitize_text(value: str, *, max_length: int) -> str:
    cleaned = CONTROL_CHARS.sub("", value)
    cleaned = MULTI_SPACE.sub(" ", cleaned).strip()
    cleaned = escape(cleaned, quote=True)
    if len(cleaned) > max_length:
        return cleaned[:max_length]
    return cleaned


def sanitize_optional_text(value: Optional[str], *, max_length: int) -> Optional[str]:
    if value is None:
        return None

    cleaned = sanitize_text(value, max_length=max_length)
    return cleaned or None
