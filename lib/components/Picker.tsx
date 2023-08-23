import { CSSProperties, HTMLProps, MutableRefObject, createContext, useCallback, useContext, useMemo, useReducer } from 'react'

const DEFAULT_HEIGHT = 216
const DEFAULT_ITEM_HEIGHT = 36
const DEFAULT_WHEEL_MODE = 'off'

interface Option {
  value: string
  element: MutableRefObject<HTMLElement | null>
}

export interface PickerValue {
  [key: string]: string
}

export interface PickerRootProps<TType extends PickerValue> extends Omit<HTMLProps<HTMLDivElement>, 'value' | 'onChange'> {
  value: TType
  onChange: (value: TType, key: string) => void
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

function PickerRoot<TType extends PickerValue>(props: PickerRootProps<TType>) {
  const {
    style,
    children,
    value,
    onChange,
    height = DEFAULT_HEIGHT,
    itemHeight = DEFAULT_ITEM_HEIGHT,
    wheelMode = DEFAULT_WHEEL_MODE,
    ...restProps
  } = props

  const highlightStyle = useMemo<CSSProperties>(
    () => ({
      height: itemHeight,
      marginTop: -(itemHeight / 2),
      position: 'absolute',
      top: '50%',
      left: 0,
      width: '100%',
      pointerEvents: 'none',
    }),
    [itemHeight]
  )
  const containerStyle = useMemo<CSSProperties>(
    () => ({
      height: `${height}px`,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
      maskImage: 'linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent)',
      WebkitMaskImage: 'linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent)',
    }),
    [height]
  )

  const [optionGroups, dispatch] = useReducer(pickerReducer, {})

  const pickerData = useMemo(
    () => ({ height, itemHeight, wheelMode, value, optionGroups }),
    [height, itemHeight, value, optionGroups, wheelMode]
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
      style={{
        ...containerStyle,
        ...style,
      }}
      {...restProps}
    >
      <PickerActionsContext.Provider value={pickerActions}>
        <PickerDataContext.Provider value={pickerData}>
          {children}
        </PickerDataContext.Provider>
      </PickerActionsContext.Provider>
      <div
        style={highlightStyle}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 'auto',
            left: 0,
            right: 'auto',
            width: '100%',
            height: '1px',
            background: '#d9d9d9',
            transform: 'scaleY(0.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 'auto',
            bottom: 0,
            left: 0,
            right: 'auto',
            width: '100%',
            height: '1px',
            background: '#d9d9d9',
            transform: 'scaleY(0.5)',
          }}
        />
      </div>
    </div>
  )
}

export default PickerRoot
