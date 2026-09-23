import { useEffect, useState } from 'react'

import { mockApi } from '../api/client'

const packages = [
  { code: 'standard', label: 'ตรวจสุขภาพมาตรฐาน' },
  { code: 'extended', label: 'ตรวจสุขภาพแบบละเอียด' },
]

function formatDate(value) {
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

// แสดงช่วงเวลาว่างตามแพ็กเกจสำหรับ FR-BKG-01 และ FR-BKG-06
export default function SlotPicker({ client = mockApi }) {
  const [packageCode, setPackageCode] = useState(packages[0].code)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSlotId, setSelectedSlotId] = useState(null)

  useEffect(() => {
    let active = true

    setLoading(true)
    client.getSlots({ dateFrom: new Date().toISOString().slice(0, 10), packageCode })
      .then((result) => {
        if (active) {
          setSlots(result.slots)
          setSelectedSlotId(null)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [client, packageCode])

  return (
    <section className="min-h-screen bg-[#f5f7f2] px-5 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            Health screening / queue booking
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            ระบบจองคิวตรวจสุขภาพ
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            เลือกแพ็กเกจและช่วงเวลาที่พร้อมให้บริการ พร้อมดูจำนวนที่นั่งคงเหลือ
          </p>
        </header>

        <div className="mb-8 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="แพ็กเกจตรวจสุขภาพ">
          {packages.map((item) => (
            <button
              key={item.code}
              type="button"
              role="radio"
              aria-checked={packageCode === item.code}
              onClick={() => setPackageCode(item.code)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                packageCode === item.code
                  ? 'border-teal-700 bg-teal-50 ring-2 ring-teal-700/15'
                  : 'border-slate-200 bg-white hover:border-teal-400'
              }`}
            >
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs text-slate-500">แพ็กเกจ {item.code}</span>
            </button>
          ))}
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">เลือกแพ็กเกจและช่วงเวลา</h2>
            <p className="mt-1 text-sm text-slate-500">แสดงวันและเวลาที่มีที่นั่งภายใน 30 วัน</p>
          </div>
          <span className="text-xs font-medium text-slate-500">{slots.length} ช่วงเวลา</span>
        </div>

        {loading ? (
          <p className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            กำลังโหลดช่วงเวลา...
          </p>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {slots.map((slot) => {
              const isSelected = selectedSlotId === slot.id
              return (
                <button
                  key={slot.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`flex items-center justify-between rounded-xl border bg-white p-4 text-left transition-colors ${
                    isSelected ? 'border-teal-700 ring-2 ring-teal-700/15' : 'border-slate-200 hover:border-teal-400'
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold">{formatDate(slot.slot_date)}</span>
                    <span className="mt-1 block text-2xl font-semibold tracking-tight text-slate-950">
                      {slot.start_time} น.
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block text-2xl font-semibold text-teal-700">{slot.remaining}</span>
                    <span className="block text-xs text-slate-500">ที่นั่งคงเหลือ</span>
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}