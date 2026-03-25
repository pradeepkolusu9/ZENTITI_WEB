from datetime import datetime, timezone
import re
from typing import Optional
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from app.services.sanitization import sanitize_optional_text, sanitize_text


NAME_PATTERN = re.compile(r"^[A-Za-z0-9 .,'&()/-]+$")
PHONE_PATTERN = re.compile(r"^[0-9+()\-\s]{7,30}$")


class CareersApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid4()))
    first_name: str = Field(min_length=2, max_length=50)
    last_name: str = Field(min_length=2, max_length=50)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    location: str = Field(min_length=2, max_length=100)
    current_role: str = Field(min_length=2, max_length=100)
    company: str = Field(min_length=2, max_length=100)
    experience: int = Field(ge=0, le=50)
    linkedin: Optional[str] = Field(default=None, max_length=200)
    portfolio: Optional[str] = Field(default=None, max_length=200)
    skills: Optional[str] = Field(default=None, max_length=500)
    interested_roles: list[str] = Field(min_length=1)
    availability: str = Field(min_length=2, max_length=20)
    work_type: str = Field(min_length=2, max_length=20)
    salary_expectation: Optional[int] = Field(default=None, ge=0, le=1000000)
    remote_preference: Optional[str] = Field(default=None, max_length=20)
    why_zentiti: str = Field(min_length=50, max_length=2000)
    why_good_fit: Optional[str] = Field(default=None, max_length=2000)
    notice_period: str = Field(min_length=2, max_length=20)
    resume: Optional[str] = Field(default=None, max_length=100)
    additional_info: Optional[str] = Field(default=None, max_length=1000)
    agree_to_terms: bool = Field(default=True)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CareersApplicationCreate(BaseModel):
    first_name: str = Field(min_length=2, max_length=50)
    last_name: str = Field(min_length=2, max_length=50)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    location: str = Field(min_length=2, max_length=100)
    current_role: str = Field(min_length=2, max_length=100)
    company: str = Field(min_length=2, max_length=100)
    experience: int = Field(ge=0, le=50)
    linkedin: Optional[str] = Field(default=None, max_length=200)
    portfolio: Optional[str] = Field(default=None, max_length=200)
    skills: Optional[str] = Field(default=None, max_length=500)
    interested_roles: list[str] = Field(min_length=1)
    availability: str = Field(min_length=2, max_length=20)
    work_type: str = Field(min_length=2, max_length=20)
    salary_expectation: Optional[int] = Field(default=None, ge=0, le=1000000)
    remote_preference: Optional[str] = Field(default=None, max_length=20)
    why_zentiti: str = Field(min_length=50, max_length=2000)
    why_good_fit: Optional[str] = Field(default=None, max_length=2000)
    notice_period: str = Field(min_length=2, max_length=20)
    resume: Optional[str] = Field(default=None, max_length=100)
    additional_info: Optional[str] = Field(default=None, max_length=1000)
    agree_to_terms: bool = Field(default=True)

    @field_validator("first_name", "last_name", "current_role", "company", "location")
    @classmethod
    def sanitize_text_fields(cls, value: str) -> str:
        return sanitize_text(value)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        if not PHONE_PATTERN.match(value):
            raise ValueError("Invalid phone number format")
        return value

    @field_validator("linkedin", "portfolio")
    @classmethod
    def sanitize_urls(cls, value: Optional[str]) -> Optional[str]:
        if value:
            return sanitize_optional_text(value, max_length=200)
        return value

    @field_validator("skills", "why_zentiti", "why_good_fit", "additional_info")
    @classmethod
    def sanitize_long_text(cls, value: Optional[str]) -> Optional[str]:
        if value:
            return sanitize_optional_text(value, max_length=2000)
        return value


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
