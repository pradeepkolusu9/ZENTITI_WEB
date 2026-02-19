from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.config import get_settings


def add_cors_middleware(app: FastAPI) -> None:
    settings = get_settings()
    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=list(settings.cors_origins) or ["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
