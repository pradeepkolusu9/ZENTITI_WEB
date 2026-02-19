import pytest
from fastapi.testclient import TestClient

from app.config import get_settings
from app.db import database
from app.main import create_app


@pytest.fixture
def client(monkeypatch):
    monkeypatch.setenv("APP_ENV", "test")
    monkeypatch.setenv("FORCE_HTTPS", "false")

    async def _connect_noop():
        return None

    async def _disconnect_noop():
        return None

    monkeypatch.setattr(database, "connect", _connect_noop)
    monkeypatch.setattr(database, "disconnect", _disconnect_noop)

    get_settings.cache_clear()
    app = create_app()

    with TestClient(app) as test_client:
        yield test_client
