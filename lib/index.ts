import PickerRoot, { PickerValue, PickerRootProps as PickerProps } from './components/Picker'
import PickerColumn from './components/PickerColumn'
import PickerItem from './components/PickerItem'

export type { PickerProps, PickerValue }

const Picker = PickerRoot as typeof PickerRoot & {
  Column: typeof PickerColumn
  Item: typeof PickerItem
}

Picker.Column = PickerColumn
Picker.Item = PickerItem

export default Picker
