from datetime import datetime

from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.models.schemas import (
    CareersApplication,
    CareersApplicationCreate,
    ContactSubmission,
    ContactSubmissionCreate,
    NewsletterSubscription,
    NewsletterSubscriptionCreate,
    StatusCheck,
    StatusCheckCreate,
)


class LeadService:
    def __init__(self, db: AsyncIOMotorDatabase) -> None:
        self.db = db

    async def create_status_check(self, payload: StatusCheckCreate) -> StatusCheck:
        status_obj = StatusCheck(**payload.model_dump())
        doc = status_obj.model_dump()
        doc["timestamp"] = doc["timestamp"].isoformat()
        await self.db.status_checks.insert_one(doc)
        return status_obj

    async def list_status_checks(self) -> list[StatusCheck]:
        docs = await self.db.status_checks.find({}, {"_id": 0}).to_list(1000)

        status_checks: list[StatusCheck] = []
        for doc in docs:
            timestamp = doc.get("timestamp")
            if isinstance(timestamp, str):
                doc["timestamp"] = datetime.fromisoformat(timestamp)
            status_checks.append(StatusCheck(**doc))

        return status_checks

    async def submit_contact(self, payload: ContactSubmissionCreate) -> ContactSubmission:
        contact_obj = ContactSubmission(**payload.model_dump())
        doc = contact_obj.model_dump()
        doc["timestamp"] = doc["timestamp"].isoformat()
        await self.db.contact_submissions.insert_one(doc)
        return contact_obj

    async def subscribe_newsletter(
        self, payload: NewsletterSubscriptionCreate
    ) -> NewsletterSubscription:
        existing = await self.db.newsletter_subscriptions.find_one(
            {"email": payload.email}, {"_id": 0}
        )
        if existing:
            raise HTTPException(status_code=400, detail="Email already subscribed")

        subscription_obj = NewsletterSubscription(**payload.model_dump())
        doc = subscription_obj.model_dump()
        doc["timestamp"] = doc["timestamp"].isoformat()
        await self.db.newsletter_subscriptions.insert_one(doc)
        return subscription_obj

    async def submit_careers_application(self, payload: CareersApplicationCreate) -> CareersApplication:
        application_obj = CareersApplication(**payload.model_dump())
        doc = application_obj.model_dump()
        doc["timestamp"] = doc["timestamp"].isoformat()
        await self.db.careers_applications.insert_one(doc)
        return application_obj
