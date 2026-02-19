import time
from collections import defaultdict, deque
from threading import Lock

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.config import get_settings


class InMemoryRateLimiter:
    def __init__(self, max_requests: int, window_seconds: int) -> None:
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._events: dict[str, deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def allow_request(self, key: str) -> bool:
        now = time.time()
        threshold = now - self.window_seconds

        with self._lock:
            entries = self._events[key]
            while entries and entries[0] < threshold:
                entries.popleft()

            if len(entries) >= self.max_requests:
                return False

            entries.append(now)
            return True


def add_rate_limit_middleware(app: FastAPI) -> None:
    settings = get_settings()
    limiter = InMemoryRateLimiter(
        max_requests=settings.rate_limit_max_requests,
        window_seconds=settings.rate_limit_window_seconds,
    )

    sensitive_paths = {
        f"{settings.api_prefix}/contact",
        f"{settings.api_prefix}/newsletter",
        f"{settings.api_prefix}/status",
    }

    @app.middleware("http")
    async def rate_limit_middleware(request: Request, call_next):
        if request.method == "POST" and request.url.path in sensitive_paths:
            client_ip = request.client.host if request.client else "unknown"
            key = f"{client_ip}:{request.url.path}"
            if not limiter.allow_request(key):
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Rate limit exceeded. Please try again later."},
                )

        return await call_next(request)
