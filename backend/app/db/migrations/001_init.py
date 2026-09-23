from sqlalchemy import Engine

from app.db.models import Base


# สร้าง schema ที่เก็บ HN และ audit log ตาม IF-HIS-01 และ DOM-PDPA-01
def upgrade(engine: Engine) -> None:
    """สร้างตาราง booking ตาม CON-TECH-01, DOM-PDPA-01 และ IF-HIS-01"""
    Base.metadata.create_all(engine)