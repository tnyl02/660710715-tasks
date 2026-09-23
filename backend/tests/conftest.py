import importlib

import pytest
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import Session

from app.db.models import Base


upgrade = importlib.import_module("app.db.migrations.001_init").upgrade


# เตรียมฐานข้อมูลทดสอบตาม CON-TECH-01 และ IF-HIS-01
@pytest.fixture
def db_session() -> Session:
    """เตรียมฐานข้อมูลทดสอบสำหรับ CON-TECH-01 และ IF-HIS-01"""
    engine = create_engine("sqlite:///:memory:")
    upgrade(engine)
    with Session(engine) as session:
        yield session
    Base.metadata.drop_all(engine)


# เปิดเผยตารางที่ migration สร้างเพื่อให้ test ตรวจ schema ได้
@pytest.fixture
def database_tables(db_session: Session) -> set[str]:
    """เปิดเผยชื่อตารางเพื่อให้ test ของ task ถัดไปตรวจ schema ได้"""
    return set(inspect(db_session.bind).get_table_names())