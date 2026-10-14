# test ของ T-03: จองคิวสำเร็จ
# AC-BKG-01 (FR-BKG-04)
from tests.conftest import AUTH


def test_AC_BKG_01(client, make_slot):
    """AC-BKG-01: ยืนยันตัวตนแล้ว และช่วง 09.00 น. มีที่นั่งว่าง จองแล้วต้องสำเร็จ"""
    slot = make_slot(start="09:00", remaining=1)

    res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)

    assert res.status_code == 201


# ---- test จาก specs/001-booking/test-cases.md (สร้างด้วย /testcases) ----
from app.db.models import Booking, Slot


def test_TC_BKG_01_1_book_last_seat(client, db, make_slot):
    """TC-BKG-01-1 (AC-BKG-01 ทางปกติ)"""
    # Given ยืนยันตัวตนแล้ว (HN 0001234) และช่วง 09.00 น. มีที่นั่งว่าง 1 ที่
    slot = make_slot(start="09:00", remaining=1)

    # When ยืนยันการจอง (POST /bookings ด้วย slot_id ของช่วง 09.00)
    res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)

    # Then 1) บันทึกสำเร็จ: ได้ booking id กลับ (plan ข้อ 4)
    #         และมีรายการจองของ HN นี้ผูกกับช่วง 09.00 ในตาราง bookings
    body = res.json()
    assert body.get("booking_id") is not None
    saved = db.get(Booking, body["booking_id"])
    assert saved is not None
    assert saved.hn == "0001234"
    assert saved.slot_id == slot.id
    # Then 2) ได้หมายเลขคิวกลับในผลลัพธ์ -> ยังไม่ตรวจ เพราะรอ Q-02
    # Then 3) ที่นั่งว่างของช่วง 09.00 เป็น 0
    db.expire_all()
    assert db.get(Slot, slot.id).remaining == 0


def test_TC_BKG_01_3_slot_already_full(client, db, make_slot):
    """TC-BKG-01-3 (AC-BKG-01 ขอบ)"""
    # Given ยืนยันตัวตนแล้ว และช่วง 09.00 น. มีที่นั่งว่าง 0 ที่
    slot = make_slot(start="09:00", remaining=0, capacity=1)

    # When ยืนยันการจอง
    res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)

    # Then 1) ถูกปฏิเสธเพราะช่วงเวลาเต็ม: ได้ 409 (FR-BKG-03, plan ข้อ 4)
    assert res.status_code == 409
    # Then 2) ไม่มีรายการจองเกิดขึ้น (FR-BKG-03)
    assert db.query(Booking).count() == 0
    # Then 3) ไม่ได้หมายเลขคิว
    assert res.json().get("queue_no") is None
    # Then 4) ที่นั่งว่างของช่วง 09.00 ยังเป็น 0 (FR-BKG-04)
    db.expire_all()
    assert db.get(Slot, slot.id).remaining == 0
    # การแจ้งบนหน้าจอและ 3 ตัวเลือก ตรวจใน TC ของ AC-BKG-03


def test_TC_BKG_01_4_not_verified(client, db, make_slot):
    """TC-BKG-01-4 (AC-BKG-01 ทางผิด)"""
    # Given ยังไม่ได้ยืนยันตัวตน (ไม่มีผลยืนยันตัวตน) และช่วง 09.00 น. มีที่นั่งว่าง 1 ที่
    slot = make_slot(start="09:00", remaining=1)

    # When ยืนยันการจอง (ไม่ส่งผลยืนยันตัวตน)
    res = client.post("/bookings", json={"slot_id": slot.id})

    # Then 1) ไม่มีรายการจองเกิดขึ้น (IF-IDP-01, ASM-04)
    assert db.query(Booking).count() == 0
    # Then 2) ที่นั่งว่างของช่วง 09.00 ยังเป็น 1
    db.expire_all()
    assert db.get(Slot, slot.id).remaining == 1
    # Then 3) ผลตอบกลับ (รหัสสถานะ / ข้อความ): spec ไม่ได้บอก -> ยังไม่ตรวจ res โดยตั้งใจ
