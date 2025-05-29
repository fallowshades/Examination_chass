import React from 'react'
import { useState, useEffect } from 'react'
import { getFirstDateOfISOWeek, formatWithPadding } from '~/routes/components/config/utils';
import { useSearchParams } from 'react-router'
function getWeekFromUrl(): number {
  const params = new URLSearchParams(window.location.search)
  const w = Number(params.get('week'))
  return Number.isNaN(w) ? 1 : w
}

const BTriggeredDay = ({week}:{week:number}) => {
  const [currentItem, setCurrentItem] = useState<number>(0)
  const dayOfWeek = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag']
  const [daysWithDates, setDaysWithDates] = useState<string[]>(dayOfWeek)

  //const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const monday = getFirstDateOfISOWeek({ year: currentYear, week })

    const daysWithDatesArray = dayOfWeek.map((day, index) =>
      formatWithPadding(day, monday, index)
    )
    console.log(daysWithDatesArray, 'daysWithDatesArray')
    setDaysWithDates(daysWithDatesArray)
  }, [week]) //, searchParams.toString()

  return (
    <div className='flex justify-center '>
      <input
        type='hidden'
        name='formType'
        value='setDayTabs'
      />
      <input
        type='hidden'
        name='day'
        value={currentItem + 1}
      />
      <div
        role='tablist'
        className=' tabs tabs-lifted md:flex flex-auto sm:center justify-center items-center  '>
        {daysWithDates.map((item, index) => {
          return (
            <button
              type='submit'
              key={index}
              onClick={() => setCurrentItem(index)}
              className={`flex-1 min-w-[20%]  h-[56px] flex-grow tab  ${
                index === currentItem
                  ? 'bg-black text-white [--tab-bg:#2B2F2F] [--tab-border-color:white]'
                  : 'tab-active  text-black [--tab-bg:#2B2F2F] [--tab-border-color:white]'
              }`}>
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BTriggeredDay