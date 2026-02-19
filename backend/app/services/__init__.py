__all__ = ["LeadService"]


def __getattr__(name: str):
    if name == "LeadService":
        from app.services.lead_service import LeadService

        return LeadService
    raise AttributeError(f"module 'app.services' has no attribute {name!r}")
