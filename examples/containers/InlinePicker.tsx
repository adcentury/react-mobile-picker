import { useState } from 'react'
import Picker from 'react-mobile-picker'

function renderOptions(options: string[], selectedColor: string) {
  return options.map((option) => (
    <Picker.Item key={option} value={option}>
      {({ selected }) => (
        <div className={selected ? `font-semibold ${selectedColor}` : 'text-neutral-400'}>{option}</div>
      )}
    </Picker.Item>
  ))
}

export default function InlinePicker() {
  const [pickerValue, setPickerValue] = useState({
    title: 'Mr.',
    firstName: 'Micheal',
    lastName: 'Jordan'
  })

  return <>
    <div
      className="
        mb-2 px-4 h-12 flex items-center bg-white
        border-t border-b border-gray-200 border-solid
      "
    >Hi, {pickerValue.title} {pickerValue.firstName} {pickerValue.lastName}</div>
    <Picker
      className="px-4"
      value={pickerValue}
      onChange={setPickerValue}
      wheelMode="natural"
    >
      <Picker.Column name="title">
        {renderOptions(['Mr.', 'Mrs.', 'Ms.', 'Dr.'], 'text-red-600')}
      </Picker.Column>
      <Picker.Column name="firstName">
        {renderOptions(['John', 'Micheal', 'Elizabeth'], 'text-yellow-600')}
      </Picker.Column>
      <Picker.Column name="lastName">
        {renderOptions(['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor'], 'text-green-600')}
      </Picker.Column>
    </Picker>
  </>
}
