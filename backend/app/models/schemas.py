from datetime import datetime, timezone
import re
from typing import Optional
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from app.services.sanitization import sanitize_optional_text, sanitize_text


NAME_PATTERN = re.compile(r"^[A-Za-z0-9 .,'&()/-]+$")
PHONE_PATTERN = re.compile(r"^[0-9+()\-\s]{7,30}$")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid4()))
    client_name: str = Field(min_length=2, max_length=120)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str = Field(min_length=2, max_length=120)

    @field_validator("client_name")
    @classmethod
    def sanitize_client_name(cls, value: str) -> str:
        cleaned = sanitize_text(value, max_length=120)
        if not NAME_PATTERN.match(cleaned):
            raise ValueError("client_name contains invalid characters")
        return cleaned


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=30)
    company: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=10, max_length=2000)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactSubmissionCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=30)
    company: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=10, max_length=2000)

    @field_validator("message")
    @classmethod
    def normalize_message(cls, value: str) -> str:
        cleaned = sanitize_text(value, max_length=2000)
        if not cleaned:
            raise ValueError("message cannot be empty")
        return cleaned

    @field_validator("name")
    @classmethod
    def sanitize_name(cls, value: str) -> str:
        cleaned = sanitize_text(value, max_length=120)
        if not NAME_PATTERN.match(cleaned):
            raise ValueError("name contains invalid characters")
        return cleaned

    @field_validator("company")
    @classmethod
    def sanitize_company(cls, value: Optional[str]) -> Optional[str]:
        cleaned = sanitize_optional_text(value, max_length=120)
        if cleaned and not NAME_PATTERN.match(cleaned):
            raise ValueError("company contains invalid characters")
        return cleaned

    @field_validator("phone")
    @classmethod
    def sanitize_phone(cls, value: Optional[str]) -> Optional[str]:
        cleaned = sanitize_optional_text(value, max_length=30)
        if cleaned and not PHONE_PATTERN.match(cleaned):
            raise ValueError("phone number format is invalid")
        return cleaned


class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid4()))
    email: EmailStr
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr
