import { Fragment, useCallback, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Picker, { PickerValue } from 'react-mobile-picker'

function getDayArray(year: number, month: number) {
  const dayCount = new Date(year, month, 0).getDate()
  return Array.from({ length: dayCount }, (_, i) => String(i + 1).padStart(2, '0'))
}

export default function ModalPicker() {
  const [isOpen, setIsOpen] = useState(false)
  const [pickerValue, setPickerValue] = useState<PickerValue>({
    year: '1989',
    month: '08',
    day: '12',
  })

  const handlePickerChange = useCallback((newValue: PickerValue, key: string) => {
    if (key === 'day' ) {
      setPickerValue(newValue)
      return
    }

    const { year, month } = newValue
    const newDayArray = getDayArray(Number(year), Number(month))
    const newDay = newDayArray.includes(newValue.day) ? newValue.day : newDayArray[newDayArray.length - 1]
    setPickerValue({ ...newValue, day: newDay })
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="ml-4 rounded-md bg-black/40 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Click to set: {pickerValue.year}-{pickerValue.month}-{pickerValue.day}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Choose your birthday
                  </Dialog.Title>
                  <div className="mt-2">
                    <Picker
                      value={pickerValue}
                      onChange={handlePickerChange}
                      wheelMode="natural"
                    >
                      <Picker.Column name="year">
                        { Array.from({ length: 100 }, (_, i) => `${1923 + i}`).map((year) => (
                          <Picker.Item key={year} value={year}>
                            {({ selected }) => (
                              <div className={selected ? 'font-semibold text-neutral-900' : 'text-neutral-400'}>{year}</div>
                            )}
                          </Picker.Item>
                        ))}
                      </Picker.Column>
                      <Picker.Column name="month">
                        { Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((month) => (
                          <Picker.Item key={month} value={month}>
                            {({ selected }) => (
                              <div className={selected ? 'font-semibold text-neutral-900' : 'text-neutral-400'}>{month}</div>
                            )}
                          </Picker.Item>
                        ))}
                      </Picker.Column>
                      <Picker.Column name="day">
                        { getDayArray(Number(pickerValue.year), Number(pickerValue.month)).map((day) => (
                          <Picker.Item key={day} value={day}>
                            {({ selected }) => (
                              <div className={selected ? 'font-semibold text-neutral-900' : 'text-neutral-400'}>{day}</div>
                            )}
                          </Picker.Item>
                        ))}
                      </Picker.Column>
                    </Picker>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
