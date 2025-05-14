import React from 'react'
import { useFetcher } from 'react-router';

const CheckboxWaterFall = ({ selectedTimeSlots }: {
    selectedTimeSlots: Record<string, {timeSlotId: string; startTime: string; endTime: string}[]>
    
}) => {
    const fetcher = useFetcher()
  return (
    <div>CheckboxWaterFall</div>
  )
}

export default CheckboxWaterFall