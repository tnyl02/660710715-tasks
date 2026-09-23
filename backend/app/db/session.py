import os

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker


DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg://localhost/booking")
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, class_=Session, expire_on_commit=False)


# เปิด session สำหรับฐานข้อมูล PostgreSQL ตาม CON-TECH-01
def get_session() -> Session:
    """สร้าง session สำหรับเข้าถึงฐานข้อมูลตาม CON-TECH-01"""
    return SessionLocal()