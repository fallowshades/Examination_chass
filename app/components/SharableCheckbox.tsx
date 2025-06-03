import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
type CheckboxContext = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  isMobile: boolean
  toggleDropdown: () => void
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

  const [isMobile, setOpenMobile] = React.useState(false)
  const toggleDropdown = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  const contextValue = React.useMemo<CheckboxContext>(
    () => ({
      state,
      open,
      setOpen,
      openMobile: false,
      isMobile: false,
      toggleDropdown,
    }),
    [open, setOpen]
  )

  return (
    <CheckboxContext.Provider value={contextValue}>
      <div {...props}>{children}</div>
    </CheckboxContext.Provider>
  )
}

function Checkbox({
  variant = 'checkbox',
  className,
  children,
  collapsible,
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'checkbox' | 'inset'
  collapsible?: 'offCanvas' | 'icon' | 'none'
}) {
  const { isMobile, state, openMobile, setOpen } = useSharableCheckbox()

  if (collapsible === 'none') {
    // handle non-collapsible case
    return (
      <div
        data-slot='sidebar'
        {...props}>
        {children}
      </div>
    )
  }
  if (true) {
    return <div>this is a Mobiile</div>
  }
  if (isMobile) {
    return <div>this is a Mobiile</div>
  }

  // Add your component rendering logic here
  return (
    <div
      className={className}
      {...props}>
      {children}
    </div>
  )
}

export { CheckboxContext, CheckboxProvider, Checkbox }

import { Button } from './ui/button'
import { cn } from '~/lib/utils'
import { FaChevronDown } from 'react-icons/fa'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
function CheckBoxTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleDropdown } = useSharableCheckbox()

  return (
    <DropdownMenuTrigger
      asChild
      onClick={(e) => e.stopPropagation()}
      className={cn('', className)}>
      <Button
        className='flex gap-2 text-base'
        data-checkbox='trigger'
        data-slot='checkbox-trigger'
        //   variant='ghost'

        onClick={(event) => {
          onClick?.(event)
          toggleDropdown()
        }}
        {...props}>
        Se lediga timmar
        <span className='sr-only'>Se lediga timmar</span>
        <FaChevronDown />
      </Button>
    </DropdownMenuTrigger>
  )
}
export { CheckBoxTrigger }
