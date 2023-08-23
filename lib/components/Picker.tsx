import { HTMLProps, MutableRefObject, createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import styles from './styles.module.css'

const DEFAULT_HEIGHT = 216
const DEFAULT_ITEM_HEIGHT = 36
const DEFAULT_WHEEL_MODE = 'off'

interface Option {
  value: string
  element: MutableRefObject<HTMLElement | null>
}

export interface PickerValue {
  [key: string]: any
}

export interface PickerRootProps extends Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange'> {
  value: PickerValue
  onChange(value: PickerValue, key: string): void
  height?: number
  itemHeight?: number
  wheelMode?: 'off' | 'natural' | 'normal'
}

const PickerDataContext = createContext<{
  height: number
  itemHeight: number
  wheelMode: 'off' | 'natural' | 'normal'
  value: PickerValue
  optionGroups: { [key: string]: Option[] }
} | null>(null)
PickerDataContext.displayName = 'PickerDataContext'

export function usePickerData(componentName: string) {
  const context = useContext(PickerDataContext)
  if (context === null) {
    const error = new Error(`<${componentName} /> is missing a parent <Picker /> component.`)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, usePickerData)
    }
    throw error
  }
  return context
}

const PickerActionsContext = createContext<{
  registerOption(key: string, option: Option): () => void
  change(key: string, value: string): boolean
} | null>(null)
PickerActionsContext.displayName = 'PickerActionsContext'

export function usePickerActions(componentName: string) {
  const context = useContext(PickerActionsContext)
  if (context === null) {
    const error = new Error(`<${componentName} /> is missing a parent <Picker /> component.`)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, usePickerActions)
    }
    throw error
  }
  return context
}

function sortByDomNode<T>(
  nodes: T[],
  resolveKey: (item: T) => HTMLElement | null = (i) => i as unknown as HTMLElement | null
): T[] {
  return nodes.slice().sort((aItem, zItem) => {
    const a = resolveKey(aItem)
    const z = resolveKey(zItem)

    if (a === null || z === null) return 0

    const position = a.compareDocumentPosition(z)

    if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1
    if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1
    return 0
  })
}

function pickerReducer(
  optionGroups: { [key: string]: Option[] },
  action: {
    type: 'REGISTER_OPTION' | 'UNREGISTER_OPTION'
    key: string
    option: Option
  }
) {
  switch (action.type) {
    case 'REGISTER_OPTION': {
      const { key, option } = action
      let nextOptionsForKey = [...(optionGroups[key] || []), option]
      nextOptionsForKey = sortByDomNode(nextOptionsForKey, (o) => o.element.current)
      return {
        ...optionGroups,
        [key]: nextOptionsForKey,
      }
    }
    case 'UNREGISTER_OPTION': {
      const { key, option } = action
      return {
        ...optionGroups,
        [key]: (optionGroups[key] || []).filter((o) => o !== option),
      }
    }
    default: {
      throw Error(`Unknown action: ${action.type as string}`);
    }
  }
}

function PickerRoot(props: PickerRootProps) {
  const {
    className,
    children,
    value,
    onChange,
    height = DEFAULT_HEIGHT,
    itemHeight = DEFAULT_ITEM_HEIGHT,
    wheelMode = DEFAULT_WHEEL_MODE,
    ...restProps
  } = props

  const highlightStyle = useMemo(() => ({
    height: itemHeight,
    marginTop: -(itemHeight / 2),
  }), [itemHeight])
  const containerStyle = useMemo(
    () => ({ height: `${height}px` }),
    [height]
  )

  const [optionGroups, dispatch] = useReducer(pickerReducer, {})

  const pickerData = useMemo(
    () => ({ height, itemHeight, wheelMode, value, optionGroups }),
    [height, itemHeight, value, optionGroups]
  )
  
  const triggerChange = useCallback((key: string, nextValue: string) => {
    if (value[key] === nextValue) return false
    const nextPickerValue = { ...value, [key]: nextValue }
    onChange(nextPickerValue, key)
    return true
  }, [onChange, value])
  const registerOption = useCallback((key: string, option: Option) => {
    dispatch({ type: 'REGISTER_OPTION', key, option })
    return () => dispatch({ type: 'UNREGISTER_OPTION', key, option })
  }, [])
  const pickerActions = useMemo(
    () => ({ registerOption, change: triggerChange }),
    [registerOption, triggerChange]
  )

  return (
    <div
      className={`
        ${styles.container}
        ${className || ''}
      `}
      style={containerStyle}
      {...restProps}
    >
      <PickerActionsContext.Provider value={pickerActions}>
        <PickerDataContext.Provider value={pickerData}>
          {children}
        </PickerDataContext.Provider>
      </PickerActionsContext.Provider>
      <div
        className={styles.highlight}
        style={highlightStyle}
      ></div>
    </div>
  )
}

export default PickerRoot
