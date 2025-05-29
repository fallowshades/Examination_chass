
import { type ChangeEvent } from 'react'
type FormRowSelectProps = {
  type?: string
  name: string
  labelText?: string
  list: {
    label: string
    value: number | string
  }[] // Assuming list contains strings
  defaultValue?: string | number | undefined
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}
import { nanoid } from 'nanoid'
const SelectInput = ({
  name,
  labelText,
  list,
  defaultValue = '',
  onChange,
}: FormRowSelectProps) => {
  return (
    <div className='form-row'>
      <label
        htmlFor={name}
        className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className='form-select underline'
        defaultValue={defaultValue}
        onChange={onChange}>
        {list
          ? list.reduce<React.ReactNode[]>((options, item) => {
              if (item !== null) {
                options.push(
                  <option
                    // className=''
                    key={nanoid()}
                    value={item.value}>
                    {item.label}
                  </option>
                )
              }
              return options
            }, [])
          : null}
      </select>
    </div>
  )
}
export default SelectInput
