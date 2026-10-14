# RTM: จองคิวตรวจสุขภาพ (Booking)
อ้างอิง: spec.md SPEC-BKG-001 Draft v2 (+ หมวด "หน้าจอ (UI)" v3 2569-10-07) | tasks.md (เสร็จ T-01 ถึง T-03, เสร็จ รอทีมตรวจ T-10 T-11) | test-cases.md (TC-BKG-01-1 ถึง TC-BKG-01-5) | mockups/UI-BKG-01, UI-BKG-02
สร้างด้วย /verify เมื่อ 2569-10-14 13.56 (commit 81d84c2 + การแก้ที่ยังไม่ commit ใน ConfirmBooking.jsx และ AC-BKG-03.test.jsx) | test: 10 ผ่าน 1 ไม่ผ่าน

ผล test
- `cd backend && pytest -v`: 7 passed (test_AC_BKG_01, test_TC_BKG_01_1_book_last_seat, test_TC_BKG_01_3_slot_already_full, test_TC_BKG_01_4_not_verified, test_AC_BKG_05, test_T01_tables_created, test_T01_no_national_id)
- `cd frontend && npm test`: AC-BKG-03.test.jsx ผ่าน, SlotPicker.test.jsx ผ่าน, setup.test.jsx ผ่าน / TC-BKG-01-2.test.jsx ไม่ผ่าน (หา `../pages/BookingResult.jsx` ไม่เจอ เพราะ T-06 ยังรอ Q-02 เป็นกรณี task ยังไม่ได้ทำ ไม่ใช่บั๊ก)

หมายเหตุการตรวจ
- ไม่มีโฟลเดอร์ `specs/000-shared/` จึงไม่มี Constraint "ใช้ร่วม" เพิ่ม
- plan.md ยังไม่มีตาราง "ค่าที่ตั้งได้" จึงยังตรวจชนิด "ตัวเลขฝังในโค้ด" ไม่ได้ ตัวเลขที่ไม่ตรง spec ยังนับเป็น "ตัวเลขไม่ตรง spec"

## 1. ตามรอยไปข้างหน้า (requirement ไป โค้ด ไป test)
| ID | AC | task | โค้ด (ไฟล์: ฟังก์ชัน) | test (ผล) | สถานะ |
|---|---|---|---|---|---|
| FR-BKG-01 | AC-BKG-05 (ตรวจแค่ความเร็ว ไม่ได้ตรวจ "30 วัน" "แต่ละวัน" และ "ที่นั่งคงเหลือ") | T-02 (เสร็จ), T-10 (เสร็จ รอทีมตรวจ), T-12 (พร้อมทำ) | backend/app/slots/service.py: list_available_slots (DAYS_AHEAD = 14), backend/app/slots/router.py: get_slots, frontend/src/pages/SlotPicker.jsx | test_AC_BKG_05 (ผ่าน แต่ไม่ได้ตรวจเนื้อหา) | ช่องโหว่ (F-05, F-06, F-14, F-15) |
| FR-BKG-02 | AC-BKG-02 | T-04 (พร้อมทำ) | ยังไม่มี (หน้าจอสถานะ "จองเพิ่มไม่ได้" ใน mockup UI-BKG-02 ก็ยังไม่มี) | ยังไม่มี | ยังไม่ถึง |
| FR-BKG-03 | AC-BKG-03 | T-05 (พร้อมทำ), T-11 (เสร็จ รอทีมตรวจ), T-12 (พร้อมทำ) | frontend/src/pages/ConfirmBooking.jsx: confirm, กล่อง role="alert" / backend/app/booking/router.py ตอบ 409 "ช่วงเวลาเต็ม" แต่ยังไม่ส่ง alternatives (T-05) | AC-BKG-03.test.jsx (ผ่าน), test_TC_BKG_01_3 (ผ่าน ตรวจว่าไม่สร้างรายการจองเมื่อเต็ม) | ช่องโหว่ (F-16) |
| FR-BKG-04 | AC-BKG-01 | T-03 (เสร็จ), T-06 (รอ Q-02), T-07 (ส่งคำขอส่งข้อความ พร้อมทำ) | backend/app/booking/service.py: create_booking, next_queue_no / booking/router.py: create_booking / frontend/src/pages/ConfirmBooking.jsx (แสดงผลจองสำเร็จ), frontend/src/App.jsx | test_AC_BKG_01 (ผ่าน), test_TC_BKG_01_1 (ผ่าน ส่วนหมายเลขคิวรอ Q-02), test_TC_BKG_01_3 (ผ่าน), TC-BKG-01-2.test.jsx (ไม่ผ่าน T-06 ยังไม่ทำ) | ช่องโหว่ (F-04, F-11, F-12) |
| FR-BKG-05 | AC-BKG-04 | T-07 (พร้อมทำ) | ยังไม่มี (ไม่มี backend/app/notify/) | ยังไม่มี | ยังไม่ถึง |
| FR-BKG-06 | ไม่มี AC | T-02 (เสร็จ), T-10 (เสร็จ รอทีมตรวจ) | backend/app/slots/service.py: list_available_slots กรองด้วย package_code / frontend/src/pages/SlotPicker.jsx: useEffect โหลดใหม่เมื่อเปลี่ยน packageCode | SlotPicker.test.jsx (ผ่าน ใช้ API จำลอง) หลังบ้านไม่มี test เปลี่ยนแพ็กเกจ | ช่องโหว่ (F-07, F-13) |
| NFR-PERF-01 | AC-BKG-05 | T-02 (เสร็จ) | GET /slots | test_AC_BKG_05 (ผ่าน แต่เรียกทีละครั้ง ไม่ได้พร้อมกัน) | ช่องโหว่ (F-10) |
| NFR-SEC-01 | ไม่มี AC | ไม่มี task | ไม่มี | ไม่มี | ช่องโหว่ (F-08) |
| NFR-REL-02 | AC-BKG-04 | T-07 (พร้อมทำ) | ยังไม่มี | ยังไม่มี | ยังไม่ถึง |
| NFR-USE-01 | ไม่มี AC | ไม่มี task | ไม่มี (ต้องทดสอบกับคน) | ไม่มี | ช่องโหว่ (F-09) |
| CON-TECH-01 | ไม่มี AC (ตรวจตาม "เสร็จเมื่อ" ของ T-01) | T-01 (เสร็จ) | backend/app/config.py: DATABASE_URL, backend/app/db/session.py, requirements.txt มี psycopg | test_T01_tables_created (ผ่าน บน SQLite ตามที่ plan ข้อ 2 ตกลงไว้ ยังไม่เคยรันบน PostgreSQL จริง) | ครบ |
| DOM-PDPA-01 | AC-BKG-06 | T-01 (ตาราง เสร็จ), T-08 (พร้อมทำ) | backend/app/db/models.py: AuditLog (มีตาราง แต่ยังไม่มีโค้ดเขียน audit log ไม่มี backend/app/audit/) | ยังไม่มี test_AC_BKG_06 | ยังไม่ถึง |
| IF-IDP-01 | ไม่มี AC ตรง (AC-BKG-01 Given "ยืนยันตัวตนแล้ว") | T-03 (เสร็จ) | backend/app/auth/idp.py: get_verified_hn (จำลอง ไม่ได้ถามระบบยืนยันตัวตนจริง) | test_TC_BKG_01_4_not_verified (ผ่าน) | ช่องโหว่ (F-02) |
| IF-HIS-01 | ไม่มี AC | T-01 (เสร็จ), T-09 (พร้อมทำ) | backend/app/db/models.py: Booking ไม่มี national_id / backend/app/booking/router.py: BookingRequest รับ national_id และเขียนลง log | test_T01_no_national_id (ผ่าน ตรวจแค่ตาราง) | ช่องโหว่ (F-01) |
| IF-NOT-01 | AC-BKG-04 | T-07 (พร้อมทำ) | ยังไม่มี | ยังไม่มี | ยังไม่ถึง |

สรุป: ครบ 1 / ยังไม่ถึง 5 / รอ 0 / ช่องโหว่ 9 (รวม 15 แถว)

## 2. ตามรอยย้อนกลับ (โค้ด ไป requirement)
| โค้ด (ไฟล์: ฟังก์ชัน หรือ endpoint) | อ้าง ID | ตรงกับข้อความใน spec ไหม | หมายเหตุ |
|---|---|---|---|
| GET /slots (slots/router.py: get_slots) | FR-BKG-01, FR-BKG-06 | ตรงบางส่วน | ส่งออก slot_id, slot_date, start_time, remaining แต่ช่วงวันใช้ 14 วัน ไม่ใช่ 30 (F-05) |
| slots/service.py: list_available_slots, DAYS_AHEAD = 14 | FR-BKG-01, FR-BKG-06 | ไม่ตรง | FR-BKG-01 กำหนด 30 วันข้างหน้า (F-05) |
| POST /bookings (booking/router.py: create_booking) | FR-BKG-04, IF-IDP-01 | ตรงบางส่วน | plan ข้อ 4 กำหนด in: slot_id แต่ BookingRequest มี national_id เพิ่ม และ log เขียน national_id (F-01) ยังไม่ส่งคำขอส่งข้อความ (T-07) และยังไม่ส่ง alternatives เมื่อ 409 (T-05) |
| booking/router.py: logger.info("booking request ...") | ไม่อ้าง | ไม่ตรง | log มีเลขบัตรประชาชน ขัด IF-HIS-01 (F-01) |
| DELETE /bookings/{booking_id} (booking/router.py: cancel_booking) | FR-BKG-04 (อ้างผิด) | ไม่ตรง | อยู่ใน Out of scope (UC-02) (F-03) |
| booking/service.py: cancel_booking | FR-BKG-04 (อ้างผิด) | ไม่ตรง | อยู่ใน Out of scope (UC-02) (F-03) |
| booking/service.py: create_booking | FR-BKG-04 | ตรง (ส่วนบันทึกและตัดที่นั่ง) | อ่านแล้วลด remaining โดยไม่ล็อกแถว อาจจองซ้อนเมื่อ 2 คนกดพร้อมกัน เป็นเรื่องของ AC-BKG-03 / T-05 ที่ยังไม่ถึง |
| booking/service.py: next_queue_no | FR-BKG-04 | ไม่ตรง (เดา) | รูปแบบ A001 รีเซ็ตรายวัน ตอบ Q-02 แทนเวชระเบียน (F-04) |
| auth/idp.py: get_verified_hn | IF-IDP-01 | ไม่ตรง | เชื่อ HN ที่ส่งมาเลย (F-02) |
| config.py: DATABASE_URL | CON-TECH-01 | ตรง | ถ้าไม่ตั้ง DATABASE_URL จะใช้ SQLite โดยไม่เตือน (ข้อควรระวังตอน deploy) |
| db/models.py, db/migrations/001_init.py | CON-TECH-01, DOM-PDPA-01, IF-HIS-01 | ตรง | ตรงกับ plan ข้อ 3 |
| main.py | ไม่อ้าง FR (โครงระบบ) | - | ไม่มี audit middleware (T-08 ยังไม่ทำ) |
| frontend/src/api/client.js: getSlots, createBooking | ไม่อ้าง (plan ข้อ 4) | ตรงกับ plan ข้อ 4 | createBooking ไม่ส่ง Authorization ถ้าต่อ API จริงจะได้ 401 เป็นเรื่องของ T-12 ที่ยังไม่ถึง |
| frontend/src/api/client.js: cancelBooking | ไม่อ้าง (คอมเมนต์ "เพิ่มตอนทำ T-11 เพื่อให้ปุ่มยกเลิกใช้งานได้") | ไม่ตรง | อยู่ใน Out of scope (UC-02) ปุ่มที่เรียกฟังก์ชันนี้ถูกลบจาก ConfirmBooking.jsx แล้ว (ยังไม่ commit) แต่ฟังก์ชันยังอยู่ (F-03) |
| frontend/src/App.jsx: App | UC-01 (T-10, T-11) | ไม่ตรง | ส่งต่อไปหน้ายืนยันด้วย slot_date = วันนี้ และ start_time = '09:00' คงที่ ไม่ใช่ช่วงที่ผู้ใช้เลือก (F-12) |
| frontend/src/pages/SlotPicker.jsx: PACKAGES | FR-BKG-06 | ไม่ตรง (ข้อมูลที่ spec ไม่ได้บอก) | รายการแพ็กเกจ GEN / PRE ฝังในโค้ด (F-13) |
| frontend/src/pages/SlotPicker.jsx: รายการช่วงเวลา | FR-BKG-01, UI-BKG-01 | ไม่ตรง | แสดง "ว่าง N" ไม่ใช่ "เหลือ N ที่" (F-14) ไม่มีการเลือกวันและไม่แสดงวันที่ของช่วง (F-15) ใช้ field `s.id` แต่ GET /slots ส่ง `slot_id` เป็นเรื่องของ T-12 ที่ยังไม่ถึง |
| frontend/src/pages/SlotPicker.jsx: ช่องเลือกแพ็กเกจ, แถบขั้นตอน 3 ขั้น, ปุ่ม "ถัดไป" | FR-BKG-06, UI-BKG-01 | ตรง | ช่องเลือกแพ็กเกจอยู่บนสุดของเนื้อหา (ใต้หัวและแถบขั้นตอน เหมือน mockup) ปุ่ม "ถัดไป" เป็นปุ่มนำทาง |
| frontend/src/pages/ConfirmBooking.jsx: ปุ่ม "ยืนยันการจอง", กล่อง "ช่วงเวลาเต็ม" + 3 ตัวเลือก | FR-BKG-03, FR-BKG-04, UI-BKG-02 | ตรง | ตรง "ต้องตรง" ของ UI-BKG-02 ครบ ปุ่ม "กลับไปเลือกเวลา" และ "เลือกช่วงนี้" เป็นปุ่มนำทาง |
| frontend/src/pages/ConfirmBooking.jsx: สถานะจองสำเร็จ "หมายเลขคิว {queue_no}" | FR-BKG-04 | ไม่ตรง (เดา) | แสดงเลขคิวรูปแบบ A001 ที่หลังบ้านเดาไว้ ขณะที่ spec หมวด UI บอกว่า "ห้ามเดารูปแบบ" (รวมไว้ใน F-04) |

## 3. ข้อค้นพบ
ชนิด: AC ไม่มี test / test อ่อน / โค้ดไม่มี FR / FR ไม่มี AC / เดา Q-xx / ละเมิด Constraint / ตัวเลขไม่ตรง spec / ตัวเลขฝังในโค้ด / อ้าง ID ผิดเรื่อง / ไม่ตรง mockup / ของแถม / mockup เกิน spec
ทีมตัดสิน: แก้โค้ด / แก้ spec / เพิ่ม Q-xx / ไม่ใช่ปัญหา (พร้อมเหตุผล 1 บรรทัด)

| F-ID | ชนิด | อยู่ที่ | ขัดกับ | รายละเอียด | ทีมตัดสิน |
|---|---|---|---|---|---|
| F-01 | ละเมิด Constraint | backend/app/booking/router.py:19, :25 | IF-HIS-01, plan ข้อ 4 (POST /bookings in: slot_id) | BookingRequest รับ `national_id` (คอมเมนต์ "เผื่อใช้ค้น HN จาก HIS") และ `logger.info` เขียนเลขบัตรประชาชนลง log ทุกครั้งที่จอง IF-HIS-01 ให้ค้น HIS ด้วยเลขบัตร แล้วใช้ HN ภายในระบบ การค้น HN เป็นงานของ GET /patients/lookup (T-09) ไม่ใช่ POST /bookings test_T01_no_national_id ตรวจแค่ตาราง จึงจับเรื่องนี้ไม่ได้ วิธีแก้ที่เป็นไปได้: ถอด national_id ออกจาก BookingRequest และ log | |
| F-02 | ละเมิด Constraint | backend/app/auth/idp.py:13-15 | IF-IDP-01 | get_verified_hn เชื่อ HN ที่ฝั่งเรียกส่งมาใน "Bearer verified:<HN>" โดยไม่ได้รับผลจากระบบยืนยันตัวตน ใครก็จองในชื่อ HN ของคนอื่นได้ docstring บอกว่าระบบจริงต้องไปตรวจกับระบบยืนยันตัวตน แต่ T-03 ถูกตั้งเป็น "เสร็จ" โดยอ้าง IF-IDP-01 และไม่มี task ไหนรับงานต่อระบบยืนยันตัวตนจริง ทีมต้องตัดสินว่าจะเพิ่ม task หรือบันทึกว่าเป็นตัวจำลองชั่วคราว | |
| F-03 | โค้ดไม่มี FR | backend/app/booking/router.py:35-41 (DELETE /bookings/{booking_id}), backend/app/booking/service.py:42-50 (cancel_booking), frontend/src/api/client.js:20-24 (cancelBooking) | Out of scope: ยกเลิก / เลื่อนคิว (UC-02) | **อยู่ใน Out of scope** ไม่มีใน plan ข้อ 4 และไม่มี task รองรับ คอมเมนต์หลังบ้านอ้าง FR-BKG-04 ซึ่งพูดถึงการยืนยันจอง ไม่ใช่การยกเลิก (อ้าง ID ผิดเรื่องด้วย) prompt-log บันทึกว่า AI เพิ่มเอง "เพื่อความสมบูรณ์ของระบบ" ตอน T-03 รอบนี้พบเพิ่มว่า T-11 เพิ่ม cancelBooking ใน client.js เพื่อใช้กับปุ่มยกเลิก ปุ่มนั้นถูกลบออกจาก ConfirmBooking.jsx แล้ว (ยังไม่ commit) แต่ client.js และหลังบ้านยังมีอยู่ | |
| F-04 | เดา Q-02 | backend/app/booking/service.py:13-18 (next_queue_no), :34 / frontend/src/pages/ConfirmBooking.jsx:19 | Q-02, plan ข้อ 3 และข้อ 8 ("ยังไม่กำหนดวิธีออกเลข"), spec หมวด UI ("รูปแบบหมายเลขคิวยังรอ Q-02 ... ห้ามเดารูปแบบ") | ออกเลขคิวรูปแบบ "A" + 3 หลัก และนับใหม่ทุกวัน ตอบ Q-02 ทั้ง 2 ข้อแทนเจ้าหน้าที่เวชระเบียน โดยหยิบ "A001" จากตัวอย่างในวงเล็บของ Q-02 มาใช้ T-06 (งานออกเลขคิว) ยังรอ Q-02 แต่โค้ดออกเลขไปแล้วใน T-03 การนับด้วย count ของการจองวันนั้น อาจได้เลขซ้ำเมื่อมีการจองพร้อมกัน รอบนี้พบเพิ่มว่าหน้าจอยืนยัน (T-11) แสดงเลขที่เดาไว้นี้ให้ผู้ใช้เห็นแล้ว ส่วน mockup ใช้กล่อง "รูปแบบรอ Q-02" | |
| F-05 | ตัวเลขไม่ตรง spec | backend/app/slots/service.py:10 (DAYS_AHEAD = 14) | FR-BKG-01 ("ภายใน 30 วันข้างหน้า"), Scope, mockup UI-BKG-01 ("วันที่ (ภายใน 30 วันข้างหน้า)") | GET /slots แสดงช่วงเวลาแค่ 14 วัน ผู้ใช้จะไม่เห็นช่วงวันที่ 15 ถึง 30 คอมเมนต์อ้าง FR-BKG-01 แต่ตัวเลขไม่ตรง ไม่มี test จับได้ (ดู F-06) | |
| F-06 | FR ไม่มี AC | spec.md: FR-BKG-01 / AC-BKG-05 | FR-BKG-01 | FR-BKG-01 บอกว่าแสดงช่วงเวลาของแต่ละวันภายใน 30 วันและจำนวนที่นั่งคงเหลือ แต่ AC เดียวที่อ้าง FR-BKG-01 (AC-BKG-05 ตาม Traceability) ตรวจแค่ความเร็ว จึงไม่มี AC ตรวจช่วง 30 วันหรือจำนวนที่นั่ง F-05, F-14, F-15 จึงหลุดมาได้ ควรเสนอ AC ใหม่ให้ทีม (ขอบ: วันที่ 30 และ 31) | |
| F-07 | FR ไม่มี AC | spec.md: FR-BKG-06 | FR-BKG-06 | FR-BKG-06 (เปลี่ยนแพ็กเกจแล้วคำนวณช่วงว่างใหม่) ไม่มี AC เลย (plan ข้อ 6 และ T-10 ระบุไว้แล้ว) ตอนนี้มี SlotPicker.test.jsx ตรวจฝั่งหน้าจอด้วย API จำลองแล้ว แต่ยังไม่มี AC ให้ test อ้าง และหลังบ้านไม่มี test ที่เปลี่ยนแพ็กเกจ | |
| F-08 | FR ไม่มี AC | spec.md: NFR-SEC-01 | NFR-SEC-01 | NFR-SEC-01 (TLS 1.2 ขึ้นไป) ไม่มี AC และไม่มี task ใดใน tasks.md รับไป ทั้งตารางตรวจความครบของ tasks.md ก็ไม่มีแถว NFR | |
| F-09 | FR ไม่มี AC | spec.md: NFR-USE-01 | NFR-USE-01, ASM-05 | NFR-USE-01 (ผู้ใช้ใหม่ 8 ใน 10 คนจองสำเร็จใน 3 นาที) ไม่มี AC และไม่มี task ต้องทดสอบด้วยคน ยังไม่มีแผนว่าทดสอบเมื่อไหร่ | |
| F-10 | test อ่อน | backend/tests/test_AC_BKG_05.py:11-15 | AC-BKG-05 (Given ผู้ใช้พร้อมกัน 200 คน), plan ข้อ 6 ("ยิง GET /slots พร้อมกัน 200 ครั้ง") | test เรียก GET /slots ทีละครั้ง 200 รอบ ไม่ได้ส่งพร้อมกัน จึงไม่ได้ทดสอบภาระที่ AC กำหนด และไม่มี assert เรื่องข้อมูลที่ได้ (ช่วงเวลาและที่นั่งคงเหลือ) ถ้าลบ `.where(Slot.remaining > 0)` หรือเปลี่ยนจำนวนวัน test นี้ก็ยังผ่าน | |
| F-11 | test อ่อน | backend/tests/test_AC_BKG_01.py:6-12 (test_AC_BKG_01) | AC-BKG-01 | test_AC_BKG_01 ชื่ออ้าง AC แต่ assert แค่ `status_code == 201` ไม่ได้ดูข้อมูลที่บันทึกหรือที่นั่งคงเหลือ ตอนนี้ test_TC_BKG_01_1 และ test_TC_BKG_01_3 ตรวจส่วนนั้นแทนแล้ว (ถ้าลบบรรทัดที่ตัดที่นั่ง test_TC_BKG_01_1 จะไม่ผ่าน) ทีมอาจตัดสินว่าเก็บ test นี้ไว้เป็น smoke test ได้ | |
| F-12 | ไม่ตรง mockup | frontend/src/App.jsx:15 | UI-BKG-02 สถานะปกติ (แสดงวันและเวลาของช่วงที่เลือก), FR-BKG-04 | `onNext={(id) => setSlot({ id, slot_date: today, start_time: '09:00' })}` หน้ายืนยันจึงแสดงวันที่เป็นวันนี้และเวลา 09.00 น. เสมอ ไม่ว่าผู้ใช้จะเลือกช่วงไหน ผู้ใช้อาจกดยืนยันโดยเห็นวันและเวลาที่ผิด (slot_id ที่ส่งไปจองยังถูก) ไม่มี test ครอบ App.jsx จึงไม่มีอะไรจับได้ วิธีแก้ที่เป็นไปได้: ให้ SlotPicker ส่งช่วงทั้งก้อน (วันและเวลา) ไปหน้ายืนยัน | |
| F-13 | ตัวเลขไม่ตรง spec (ข้อมูลที่ spec ไม่ได้บอก) | frontend/src/pages/SlotPicker.jsx:4-7 (PACKAGES) | FR-BKG-06, ASM-01, plan ข้อ 4 (ไม่มี API รายการแพ็กเกจ) | รายการแพ็กเกจ `GEN` "ตรวจสุขภาพทั่วไป" และ `PRE` "ตรวจสุขภาพก่อนเข้าทำงาน" ฝังในโค้ด spec ไม่ได้กำหนดว่ามีแพ็กเกจอะไรและรหัสอะไร ชื่อมาจากข้อมูลตัวอย่างใน mockup ซึ่ง spec บอกว่า "ข้อมูลตัวอย่างทั้งหมด" ยืดหยุ่นได้ ไม่ใช่ข้อมูลจริง และรหัสไม่ตรงกับที่หลังบ้านใช้ใน test (`BASIC`) ทีมต้องตัดสินว่ารายการแพ็กเกจมาจากไหน (อาจต้องเพิ่ม Q-xx หรือ API) | |
| F-14 | ไม่ตรง mockup | frontend/src/pages/SlotPicker.jsx:46 | UI-BKG-01 ต้องตรง: แสดงเฉพาะช่วงที่ว่าง "พร้อมคำว่า 'เหลือ N ที่'" | หน้าจอแสดง `ว่าง {s.remaining}` แทน "เหลือ N ที่" ซึ่งเป็นข้อความที่ spec ระบุว่า "ต้องตรง" SlotPicker.test.jsx ไม่ได้ตรวจข้อความนี้ | |
| F-15 | ไม่ตรง mockup | frontend/src/pages/SlotPicker.jsx:38-50 | FR-BKG-01 ("ช่วงเวลาที่ว่างของแต่ละวันภายใน 30 วัน"), mockup UI-BKG-01 (แถวเลือกวัน data-req="FR-BKG-01") | หน้าจอไม่มีการเลือกวัน และรายการช่วงแสดงแค่ `start_time` ไม่แสดงวันที่ GET /slots คืนช่วงของหลายวันมาพร้อมกัน ผู้ใช้จึงเห็นเวลาซ้ำกันหลายรายการโดยไม่รู้ว่าเป็นวันไหน spec ให้ "หน้าตาปุ่มเลือกวัน" ยืดหยุ่นได้ แต่ต้องมีการแสดงแยกตามวันตาม FR-BKG-01 | |
| F-16 | test อ่อน | frontend/src/__tests__/AC-BKG-03.test.jsx:19-20 | AC-BKG-03 Then ("แสดง 3 ช่วงที่ว่างและใกล้ 09.00 น. ที่สุด"), UI-BKG-02 ต้องตรง ("แสดง 3 ตัวเลือกพร้อมวันและเวลา") | test นับแค่ปุ่ม "เลือกช่วงนี้" 3 ปุ่ม ไม่ได้ตรวจว่าแต่ละตัวเลือกแสดงวันและเวลา ถ้าลบ `{a.slot_date} {a.start_time} น.` ใน ConfirmBooking.jsx:40 test ก็ยังผ่าน ส่วน "ใกล้ 09.00 ที่สุด ภายในวันเดียวกันและวันถัดไป" และ "ไม่มีรายการจองซ้อน" เป็นงานหลังบ้าน T-05 ที่ยังไม่ถึง | |
| F-17 | mockup เกิน spec | specs/001-booking/mockups/UI-BKG-01-select-slot.html:69 | spec ไม่มี FR เรื่องแจ้งเตือนก่อนวันตรวจ (IF-NOT-01 พูดถึงข้อความยืนยันการจองเท่านั้น) | mockup มีช่องติ๊ก "แจ้งเตือนก่อนวันตรวจ 1 วัน" ซึ่งไม่มี data-req และไม่มีใน FR ใด โค้ดยังไม่ได้ทำ (ถูกต้อง ห้ามนับเป็นงานที่ขาด) ทีมต้องถามผู้ใช้หรือ PO ว่าต้องการไหม ถ้าต้องการให้เพิ่ม FR ใน spec ก่อน ถ้าไม่ต้องการให้เอาออกจาก mockup | |

## 4. แก้แล้ว
| F-ID | แก้อย่างไร | รู้ได้อย่างไร |
|---|---|---|
| (ยังไม่มี F-ID ที่แก้แล้ว) | - | - |

หมายเหตุ
- บั๊กที่ยอมให้จองเมื่อเหลือ 0 ที่ (service.py:26 เคยเป็น `< 0`) ถูกแก้ก่อน /verify รอบแรก (commit 2de4e7c) จึงไม่มี F-ID ตรวจได้จาก test_TC_BKG_01_3_slot_already_full ที่ผ่าน
- ปุ่ม "ยกเลิกการจอง" และข้อความ "เต็มแล้ว" / แสดง 2 ตัวเลือก ใน ConfirmBooking.jsx ถูกแก้ก่อน /verify รอบนี้ (ยังไม่ commit) จึงไม่ได้ตั้ง F-ID ข้อความ "ช่วงเวลาเต็ม" และ 3 ตัวเลือกตรวจได้จาก AC-BKG-03.test.jsx ที่ผ่าน ส่วนที่เหลือของเรื่องยกเลิกอยู่ใน F-03
