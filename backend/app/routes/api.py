from typing import Annotated

from fastapi import APIRouter, Depends

from app.db import database
from app.models.schemas import (
    ContactSubmission,
    ContactSubmissionCreate,
    NewsletterSubscription,
    NewsletterSubscriptionCreate,
    StatusCheck,
    StatusCheckCreate,
)
from app.services.lead_service import LeadService

api_router = APIRouter()


def get_lead_service() -> LeadService:
    return LeadService(database.db)


LeadServiceDep = Annotated[LeadService, Depends(get_lead_service)]


@api_router.get("/")
async def root() -> dict[str, str]:
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(
    payload: StatusCheckCreate, service: LeadServiceDep
) -> StatusCheck:
    return await service.create_status_check(payload)


@api_router.get("/status", response_model=list[StatusCheck])
async def get_status_checks(service: LeadServiceDep) -> list[StatusCheck]:
    return await service.list_status_checks()


@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact_form(
    payload: ContactSubmissionCreate, service: LeadServiceDep
) -> ContactSubmission:
    return await service.submit_contact(payload)


@api_router.post("/newsletter", response_model=NewsletterSubscription)
async def subscribe_newsletter(
    payload: NewsletterSubscriptionCreate, service: LeadServiceDep
) -> NewsletterSubscription:
    return await service.subscribe_newsletter(payload)
