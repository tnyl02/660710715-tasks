# Tasks: จองคิวตรวจสุขภาพ (Booking)

- Feature: จองคิวตรวจสุขภาพ (Booking)
- Spec ID: SPEC-BKG-001
- อ้างอิง: [plan.md](plan.md)
- วันที่: 2569-09-23
- สรุป: มีทั้งหมด 18 task เรียงตามการพึ่งพาจากฐานข้อมูล หลังบ้าน หน้าจอ การเชื่อมต่อ และการทดสอบคุณภาพ
- มี 6 task ที่ต้องรอ Open Question Q-02 เรื่องรูปแบบและวิธีออกหมายเลขคิว

## รายการ task

### T-01 สร้างตารางและ migration
- รองรับ: CON-TECH-01, DOM-PDPA-01, IF-HIS-01
- ตรวจด้วย: ไม่มี AC ตรง ๆ เป็นงานพื้นฐานของ T-05, T-09 และ T-10
- ไฟล์ที่แตะ: `backend/app/db/models.py`, `backend/app/db/session.py`, `backend/app/db/migrations/001_init.py`, `backend/tests/conftest.py`
- ต้องทำหลัง: ไม่มี
- เสร็จเมื่อ: migration สร้างตาราง `slots`, `bookings` และ `audit_logs` ได้ และตาราง `bookings` ไม่มีคอลัมน์เลขบัตรประชาชน
- สถานะ: เสร็จ รอทีมตรวจ

### T-02 ตรวจผลการยืนยันตัวตนก่อนเข้าถึงข้อมูล
- รองรับ: IF-IDP-01
- ตรวจด้วย: ไม่มี AC ตรง ๆ เป็นงานพื้นฐานของ endpoint ทุกตัวที่แตะข้อมูลผู้รับบริการ
- ไฟล์ที่แตะ: `backend/app/auth/idp.py`, `backend/app/main.py`, `backend/tests/test_idp.py`
- ต้องทำหลัง: T-01
- เสร็จเมื่อ: endpoint ที่แตะข้อมูลการจองปฏิเสธคำขอที่ไม่มีผลยืนยันตัวตน และยอมรับคำขอที่ยืนยันแล้ว
- สถานะ: พร้อมทำ

### T-03 สร้าง API ค้นหาช่วงเวลาว่าง
- รองรับ: FR-BKG-01, FR-BKG-06, ASM-01, ASM-02
- ตรวจด้วย: ไม่มี AC ตรง ๆ เป็นงานพื้นฐานของ T-04 และ T-12
- ไฟล์ที่แตะ: `backend/app/slots/service.py`, `backend/app/slots/router.py`, `backend/app/main.py`, `backend/tests/test_slots.py`
- ต้องทำหลัง: T-01, T-02
- เสร็จเมื่อ: `GET /slots` คืนช่วงเวลาภายใน 30 วันพร้อม `remaining` และคำนวณผลใหม่เมื่อ `package_code` เปลี่ยน โดยใช้เขตเวลา Asia/Bangkok
- สถานะ: พร้อมทำ

### T-04 วัดประสิทธิภาพการค้นหาช่วงเวลา
- รองรับ: NFR-PERF-01, FR-BKG-01
- ตรวจด้วย: AC-BKG-05
- ไฟล์ที่แตะ: `backend/tests/test_AC_BKG_05.py`
- ต้องทำหลัง: T-03
- เสร็จเมื่อ: การยิงค้นหาช่วงเวลาพร้อมกัน 200 ครั้งให้ค่า p95 ไม่เกิน 2 วินาทีในสภาพแวดล้อมทดสอบที่กำหนด
- สถานะ: พร้อมทำ

### T-05 บันทึกการจองและตัดที่นั่งแบบธุรกรรม
- รองรับ: FR-BKG-04, CON-TECH-01
- ตรวจด้วย: ไม่มี AC ตรง ๆ เป็นงานพื้นฐานของ T-06, T-07 และ T-08
- ไฟล์ที่แตะ: `backend/app/booking/service.py`, `backend/app/booking/router.py`, `backend/app/main.py`, `backend/tests/test_booking_create.py`
- ต้องทำหลัง: T-01, T-02, T-03
- เสร็จเมื่อ: การยืนยันช่วงที่ยังว่างบันทึก booking และลด `remaining` ในธุรกรรมเดียวกันโดยไม่กำหนดวิธีออกหมายเลขคิว
- สถานะ: พร้อมทำ

### T-06 ปฏิเสธการจองซ้ำในวันเดียวกัน
- รองรับ: FR-BKG-02, ASM-02
- ตรวจด้วย: AC-BKG-02
- ไฟล์ที่แตะ: `backend/app/booking/service.py`, `backend/app/booking/router.py`, `backend/tests/test_AC_BKG_02.py`
- ต้องทำหลัง: T-05
- เสร็จเมื่อ: การจองซ้ำของผู้รับบริการในวันเดียวกันถูกปฏิเสธและตอบหมายเลขคิวเดิมตามรูปแบบที่ทีมกำหนดใน Q-02
- สถานะ: รอ Q-02

### T-07 เสนอช่วงเวลาใกล้เคียงเมื่อที่นั่งเต็ม
- รองรับ: FR-BKG-03, ASM-02
- ตรวจด้วย: AC-BKG-03
- ไฟล์ที่แตะ: `backend/app/slots/service.py`, `backend/app/booking/service.py`, `backend/app/booking/router.py`, `backend/tests/test_AC_BKG_03.py`
- ต้องทำหลัง: T-03, T-05
- เสร็จเมื่อ: การยืนยันช่วงที่เต็มตอบสถานะที่กำหนดพร้อมช่วงว่าง 3 ตัวเลือกที่ใกล้ที่สุดในวันเดียวกันและวันถัดไป และไม่สร้าง booking
- สถานะ: พร้อมทำ

### T-08 วางคิวและส่งข้อความยืนยันแบบ asynchronous
- รองรับ: FR-BKG-05, IF-NOT-01, NFR-REL-02, ASM-03
- ตรวจด้วย: AC-BKG-04
- ไฟล์ที่แตะ: `backend/app/notify/queue.py`, `backend/app/booking/service.py`, `backend/app/booking/router.py`, `backend/tests/test_AC_BKG_04.py`
- ต้องทำหลัง: T-05
- เสร็จเมื่อ: เมื่อระบบแจ้งเตือนไม่ตอบสนอง booking ยังถูกบันทึก มีงานในคิวส่งซ้ำภายใน 5 นาที และผลลัพธ์แสดงหมายเลขคิวตาม Q-02
- สถานะ: รอ Q-02

### T-09 บันทึก audit log ทุกการเข้าถึงข้อมูล
- รองรับ: DOM-PDPA-01
- ตรวจด้วย: AC-BKG-06
- ไฟล์ที่แตะ: `backend/app/audit/middleware.py`, `backend/app/main.py`, `backend/tests/test_AC_BKG_06.py`
- ต้องทำหลัง: T-01, T-02, T-05
- เสร็จเมื่อ: การเปิดดูข้อมูลการจองสร้าง audit log ที่มีผู้เข้าถึง เวลา และรหัสผู้รับบริการ และกำหนดการเก็บไม่น้อยกว่า 1 ปี
- สถานะ: พร้อมทำ

### T-10 ค้น HN จาก HIS โดยไม่เก็บเลขบัตรประชาชน
- รองรับ: IF-HIS-01
- ตรวจด้วย: ไม่มี AC ตรง ๆ เป็นงานพื้นฐานของ T-05 และ T-16
- ไฟล์ที่แตะ: `backend/app/his/client.py`, `backend/app/booking/router.py`, `backend/tests/test_his_lookup.py`
- ต้องทำหลัง: T-01, T-02
- เสร็จเมื่อ: `GET /patients/lookup` ส่งเลขบัตรไปค้น HIS แล้วคืน HN และข้อมูล booking ภายในใช้เฉพาะ HN
- สถานะ: พร้อมทำ

### T-11 กำหนดการออกและแสดงหมายเลขคิว
- รองรับ: FR-BKG-04, FR-BKG-05, IF-HIS-01
- ตรวจด้วย: AC-BKG-01
- ไฟล์ที่แตะ: `backend/app/booking/service.py`, `backend/app/booking/router.py`, `backend/tests/test_AC_BKG_01.py`
- ต้องทำหลัง: T-05, T-06, T-08
- เสร็จเมื่อ: หลัง Q-02 ได้คำตอบ ระบบออกหมายเลขคิวตามรูปแบบที่ตกลง บันทึกได้ และตอบหมายเลขคิวพร้อม `remaining = 0`
- สถานะ: รอ Q-02

### T-12 สร้างหน้าจอเลือกแพ็กเกจและช่วงเวลา
- รองรับ: FR-BKG-01, FR-BKG-06, ASM-01
- ตรวจด้วย: ไม่มี AC ตรง ๆ เป็นงานพื้นฐานของ T-13 และ T-16
- ไฟล์ที่แตะ: `frontend/src/pages/SlotPicker.jsx`, `frontend/src/App.jsx`, `frontend/src/api/client.js`
- ต้องทำหลัง: ไม่มี
- เสร็จเมื่อ: หน้าจอเรียก API จำลอง แสดงช่วงเวลาพร้อมที่นั่งคงเหลือ และโหลดข้อมูลใหม่เมื่อเปลี่ยนแพ็กเกจ
- สถานะ: พร้อมทำ

### T-13 สร้างหน้ายืนยันและตัวเลือกเมื่อช่วงเวลาเต็ม
- รองรับ: FR-BKG-03, FR-BKG-04
- ตรวจด้วย: AC-BKG-03
- ไฟล์ที่แตะ: `frontend/src/pages/ConfirmBooking.jsx`, `frontend/src/App.jsx`, `frontend/src/api/client.js`
- ต้องทำหลัง: T-12
- เสร็จเมื่อ: API จำลองตอบว่าช่วงเวลาเต็มแล้วหน้าจอแจ้งข้อความและแสดงตัวเลือกช่วงว่าง 3 รายการ
- สถานะ: พร้อมทำ

### T-14 สร้างหน้าจอผลการจอง
- รองรับ: FR-BKG-04, FR-BKG-05
- ตรวจด้วย: AC-BKG-01
- ไฟล์ที่แตะ: `frontend/src/pages/BookingResult.jsx`, `frontend/src/App.jsx`
- ต้องทำหลัง: T-12
- เสร็จเมื่อ: หน้าจอแสดงหมายเลขคิวและผลสำเร็จของการจองตามสัญญา API หลัง Q-02 กำหนดรูปแบบหมายเลขแล้ว
- สถานะ: รอ Q-02

### T-15 ทดสอบหน้าจอช่วงเวลาเต็ม
- รองรับ: FR-BKG-03
- ตรวจด้วย: AC-BKG-03
- ไฟล์ที่แตะ: `frontend/src/__tests__/AC-BKG-03.test.jsx`
- ต้องทำหลัง: T-13
- เสร็จเมื่อ: Vitest และ React Testing Library ยืนยันว่าหน้าจอแสดงข้อความช่วงเวลาเต็มและตัวเลือกครบ 3 รายการ
- สถานะ: พร้อมทำ

### T-16 ต่อหน้าจอกับ API จริง
- รองรับ: FR-BKG-01, FR-BKG-03, FR-BKG-04, FR-BKG-05, IF-IDP-01
- ตรวจด้วย: ไม่มี AC ตรง ๆ เป็นงานรวมการทำงานของ T-03, T-07, T-08 และ T-11
- ไฟล์ที่แตะ: `frontend/src/api/client.js`, `frontend/src/App.jsx`, `frontend/src/pages/SlotPicker.jsx`, `frontend/src/pages/ConfirmBooking.jsx`, `frontend/src/pages/BookingResult.jsx`, `frontend/vite.config.js`
- ต้องทำหลัง: T-02, T-03, T-07, T-08, T-11, T-12, T-13, T-14
- เสร็จเมื่อ: หน้าจอเรียก API จริงผ่าน `/api` และแสดงผลสำเร็จหรือช่วงเวลาเต็มตามสัญญาโดยไม่ใช้ client จำลอง
- สถานะ: รอ Q-02

### T-17 ตั้งค่าการรับส่งข้อมูลด้วย TLS
- รองรับ: NFR-SEC-01
- ตรวจด้วย: ไม่มี AC ตรง ๆ เป็นงานทำให้ NFR-SEC-01 เป็นจริง
- ไฟล์ที่แตะ: `backend/app/config.py`, `backend/app/main.py`, `frontend/vite.config.js`
- ต้องทำหลัง: T-02, T-16
- เสร็จเมื่อ: การรับส่งข้อมูลของระบบถูกกำหนดให้ใช้ TLS 1.2 ขึ้นไปและมีการตรวจค่าการตั้งค่าใน test หรือขั้นตอนตรวจ deployment
- สถานะ: พร้อมทำ

### T-18 ตรวจ usability ของการจองสำหรับผู้ใช้ใหม่
- รองรับ: NFR-USE-01, ASM-05
- ตรวจด้วย: ไม่มี AC ตรง ๆ เป็นงานตรวจ NFR-USE-01
- ไฟล์ที่แตะ: `frontend/src/__tests__/usability-booking.md`, `frontend/src/pages/SlotPicker.jsx`, `frontend/src/pages/ConfirmBooking.jsx`, `frontend/src/pages/BookingResult.jsx`
- ต้องทำหลัง: T-16
- เสร็จเมื่อ: อาสาสมัคร 10 คนที่ไม่เคยใช้ระบบจองมาก่อนอย่างน้อย 8 คนจองสำเร็จภายใน 3 นาทีโดยไม่ขอความช่วยเหลือ
- สถานะ: รอ Q-02

## ตารางตรวจความครบ

### Acceptance Criteria

| AC ID | task ที่ตรวจ AC นี้ |
|---|---|
| AC-BKG-01 | T-11, T-14 |
| AC-BKG-02 | T-06 |
| AC-BKG-03 | T-07, T-13, T-15 |
| AC-BKG-04 | T-08 |
| AC-BKG-05 | T-04 |
| AC-BKG-06 | T-09 |

### Constraint ID

| Constraint ID | task ที่ทำให้เป็นจริง |
|---|---|
| CON-TECH-01 | T-01, T-05 |
| DOM-PDPA-01 | T-01, T-09 |
| IF-IDP-01 | T-02, T-16 |
| IF-HIS-01 | T-01, T-10, T-11 |
| IF-NOT-01 | T-08 |

## สิ่งที่ยังไม่ทำ

- Q-02 หมายเลขคิวรีเซ็ตรายวัน หรือนับต่อเนื่อง และมีรูปแบบอย่างไร -> ถามเจ้าหน้าที่เวชระเบียน
- งานที่รอ Q-02: T-06, T-08, T-11, T-14, T-16 และ T-18
- ส่วนที่เกี่ยวข้องกับวิธีออกเลขคิวและการแสดงเลขคิวจะยังไม่สร้างจนกว่าจะได้คำตอบ ตาม plan.md ข้อ 8
