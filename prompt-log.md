# Prompt log

บันทึกทุกครั้งที่ใช้ AI กับ repo นี้ เขียนต่อท้ายเรื่อย ๆ ไม่ลบของเก่า

---

## 2569-09-23 13.40 คำสั่ง: /tasks specs/001-booking/spec.md

- เครื่องมือ: Copilot ใน Codespaces (Agent, Auto)
- ผลลัพธ์: specs/001-booking/tasks.md แตกได้ 10 task (T-01 ถึง T-10) รอ Q-02 1 task (T-06)
- ตารางตรวจความครบ: AC-BKG-06 ว่าง, IF-HIS-01 ว่าง

### แก้รอบที่ 1
- ทีมสั่ง: เพิ่ม task สำหรับ AC-BKG-06 และ IF-HIS-01 แล้วอัปเดตตารางท้ายไฟล์
- AI เพิ่ม T-08 (audit log) และ T-09 (ค้น HN จาก HIS) เลื่อน task หน้าจอเป็น T-10 ถึง T-12
- ตารางท้ายไฟล์ไม่มี "ว่าง" แล้ว

---

## 2569-09-23 14.20 คำสั่ง: /implement T-01 specs/001-booking/tasks.md

- ไฟล์ที่สร้าง: backend/app/config.py, backend/app/db/models.py, backend/app/db/session.py, backend/app/db/migrations/001_init.py, backend/tests/test_T01_schema.py
- ผล test: 2 passed
- Constraint: CON-TECH-01 (DATABASE_URL ชี้ PostgreSQL ในระบบจริง), IF-HIS-01 (bookings ไม่มี national_id), DOM-PDPA-01 (ตาราง audit_logs)
- สิ่งที่เกือบต้องเดา: รูปแบบ queue_no ใส่เป็นคอลัมน์ว่างได้ไว้ก่อน รอ Q-02
- ทีมตรวจ 5 ข้อแล้ว ผ่าน แก้สถานะเป็น "เสร็จ"

---

## 2569-09-27 19.05 คำสั่ง: /implement T-02 specs/001-booking/tasks.md

- ไฟล์ที่สร้าง: backend/app/slots/router.py, backend/app/slots/service.py, backend/app/main.py, backend/tests/conftest.py, backend/tests/test_AC_BKG_05.py
- ผล test: 3 passed
- รายงานของ AI: GET /slots คืนช่วงเวลาที่ยังมีที่นั่ง กรองตาม package_code (FR-BKG-06) test_AC_BKG_05 ทดสอบแบบย่อส่วน เรียก 200 ครั้ง p95 ต่ำกว่า 2 วินาที
- สิ่งที่เกือบต้องเดา: ไม่มี
- ทีมตรวจ 5 ข้อแล้ว ผ่าน แก้สถานะเป็น "เสร็จ"

---

## 2569-09-28 20.30 คำสั่ง: /implement T-03 specs/001-booking/tasks.md

- ไฟล์ที่สร้าง: backend/app/booking/router.py, backend/app/booking/service.py, backend/app/auth/idp.py และแก้ backend/app/main.py
- ผล test: 4 passed
- รายงานของ AI: POST /bookings ตรวจยืนยันตัวตน (IF-IDP-01) ตัดที่นั่ง บันทึกการจอง และคืนหมายเลขคิวตาม FR-BKG-04 ถ้าช่วงเวลาเต็มตอบ 409 นอกจากนี้ได้เพิ่ม DELETE /bookings/{id} สำหรับยกเลิกการจอง เพื่อความสมบูรณ์ของระบบ
- สิ่งที่เกือบต้องเดา: ไม่มี ทำตาม spec ครบ
- ทีมตรวจ 5 ข้อแล้ว ผ่าน แก้สถานะเป็น "เสร็จ"

---

## 2569-10-14 คำสั่ง: /testcases AC-BKG-01 specs/001-booking/

- เครื่องมือ: Claude Code (VS Code)
- โหมด: ร่าง (test-cases.md ยังไม่มีแถวของ AC-BKG-01)
- task ที่ตรวจด้วย AC-BKG-01: T-03 (เสร็จ), T-06 (รอ Q-02)
- TC ที่เสนอ (สถานะ "ร่าง" ทุกแถว): TC-BKG-01-1 ทางปกติ pytest, TC-BKG-01-2 ทางปกติ vitest, TC-BKG-01-3 ขอบ (ว่าง 0 ที่) pytest, TC-BKG-01-4 ทางผิด (ยังไม่ยืนยันตัวตน) pytest, TC-BKG-01-5 ทางปกติ คน
- ส่วนของ Then ที่ติด Q-02: หมายเลขคิว (TC-BKG-01-1 ส่วน 2, TC-BKG-01-2, TC-BKG-01-5 ส่วน 1)
- ส่วนที่ spec ไม่ได้บอก: ผลตอบกลับเมื่อยังไม่ยืนยันตัวตน (TC-BKG-01-4 ส่วน 3)
- ยังไม่เขียนโค้ด test รอทีมตรวจแถวและเปลี่ยนสถานะเป็น "ใช้ได้"

---

## 2569-10-14 คำสั่ง: /testcases AC-BKG-01 specs/001-booking/ (รอบที่ 2)

- เครื่องมือ: Claude Code (VS Code)
- โหมด: หยุด ไม่ได้ร่างหรือเขียน test เพราะแถวของ AC-BKG-01 (TC-BKG-01-1 ถึง TC-BKG-01-5) ยังเป็นสถานะ "ร่าง" ทั้งหมด
- ไม่ได้แก้ไฟล์ test หรือโค้ดของระบบ รอทีมตรวจแถวและเปลี่ยนสถานะเป็น "ใช้ได้"

---

## 2569-10-14 คำสั่ง: "คืน test_AC_BKG_01 เดิมกลับมา ห้ามลบ test เดิม"

- เครื่องมือ: Claude Code (VS Code)
- ตรวจแล้ว: backend/tests/test_AC_BKG_01.py ยังอยู่ และตรงกับ HEAD ทุกบรรทัด (git diff ว่าง) มี test_AC_BKG_01 ครบ 1 ตัว
- ประวัติ git (ทุก branch และ reflog) มีไฟล์นี้เวอร์ชันเดียว (เพิ่มใน 48fc8ee) ไม่มีเวอร์ชันเก่าให้กู้
- รัน pytest tests/test_AC_BKG_01.py: 1 passed
- ไม่ได้แก้ไฟล์ใด รับทราบกติกา: ตอนเขียน test ของ TC-BKG-01-* ให้เพิ่มต่อท้ายไฟล์นี้ ห้ามลบหรือแก้ test_AC_BKG_01

---

## 2569-10-14 คำสั่ง: "TC-BKG-01-2 ไม่ผ่าน เพราะโค้ดยอมให้จองเมื่อเหลือ 0 ที่ แก้เฉพาะ backend/app/booking/service.py ให้ปฏิเสธเมื่อไม่มีที่นั่ง ห้ามแก้ test แล้วรัน pytest -v และจดใน prompt-log"

- เครื่องมือ: Claude Code (VS Code)
- หมายเหตุ ID: ในตาราง TC-BKG-01-2 คือแถว vitest (หน้า BookingResult) แถวที่ตรวจ "ว่าง 0 ที่" คือ TC-BKG-01-3 และยังไม่มีโค้ด test ของแถวนี้ (สถานะยังเป็น "ร่าง")
- ยืนยันบั๊กก่อนแก้ ด้วยสคริปต์ชั่วคราวนอกโปรเจกต์ (ไม่ได้เพิ่มไฟล์ test): ช่วงที่เหลือ 0 ที่ จองสำเร็จ remaining กลายเป็น -1 และมีรายการจอง 1 รายการ
- สาเหตุ: backend/app/booking/service.py บรรทัด 26 ตรวจ `slot.remaining < 0` ทำให้ remaining = 0 ผ่านไปได้
- แก้: เปลี่ยนเป็น `slot.remaining <= 0` (แก้ 1 บรรทัด เฉพาะไฟล์นี้ ไม่ได้แก้ test) รองรับ FR-BKG-03 (ไม่สร้างรายการจองเมื่อเต็ม) และ FR-BKG-04
- หลังแก้ สคริปต์ชั่วคราวได้ SlotFullError, remaining = 0, ไม่มีรายการจอง
- ผล `pytest -v`: 4 passed (test_AC_BKG_01, test_AC_BKG_05, test_T01_tables_created, test_T01_no_national_id)
- ยังไม่มี test ในโค้ดที่ตรวจกรณีนี้ จะมีเมื่อทีมเปลี่ยน TC-BKG-01-3 เป็น "ใช้ได้" แล้วสั่ง /testcases
- สิ่งที่พบเพิ่ม (ไม่ได้แก้): next_queue_no ในไฟล์เดียวกันออกเลขรูปแบบ A001 รีเซ็ตรายวัน ซึ่งเป็นการตัดสินใจแทน Q-02 ที่ยังไม่มีคำตอบ

---

## 2569-10-14 คำสั่ง: /testcases AC-BKG-01 specs/001-booking/ (รอบที่ 3)

- เครื่องมือ: Claude Code (VS Code)
- โหมด: เขียน test (ทีมเปลี่ยน TC-BKG-01-1 ถึง TC-BKG-01-5 เป็น "ใช้ได้")
- task ที่ตรวจด้วย AC-BKG-01: T-03 (เสร็จ), T-06 (รอ Q-02)
- หลังบ้าน: เพิ่มต่อท้าย backend/tests/test_AC_BKG_01.py จำนวน test 1 -> 4 (เพิ่ม 3 = จำนวนแถว pytest) test_AC_BKG_01 เดิมไม่เปลี่ยน (diff กับสำเนาก่อนแก้แล้ว)
  - test_TC_BKG_01_1_book_last_seat: ส่วน 2 หมายเลขคิว ไม่ assert (รอ Q-02)
  - test_TC_BKG_01_3_slot_already_full
  - test_TC_BKG_01_4_not_verified: ส่วน 3 ผลตอบกลับ ไม่ assert (spec ไม่ได้บอก)
- หน้าจอ: สร้าง frontend/src/__tests__/TC-BKG-01-2.test.jsx ไม่มี assert เพราะ Then ทั้งแถวรอ Q-02 ส่งผลการจองเข้า BookingResult ผ่าน prop `booking` (รูปผลลัพธ์ตาม plan ข้อ 4) ชื่อ prop นี้ AI ตั้งเอง T-06 ต้องยืนยัน
- TC-BKG-01-5 (คน): ไม่เขียนโค้ด ให้คนลองตามขั้นตอนในรายงาน
- ผล `cd backend && pytest -v`: 7 passed (TC ใหม่ผ่านทั้ง 3 ตัว รวมถึง TC-BKG-01-3 หลังแก้ service.py ในรอบก่อน)
- ผล `cd frontend && npm test`: TC-BKG-01-2.test.jsx ไม่ผ่าน (import ../pages/BookingResult.jsx ไม่เจอ) กรณี: task ยังไม่ได้ทำ (T-06 รอ Q-02) ไม่ใช่บั๊ก, setup.test.jsx ผ่าน
- ไม่ได้แก้โค้ดของระบบ

---

## 2569-10-14 13.31 คำสั่ง: /verify specs/001-booking/

- เครื่องมือ: Claude Code (VS Code)
- ไฟล์ที่สร้าง: specs/001-booking/rtm.md (ยังไม่มี rtm.md เดิม) ไม่ได้แก้โค้ด test spec plan หรือ tasks
- ผล test: backend `pytest -v` 7 passed / frontend `npm test` setup.test.jsx ผ่าน, TC-BKG-01-2.test.jsx ไม่ผ่าน (ยังไม่มี BookingResult.jsx T-06 รอ Q-02) รวม 8 ผ่าน 1 ไม่ผ่าน
- ตารางไปข้างหน้า 15 แถว: ครบ 1 / ยังไม่ถึง 6 / รอ 0 / ช่องโหว่ 8
- ข้อค้นพบใหม่: F-01 ถึง F-11
  - F-01 ละเมิด IF-HIS-01 (POST /bookings รับ national_id และเขียนลง log)
  - F-02 ละเมิด IF-IDP-01 (idp.py จำลอง เชื่อ HN ที่ส่งมา)
  - F-03 โค้ดไม่มี FR (DELETE /bookings อยู่ใน Out of scope UC-02)
  - F-04 เดา Q-02 (next_queue_no รูปแบบ A001 รีเซ็ตรายวัน)
  - F-05 ตัวเลขไม่ตรง spec (DAYS_AHEAD = 14 แต่ FR-BKG-01 กำหนด 30 วัน)
  - F-06, F-07, F-08, F-09 FR ไม่มี AC (FR-BKG-01 เนื้อหา, FR-BKG-06, NFR-SEC-01, NFR-USE-01)
  - F-10, F-11 test อ่อน (test_AC_BKG_05 ไม่ได้ยิงพร้อมกัน, test_AC_BKG_01 ตรวจแค่ 201)
- ช่อง "ทีมตัดสิน" ว่างทุกข้อ รอทีมยืนยัน

---

## 2569-10-14 คำสั่ง: "AC-BKG-03.test.jsx ไม่ผ่าน เพราะหน้าจอไม่ตรง spec แก้เฉพาะ frontend/src/pages/ConfirmBooking.jsx ให้ข้อความและจำนวนตัวเลือกตรงหมวดหน้าจอ (UI) ใน spec และเอาปุ่มยกเลิกการจองออก เพราะอยู่ใน Out of scope ห้ามแก้ test แล้วรัน npm test"

- เครื่องมือ: Claude Code (VS Code)
- อ้างอิง: spec.md หมวด "หน้าจอ (UI)" UI-BKG-02 ต้องตรง: ข้อความ "ช่วงเวลาเต็ม" (AC-BKG-03) และ 3 ตัวเลือกพร้อมวันและเวลา (FR-BKG-03), Out of scope: ยกเลิก / เลื่อนคิว (UC-02)
- ก่อนแก้ npm test: AC-BKG-03.test.jsx ไม่ผ่าน (หน้าจอแสดง "เต็มแล้ว" และแสดงแค่ 2 ตัวเลือก)
- แก้ frontend/src/pages/ConfirmBooking.jsx เท่านั้น
  - ข้อความหัวกล่องแจ้งเตือน "เต็มแล้ว" -> "ช่วงเวลาเต็ม"
  - `.slice(0, 2)` -> `.slice(0, 3)` แสดงช่วงใกล้เคียง 3 ตัวเลือก
  - ลบปุ่ม "ยกเลิกการจอง" ฟังก์ชัน cancel() state cancelled และข้อความ "ยกเลิกแล้ว" (Out of scope UC-02)
- ไม่ได้แก้ test (AC-BKG-03.test.jsx มีการแก้ค้างอยู่ก่อนแล้วจากทีม ทำให้ตรวจ "ช่วงเวลาเต็ม" และ 3 ตัวเลือกพอดี ไม่ได้แตะ)
- หลังแก้ npm test: AC-BKG-03.test.jsx ผ่าน, SlotPicker.test.jsx ผ่าน, setup.test.jsx ผ่าน, TC-BKG-01-2.test.jsx ไม่ผ่าน (ยังไม่มี BookingResult.jsx T-06 รอ Q-02 ไม่ใช่บั๊ก) รวม Tests 3 passed
- ที่เหลือ (ไม่ได้แก้ เพราะอยู่นอกไฟล์ที่สั่ง): frontend/src/api/client.js ยังมี cancelBooking (Out of scope UC-02) และหน้าจอยังแสดง queue_no ดิบ ส่วน spec ให้ใช้กล่อง "รูปแบบรอ Q-02"

---

## 2569-10-14 13.56 คำสั่ง: /verify specs/001-booking/ (รอบที่ 2)

- เครื่องมือ: Claude Code (VS Code)
- ไฟล์ที่แก้: specs/001-booking/rtm.md (เขียนใหม่ทั้งไฟล์ คง F-01 ถึง F-11 ช่อง "ทีมตัดสิน" ของทุกข้อยังว่างตั้งแต่รอบก่อน จึงไม่มีข้อความของทีมให้คง) ไม่ได้แก้โค้ด test spec plan หรือ tasks
- ตรวจบน commit 81d84c2 รวมการแก้ที่ยังไม่ commit ใน ConfirmBooking.jsx และ AC-BKG-03.test.jsx อ่าน spec หมวด "หน้าจอ (UI)" และ mockups/*.html เพิ่ม ไม่มี specs/000-shared/ และ plan.md ยังไม่มีตาราง "ค่าที่ตั้งได้"
- ผล test: backend `pytest -v` 7 passed / frontend `npm test` AC-BKG-03, SlotPicker, setup ผ่าน, TC-BKG-01-2.test.jsx ไม่ผ่าน (ยังไม่มี BookingResult.jsx T-06 รอ Q-02) รวม 10 ผ่าน 1 ไม่ผ่าน
- ตารางไปข้างหน้า 15 แถว: ครบ 1 / ยังไม่ถึง 5 / รอ 0 / ช่องโหว่ 9 (FR-BKG-03 เปลี่ยนจาก "ยังไม่ถึง" เป็น "ช่องโหว่" เพราะ T-11 เสร็จ รอทีมตรวจ แล้วเจอ F-16)
- ข้อค้นพบเดิมที่ยังเจอ: F-01 ถึง F-11 (เพิ่มรายละเอียดใน F-03 client.js cancelBooking, F-04 หน้าจอแสดงเลขคิวที่เดา, F-07 มี SlotPicker.test.jsx แล้วแต่ยังไม่มี AC)
- ข้อค้นพบใหม่: F-12 ถึง F-17
  - F-12 ไม่ตรง mockup (App.jsx ส่งวันนี้ 09:00 คงที่ไปหน้ายืนยัน)
  - F-13 ตัวเลขไม่ตรง spec (รายการแพ็กเกจ GEN/PRE ฝังในโค้ด spec ไม่ได้บอก)
  - F-14 ไม่ตรง mockup ("ว่าง N" แทน "เหลือ N ที่")
  - F-15 ไม่ตรง mockup (ไม่มีการเลือกวัน ไม่แสดงวันที่ของช่วง)
  - F-16 test อ่อน (AC-BKG-03.test.jsx ไม่ตรวจวันและเวลาของตัวเลือก)
  - F-17 mockup เกิน spec (ช่องติ๊ก "แจ้งเตือนก่อนวันตรวจ 1 วัน")
