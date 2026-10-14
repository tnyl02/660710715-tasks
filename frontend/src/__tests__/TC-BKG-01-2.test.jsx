// TC-BKG-01-2 (AC-BKG-01 ทางปกติ) จาก specs/001-booking/test-cases.md (สร้างด้วย /testcases)
// หน้าแสดงผลการจอง BookingResult (T-06 รอ Q-02)
import { render } from '@testing-library/react'
import BookingResult from '../pages/BookingResult.jsx'

test('TC-BKG-01-2 หน้าแสดงผลการจองแสดงหมายเลขคิว', () => {
  // Given API จำลองตอบการจองสำเร็จ พร้อม booking id และหมายเลขคิว (รูปผลลัพธ์ตาม plan ข้อ 4)
  const booking = { booking_id: 1, slot_id: 1, queue_no: 'Q-TEST' }

  // When เปิดหน้าแสดงผลการจอง (BookingResult)
  render(<BookingResult booking={booking} />)

  // Then หน้าจอแสดงหมายเลขคิวที่ได้จาก API -> ยังไม่ตรวจ เพราะรอ Q-02
})
