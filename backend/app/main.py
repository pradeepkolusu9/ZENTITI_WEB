import logging

from fastapi import FastAPI
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware

from app.config import get_settings
from app.db import database
from app.middlewares import (
    add_cors_middleware,
    add_rate_limit_middleware,
    add_request_logging_middleware,
    add_security_headers_middleware,
    register_exception_handlers,
)
from app.routes import api_router


def configure_logging() -> None:
    settings = get_settings()
    logging.basicConfig(
        level=getattr(logging, settings.log_level.upper(), logging.INFO),
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )


def create_app() -> FastAPI:
    configure_logging()
    settings = get_settings()

    app = FastAPI(title=settings.app_name)

    if settings.force_https:
        app.add_middleware(HTTPSRedirectMiddleware)

    add_cors_middleware(app)
    add_request_logging_middleware(app)
    add_security_headers_middleware(app)
    add_rate_limit_middleware(app)
    register_exception_handlers(app)

    app.include_router(api_router, prefix=settings.api_prefix)

    @app.on_event("startup")
    async def startup_event() -> None:
        await database.connect()

    @app.on_event("shutdown")
    async def shutdown_event() -> None:
        await database.disconnect()

    return app
