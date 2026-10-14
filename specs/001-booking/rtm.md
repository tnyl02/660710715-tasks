# RTM: จองคิวตรวจสุขภาพ (Booking)
อ้างอิง: spec.md SPEC-BKG-001 Draft v2 | tasks.md (เสร็จ T-01 ถึง T-03) | test-cases.md (TC-BKG-01-1 ถึง TC-BKG-01-5)
สร้างด้วย /verify เมื่อ 2569-10-14 13.31 (commit 2de4e7c) | test: 8 ผ่าน 1 ไม่ผ่าน

ผล test
- `cd backend && pytest -v`: 7 passed (test_AC_BKG_01, test_TC_BKG_01_1_book_last_seat, test_TC_BKG_01_3_slot_already_full, test_TC_BKG_01_4_not_verified, test_AC_BKG_05, test_T01_tables_created, test_T01_no_national_id)
- `cd frontend && npm test`: setup.test.jsx ผ่าน / TC-BKG-01-2.test.jsx ไม่ผ่าน (หา `../pages/BookingResult.jsx` ไม่เจอ เพราะ T-06 ยังรอ Q-02 เป็นกรณี task ยังไม่ได้ทำ ไม่ใช่บั๊ก)

## 1. ตามรอยไปข้างหน้า (requirement ไป โค้ด ไป test)
| ID | AC | task | โค้ด (ไฟล์: ฟังก์ชัน) | test (ผล) | สถานะ |
|---|---|---|---|---|---|
| FR-BKG-01 | AC-BKG-05 (ตรวจแค่ความเร็ว ไม่ได้ตรวจ "30 วัน" และ "ที่นั่งคงเหลือ") | T-02 (เสร็จ), T-10, T-12 (พร้อมทำ) | backend/app/slots/service.py: list_available_slots (ใช้ DAYS_AHEAD = 14), backend/app/slots/router.py: get_slots | test_AC_BKG_05 (ผ่าน แต่ไม่ได้ตรวจเนื้อหา) | ช่องโหว่ (F-05, F-06) |
| FR-BKG-02 | AC-BKG-02 | T-04 (พร้อมทำ) | ยังไม่มี | ยังไม่มี | ยังไม่ถึง |
| FR-BKG-03 | AC-BKG-03 | T-05, T-11, T-12 (พร้อมทำ) | มีบางส่วน: booking/router.py ตอบ 409 "ช่วงเวลาเต็ม" แต่ยังไม่เสนอ 3 ตัวเลือก | test_TC_BKG_01_3 ตรวจว่าไม่สร้างรายการจองเมื่อเต็ม (ผ่าน) | ยังไม่ถึง |
| FR-BKG-04 | AC-BKG-01 | T-03 (เสร็จ), T-06 (รอ Q-02), T-07 (ส่งคำขอส่งข้อความ พร้อมทำ) | backend/app/booking/service.py: create_booking, next_queue_no / booking/router.py: create_booking | test_AC_BKG_01 (ผ่าน), test_TC_BKG_01_1 (ผ่าน ส่วนหมายเลขคิวรอ Q-02), test_TC_BKG_01_3 (ผ่าน), TC-BKG-01-2.test.jsx (ไม่ผ่าน T-06 ยังไม่ทำ) | ช่องโหว่ (F-04, F-11) |
| FR-BKG-05 | AC-BKG-04 | T-07 (พร้อมทำ) | ยังไม่มี (ไม่มี backend/app/notify/) | ยังไม่มี | ยังไม่ถึง |
| FR-BKG-06 | ไม่มี AC | T-02 (เสร็จ), T-10 (พร้อมทำ) | backend/app/slots/service.py: list_available_slots กรองด้วย package_code | ไม่มี test ที่เปลี่ยนแพ็กเกจ (test_AC_BKG_05 ใช้แค่ BASIC) | ช่องโหว่ (F-07) |
| NFR-PERF-01 | AC-BKG-05 | T-02 (เสร็จ) | GET /slots | test_AC_BKG_05 (ผ่าน แต่เรียกทีละครั้ง ไม่ได้พร้อมกัน) | ช่องโหว่ (F-10) |
| NFR-SEC-01 | ไม่มี AC | ไม่มี task | ไม่มี | ไม่มี | ช่องโหว่ (F-08) |
| NFR-REL-02 | AC-BKG-04 | T-07 (พร้อมทำ) | ยังไม่มี | ยังไม่มี | ยังไม่ถึง |
| NFR-USE-01 | ไม่มี AC | ไม่มี task | ไม่มี (ต้องทดสอบกับคน) | ไม่มี | ช่องโหว่ (F-09) |
| CON-TECH-01 | ไม่มี AC (ตรวจตาม "เสร็จเมื่อ" ของ T-01) | T-01 (เสร็จ) | backend/app/config.py: DATABASE_URL, backend/app/db/session.py, requirements.txt มี psycopg | test_T01_tables_created (ผ่าน บน SQLite ตามที่ plan ข้อ 2 ตกลงไว้ ยังไม่เคยรันบน PostgreSQL จริง) | ครบ |
| DOM-PDPA-01 | AC-BKG-06 | T-01 (ตาราง เสร็จ), T-08 (พร้อมทำ) | backend/app/db/models.py: AuditLog (มีตาราง แต่ยังไม่มีโค้ดเขียน audit log ไม่มี backend/app/audit/) | ยังไม่มี test_AC_BKG_06 | ยังไม่ถึง |
| IF-IDP-01 | ไม่มี AC ตรง (AC-BKG-01 Given "ยืนยันตัวตนแล้ว") | T-03 (เสร็จ) | backend/app/auth/idp.py: get_verified_hn (จำลอง ไม่ได้ถามระบบยืนยันตัวตนจริง) | test_TC_BKG_01_4_not_verified (ผ่าน) | ช่องโหว่ (F-02) |
| IF-HIS-01 | ไม่มี AC | T-01 (เสร็จ), T-09 (พร้อมทำ) | backend/app/db/models.py: Booking ไม่มี national_id / backend/app/booking/router.py: BookingRequest รับ national_id และเขียนลง log | test_T01_no_national_id (ผ่าน ตรวจแค่ตาราง) | ช่องโหว่ (F-01) |
| IF-NOT-01 | AC-BKG-04 | T-07 (พร้อมทำ) | ยังไม่มี | ยังไม่มี | ยังไม่ถึง |

สรุป: ครบ 1 / ยังไม่ถึง 6 / รอ 0 / ช่องโหว่ 8 (รวม 15 แถว)

## 2. ตามรอยย้อนกลับ (โค้ด ไป requirement)
| โค้ด (ไฟล์: ฟังก์ชัน หรือ endpoint) | อ้าง ID | ตรงกับข้อความใน spec ไหม | หมายเหตุ |
|---|---|---|---|
| GET /slots (slots/router.py: get_slots) | FR-BKG-01, FR-BKG-06 | ตรงบางส่วน | ส่งออก slot_id, slot_date, start_time, remaining ตรงกับ plan ข้อ 4 แต่ช่วงวันใช้ 14 วัน ไม่ใช่ 30 (F-05) |
| slots/service.py: list_available_slots, DAYS_AHEAD = 14 | FR-BKG-01, FR-BKG-06 | ไม่ตรง | FR-BKG-01 กำหนด 30 วันข้างหน้า (F-05) กรอง remaining > 0 และ package_code ตรงกับ FR |
| POST /bookings (booking/router.py: create_booking) | FR-BKG-04, IF-IDP-01 | ตรงบางส่วน | plan ข้อ 4 กำหนด in: slot_id แต่ BookingRequest มี national_id เพิ่ม และ log เขียน national_id กับ hn (F-01) ยังไม่ส่งคำขอส่งข้อความ (T-07 ยังไม่ทำ) |
| booking/router.py: logger.info("booking request ...") | ไม่อ้าง | ไม่ตรง | log มีเลขบัตรประชาชน ขัด IF-HIS-01 (F-01) |
| DELETE /bookings/{booking_id} (booking/router.py: cancel_booking) | FR-BKG-04 (อ้างผิด) | ไม่ตรง | ยกเลิกคิวคือ UC-02 อยู่ใน Out of scope ไม่มีใน plan ข้อ 4 และไม่มี task (F-03) |
| booking/service.py: cancel_booking | FR-BKG-04 (อ้างผิด) | ไม่ตรง | FR-BKG-04 พูดถึงการยืนยันจอง ไม่ใช่การยกเลิกและคืนที่นั่ง (F-03) |
| booking/service.py: create_booking | FR-BKG-04 | ตรง (ส่วนบันทึกและตัดที่นั่ง) | ตรวจ remaining <= 0 แล้วตัดที่นั่ง 1 ที่ การอ่านแล้วลดค่า remaining ไม่ได้ล็อกแถว อาจจองซ้อนเมื่อมี 2 คนกดพร้อมกัน เป็นเรื่องของ AC-BKG-03 / T-05 ที่ยังไม่ถึง ควรตรวจตอนทำ T-05 |
| booking/service.py: next_queue_no | FR-BKG-04 | ไม่ตรง (เดา) | ออกเลข "A" + 3 หลัก นับใหม่ทุกวัน ซึ่งเป็นคำตอบของ Q-02 ที่ยังไม่มีใครตอบ ใช้ "A001" จากตัวอย่างในวงเล็บของ Q-02 (F-04) |
| auth/idp.py: get_verified_hn | IF-IDP-01 | ไม่ตรง | รับ token "Bearer verified:<HN>" แล้วเชื่อ HN ที่ส่งมาเลย ไม่ได้ได้รับผลจากระบบยืนยันตัวตน (F-02) |
| config.py: DATABASE_URL (ค่าเริ่มต้น sqlite:///./dev.db) | CON-TECH-01 | ตรง | ระบบจริงต้องตั้ง DATABASE_URL เป็น PostgreSQL ถ้าลืมตั้งจะใช้ SQLite โดยไม่มีอะไรเตือน (ไม่ใช่ข้อค้นพบ เป็นข้อควรระวังตอน deploy) |
| db/models.py: Slot, Booking, AuditLog / db/migrations/001_init.py: upgrade | CON-TECH-01, DOM-PDPA-01, IF-HIS-01 | ตรง | ตารางตรงกับ plan ข้อ 3 bookings ไม่มี national_id queue_no ว่างได้ตาม plan |
| main.py: lifespan, app | ไม่อ้าง FR (โครงระบบ) | - | รวม router 2 ตัว ไม่มี audit middleware (T-08 ยังไม่ทำ) |
| frontend/src/api/client.js: getSlots, createBooking | ไม่อ้าง (plan ข้อ 4) | ตรงกับ plan ข้อ 4 | createBooking ยังไม่ส่งผลยืนยันตัวตน (Authorization) ถ้าต่อ API จริงจะได้ 401 เป็นเรื่องของ T-12 ที่ยังไม่ถึง |
| frontend/src/App.jsx | ไม่อ้าง | - | โครงหน้าแรกเท่านั้น ยังไม่มีหน้าใดใน src/pages/ |

## 3. ข้อค้นพบ
ชนิด: AC ไม่มี test / test อ่อน / โค้ดไม่มี FR / FR ไม่มี AC / เดา Q-xx / ละเมิด Constraint / ตัวเลขไม่ตรง spec / อ้าง ID ผิดเรื่อง
ทีมตัดสิน: แก้โค้ด / แก้ spec / เพิ่ม Q-xx / ไม่ใช่ปัญหา (พร้อมเหตุผล 1 บรรทัด)

| F-ID | ชนิด | อยู่ที่ | ขัดกับ | รายละเอียด | ทีมตัดสิน |
|---|---|---|---|---|---|
| F-01 | ละเมิด Constraint | backend/app/booking/router.py:19, :25 | IF-HIS-01, plan ข้อ 4 (POST /bookings in: slot_id) | BookingRequest รับ `national_id` (คอมเมนต์ "เผื่อใช้ค้น HN จาก HIS") และ `logger.info` เขียนเลขบัตรประชาชนลง log ทุกครั้งที่จอง IF-HIS-01 ให้ค้น HIS ด้วยเลขบัตร แล้วใช้ HN ภายในระบบ การค้น HN เป็นงานของ GET /patients/lookup (T-09) ไม่ใช่ POST /bookings test_T01_no_national_id ตรวจแค่ตาราง จึงจับเรื่องนี้ไม่ได้ วิธีแก้ที่เป็นไปได้: ถอด national_id ออกจาก BookingRequest และ log | |
| F-02 | ละเมิด Constraint | backend/app/auth/idp.py:13-15 | IF-IDP-01 | get_verified_hn เชื่อ HN ที่ฝั่งเรียกส่งมาใน "Bearer verified:<HN>" โดยไม่ได้รับผลจากระบบยืนยันตัวตน ใครก็จองในชื่อ HN ของคนอื่นได้ docstring บอกว่าระบบจริงต้องไปตรวจกับระบบยืนยันตัวตน แต่ T-03 ถูกตั้งเป็น "เสร็จ" โดยอ้าง IF-IDP-01 และไม่มี task ไหนรับงานต่อระบบยืนยันตัวตนจริง ทีมต้องตัดสินว่าจะเพิ่ม task หรือบันทึกว่าเป็นตัวจำลองชั่วคราว | |
| F-03 | โค้ดไม่มี FR | backend/app/booking/router.py:35-41 (DELETE /bookings/{booking_id}), backend/app/booking/service.py:42-50 (cancel_booking) | Out of scope: ยกเลิก / เลื่อนคิว (UC-02) | **อยู่ใน Out of scope** ไม่มีใน plan ข้อ 4 และไม่มี task รองรับ คอมเมนต์อ้าง FR-BKG-04 ซึ่งพูดถึงการยืนยันจอง ไม่ใช่การยกเลิก (อ้าง ID ผิดเรื่องด้วย) prompt-log บันทึกว่า AI เพิ่มเอง "เพื่อความสมบูรณ์ของระบบ" ตอน T-03 endpoint นี้คืนที่นั่งและไม่มี audit log และไม่มี test | |
| F-04 | เดา Q-02 | backend/app/booking/service.py:13-18 (next_queue_no), :34 | Q-02, plan ข้อ 3 และข้อ 8 ("ยังไม่กำหนดวิธีออกเลข") | ออกเลขคิวรูปแบบ "A" + 3 หลัก และนับใหม่ทุกวัน ตอบ Q-02 ทั้ง 2 ข้อแทนเจ้าหน้าที่เวชระเบียน โดยหยิบ "A001" จากตัวอย่างในวงเล็บของ Q-02 มาใช้ T-06 (งานออกเลขคิว) ยังรอ Q-02 แต่โค้ดออกเลขไปแล้วใน T-03 นอกจากนี้การนับด้วย count ของการจองวันนั้น อาจได้เลขซ้ำเมื่อมีการจองพร้อมกัน | |
| F-05 | ตัวเลขไม่ตรง spec | backend/app/slots/service.py:10 (DAYS_AHEAD = 14) | FR-BKG-01 ("ภายใน 30 วันข้างหน้า"), Scope | GET /slots แสดงช่วงเวลาแค่ 14 วัน ผู้ใช้จะไม่เห็นช่วงวันที่ 15 ถึง 30 คอมเมนต์อ้าง FR-BKG-01 แต่ตัวเลขไม่ตรง ไม่มี test จับได้ (ดู F-06) | |
| F-06 | FR ไม่มี AC | spec.md: FR-BKG-01 / AC-BKG-05 | FR-BKG-01 | FR-BKG-01 บอกว่าแสดงช่วงเวลาภายใน 30 วันและจำนวนที่นั่งคงเหลือ แต่ AC เดียวที่อ้าง FR-BKG-01 (AC-BKG-05 ตาม Traceability) ตรวจแค่ความเร็ว จึงไม่มี AC ตรวจช่วง 30 วันหรือจำนวนที่นั่ง F-05 จึงหลุดมาได้ ควรเสนอ AC ใหม่ให้ทีม (ขอบ: วันที่ 30 และ 31) | |
| F-07 | FR ไม่มี AC | spec.md: FR-BKG-06 | FR-BKG-06 | FR-BKG-06 (เปลี่ยนแพ็กเกจแล้วคำนวณช่วงว่างใหม่) ไม่มี AC เลย (plan ข้อ 6 และ T-10 ระบุไว้แล้ว) โค้ดกรองด้วย package_code มีอยู่ใน T-02 ที่เสร็จแล้ว แต่ไม่มี test ที่ตรวจว่าเปลี่ยนแพ็กเกจแล้วได้ผลต่างกัน | |
| F-08 | FR ไม่มี AC | spec.md: NFR-SEC-01 | NFR-SEC-01 | NFR-SEC-01 (TLS 1.2 ขึ้นไป) ไม่มี AC และไม่มี task ใดใน tasks.md รับไป ทั้งตารางตรวจความครบของ tasks.md ก็ไม่มีแถว NFR | |
| F-09 | FR ไม่มี AC | spec.md: NFR-USE-01 | NFR-USE-01, ASM-05 | NFR-USE-01 (ผู้ใช้ใหม่ 8 ใน 10 คนจองสำเร็จใน 3 นาที) ไม่มี AC และไม่มี task ต้องทดสอบด้วยคน ยังไม่มีแผนว่าทดสอบเมื่อไหร่ | |
| F-10 | test อ่อน | backend/tests/test_AC_BKG_05.py:11-15 | AC-BKG-05 (Given ผู้ใช้พร้อมกัน 200 คน), plan ข้อ 6 ("ยิง GET /slots พร้อมกัน 200 ครั้ง") | test เรียก GET /slots ทีละครั้ง 200 รอบ ไม่ได้ส่งพร้อมกัน จึงไม่ได้ทดสอบภาระที่ AC กำหนด และไม่มี assert เรื่องข้อมูลที่ได้ (ช่วงเวลาและที่นั่งคงเหลือ) ถ้าลบ `.where(Slot.remaining > 0)` หรือเปลี่ยนจำนวนวัน test นี้ก็ยังผ่าน | |
| F-11 | test อ่อน | backend/tests/test_AC_BKG_01.py:6-12 (test_AC_BKG_01) | AC-BKG-01 | test_AC_BKG_01 ชื่ออ้าง AC แต่ assert แค่ `status_code == 201` ไม่ได้ดูข้อมูลที่บันทึกหรือที่นั่งคงเหลือ ตอนนี้ test_TC_BKG_01_1 และ test_TC_BKG_01_3 ตรวจส่วนนั้นแทนแล้ว (ถ้าลบบรรทัดที่ตัดที่นั่ง test_TC_BKG_01_1 จะไม่ผ่าน) ทีมอาจตัดสินว่าเก็บ test นี้ไว้เป็น smoke test ได้ | |

## 4. แก้แล้ว
| F-ID | แก้อย่างไร | รู้ได้อย่างไร |
|---|---|---|
| (ยังไม่มี rtm.md รอบก่อน) | - | - |

หมายเหตุ: บั๊กที่ยอมให้จองเมื่อเหลือ 0 ที่ (service.py:26 เคยเป็น `< 0`) ถูกแก้ก่อนสร้าง rtm.md นี้ (commit 2de4e7c) จึงไม่มี F-ID ตรวจได้จาก test_TC_BKG_01_3_slot_already_full ที่ผ่านแล้ว
