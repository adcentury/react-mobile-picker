import { HTMLProps, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react'
import { usePickerActions, usePickerData } from './Picker'
import { useColumnData } from './PickerColumn'
import styles from './styles.module.css'

interface PickerItemRenderProps {
  selected: boolean
}

export interface PickerItemProps extends Omit<HTMLProps<HTMLDivElement>, 'value' | 'children'> {
  children: ReactNode | ((renderProps: PickerItemRenderProps) => ReactNode)
  value: string
}

function isFunction(functionToCheck: any): functionToCheck is Function {
  return typeof functionToCheck === 'function'
}

function PickerItem({ children, value }: PickerItemProps) {
  const optionRef = useRef<HTMLDivElement | null>(null)
  const { itemHeight, value: pickerValue } = usePickerData('Picker.Item')
  const pickerActions = usePickerActions('Picker.Item')
  const { key } = useColumnData('Picker.Item')

  useEffect(
    () => pickerActions.registerOption(key, { value, element: optionRef }),
    [key, pickerActions, value],
  )

  const style = useMemo(
    () => ({
      height: `${itemHeight}px`,
    }),
    [itemHeight],
  )

  const handleClick = useCallback(() => {
    pickerActions.change(key, value)
  }, [pickerActions, key, value])

  return (
    <div
      className={styles.item}
      style={style} ref={optionRef} onClick={handleClick}
    >
      {isFunction(children) ? children({ selected: pickerValue[key] === value }) : children}
    </div>
  )
}

export default PickerItem
