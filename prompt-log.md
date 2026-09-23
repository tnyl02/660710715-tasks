# Prompt log

บันทึกทุกครั้งที่ใช้ AI กับ repo นี้ เขียนต่อท้ายเรื่อย ๆ ไม่ต้องลบของเก่า

---

## 2569-09-23 คำสั่ง: /tasks

- เครื่องมือ: Copilot ใน Codespaces
- ไฟล์: `specs/001-booking/spec.md`, `specs/001-booking/plan.md`
- ผลลัพธ์: สร้าง `specs/001-booking/tasks.md` จำนวน 18 task ตามลำดับการพึ่งพา ครบ AC-BKG-01 ถึง AC-BKG-06 และ Constraint ID ทุกข้อ
- Open Question ที่ยังค้าง: Q-02 เรื่องรูปแบบและวิธีออกหมายเลขคิว ทำให้มี 6 task รอ Q-02
- หมายเหตุ: `prompt-log.md` ไม่พบก่อนเริ่มงาน จึงสร้างไฟล์นี้ตามกติกาเพิ่มบันทึกต่อท้ายสำหรับคำสั่งรอบแรก

---

## 2569-09-23 คำสั่ง: /implement T-01

- ไฟล์ที่สร้างหรือแก้: `backend/app/db/models.py`, `backend/app/db/session.py`, `backend/app/db/migrations/001_init.py`, `backend/tests/conftest.py`, `specs/001-booking/tasks.md`
- ผล test: executable schema check ผ่าน; สร้างตาราง `slots`, `bookings`, `audit_logs` และไม่พบคอลัมน์ `national_id` ใน `bookings`. `pytest` รันได้แต่ไม่พบ test (`no tests ran`, exit code 5)
- สิ่งที่เกือบต้องเดาแต่ถามแทน: ไม่ได้เดารูปแบบหรือวิธีออกหมายเลขคิวของ `queue_no` เพราะติด Q-02; กำหนดเป็น nullable ตาม plan.md
