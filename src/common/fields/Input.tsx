'use client'

import React from 'react'
import { Field } from 'react-final-form'
import { required as requiredValidator } from '@/common/utils/formValidators'

interface Props {
  name: string
  label: string
  placeholder?: string
  type?: string
  textarea?: boolean
  options?: { value: string; label: string }[]
  validate?: (value: string) => string | undefined
  required?: boolean
}

interface InputProps {
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onBlur: () => void
  onFocus: () => void
}

const InputField: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type = 'text',
  textarea,
  options,
  validate,
  required,
}) => {
  const combinedValidate = (value: string) => {
    if (required) {
      const error = requiredValidator()(value)
      if (error) return error
    }
    return validate?.(value)
  }

  const renderInput = (input: InputProps) => {
    if (type === 'select' && options)
      return (
        <select {...input} className="w-full h-12 px-4 border rounded-lg border-gray-300 focus:outline-none">
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )
    if (textarea)
      return (
        <textarea
          {...input}
          placeholder={placeholder}
          className="w-full min-h-[144px] px-4 py-2 border rounded-lg border-gray-300 focus:outline-none"
        />
      )
    if (type === 'date')
      return (
        <input
          {...input}
          type="date"
          placeholder={placeholder}
          className="w-full h-12 px-4 border rounded-lg border-gray-300 focus:outline-none"
        />
      )
    return (
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className="w-full h-12 px-4 border rounded-lg border-gray-300 focus:outline-none"
      />
    )
  }

  return (
    <Field name={name} validate={combinedValidate}>
      {({ input, meta }) => (
        <div>
          <label className="block mb-1 font-medium">{label}</label>
          {renderInput(input)}
          {meta.touched && meta.error && (
            <p className="text-sm text-red-500 mt-1">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  )
}

export default InputField
