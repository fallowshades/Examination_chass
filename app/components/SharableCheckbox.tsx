import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
type CheckboxContext = {
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  isMobile: boolean
}

const CheckboxContext = React.createContext<CheckboxContext | null>(null)
export default function useSharableCheckbox() {
  const context = React.useContext(CheckboxContext)
  if (!context) {
    throw new Error(
      'useSharableCheckbox must be used within a CheckboxProvider'
    )
  }
  return context
}

function CheckboxProvider({
  defaultOpen = true,
  open: openProp,
  setOpen: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  setOpen?: (open: boolean) => void
}) {
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
    },
    [setOpenProp, open]
  )

  const state = open ? 'expanded' : 'collapsed'

  const contextValue = React.useMemo<CheckboxContext>(
    () => ({
      state,
      open,
      setOpen,
      openMobile: false,
      isMobile: false,
    }),
    [open, setOpen]
  )

  return (
    <CheckboxContext.Provider value={contextValue}>
      <div {...props}>{children}</div>
    </CheckboxContext.Provider>
  )
}
