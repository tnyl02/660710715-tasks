// จุดเดียวที่หน้าจอใช้เรียก API หลังบ้าน (ตามสัญญา API ใน plan.md ข้อ 4)
// ตอน test ให้ส่ง client จำลองเข้าไปในหน้าจอแทน ไม่ต้องรันหลังบ้านจริง
// เรียกผ่าน /api (ดู proxy ใน vite.config.js) หลังบ้านต้องรันอยู่ที่ port 8000
const BASE = import.meta.env.VITE_API_BASE ?? '/api'

export const api = {
  async getSlots({ dateFrom, packageCode }) {
    const q = new URLSearchParams({ date_from: dateFrom, package_code: packageCode })
    const res = await fetch(`${BASE}/slots?${q}`)
    return res.json()
  },
  async createBooking({ slotId }) {
    const res = await fetch(`${BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slot_id: slotId }),
    })
    return { status: res.status, body: await res.json() }
  },
}

const mockSlots = {
  standard: [
    { id: 101, slot_date: '2569-09-24', start_time: '09:00', remaining: 4 },
    { id: 102, slot_date: '2569-09-24', start_time: '10:30', remaining: 1 },
    { id: 103, slot_date: '2569-09-25', start_time: '09:00', remaining: 6 },
    { id: 104, slot_date: '2569-09-26', start_time: '13:00', remaining: 2 },
  ],
  extended: [
    { id: 201, slot_date: '2569-09-24', start_time: '08:30', remaining: 2 },
    { id: 202, slot_date: '2569-09-25', start_time: '11:00', remaining: 3 },
    { id: 203, slot_date: '2569-09-27', start_time: '14:00', remaining: 5 },
  ],
}

// จำลอง GET /slots สำหรับ FR-BKG-01 และ FR-BKG-06 ตามสัญญาใน plan.md
export const mockApi = {
  async getSlots({ packageCode }) {
    return { slots: mockSlots[packageCode] ?? [] }
  },
}
