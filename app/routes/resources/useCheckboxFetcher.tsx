import { useFetcher } from 'react-router'
import { useRef, useEffect } from 'react'

import { type ActionFunctionArgs } from 'react-router'

export const loader = async ({ request }: ActionFunctionArgs) => {
  return null
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const name = formData.get('name')
  return null
}

export function useCheckboxFetcher(
  roomId: string,
  open: boolean,
  selected: any
) {
  const fetcher = useFetcher()
  const hasOpened = useRef(false)

  useEffect(() => {
    if (!hasOpened.current && !open) return
    hasOpened.current = true

    if (open) {
      // Initial load (optional)
      // fetcher.load(`/resources/checkboxes?roomId=${roomId}`)
    } else {
      // Save selection on close
      const data = selected[roomId] ?? []
      interface SelectedItem {
        timeSlotID: string
        startTime: string
        endTime: string
      }

      interface Payload {
        roomId: string
        bookingIds: string[]
        timeStrings: string[]
      }

      const payload: Payload = {
        roomId,
        bookingIds: (data as SelectedItem[]).map((s) => s.timeSlotID),
        timeStrings: (data as SelectedItem[]).map(
          (s) => `${s.startTime}-${s.endTime}`
        ),
      }

      const formData = new FormData()
      formData.append('roomId', payload.roomId)
      payload.bookingIds.forEach((id) => formData.append('bookingIds', id))
      payload.timeStrings.forEach((ts) => formData.append('timeStrings', ts))

      //   fetcher.submit(formData, {
      //     method: 'POST',
      //     action: '/resources/save-checkboxes', // match your loader/action route
      //   })
    }
  }, [open, fetcher.state, fetcher.data])

  return null
}
