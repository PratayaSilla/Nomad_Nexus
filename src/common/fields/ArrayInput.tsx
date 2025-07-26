'use client'

import React from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'

interface ArrayInputProps {
  name: string
  label: string
  description: string
  placeholder: string
  errorMsg: string
}

export const ArrayInput: React.FC<ArrayInputProps> = ({
  name,
  label,
  description,
  placeholder,
  errorMsg,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 mt-8 bg-gray-50 w-full">
      <h2 className="text-xl font-semibold mb-1">{label}</h2>
      <p className="text-gray-500 mb-6 text-sm">{description}</p>

      <FieldArray name={name}>
        {({ fields }) => (
          <>
            {fields.map((fieldName, idx) => (
              <div
                key={fieldName}
                className="mb-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200 relative flex items-center"
              >
                <Field
                  name={fieldName}
                  validate={idx === 0 ? (value) => (value ? undefined : errorMsg) : undefined}
                >
                  {({ input, meta }) => (
                    <>
                      <input
                        {...input}
                        type="text"
                        placeholder={`${placeholder} ${idx + 1}`}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        required={idx === 0}
                      />
                      {meta.touched && meta.error && (
                        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                      )}
                    </>
                  )}
                </Field>
                {(fields?.length ?? 0) > 1  && (
                  <button
                    type="button"
                    onClick={() => fields.remove(idx)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xl font-bold px-2 py-1 rounded focus:outline-none"
                    aria-label={`Remove ${name}`}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}

            <div className="flex justify-center mt-2">
              <button
                type="button"
                onClick={() => fields.push('')}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 focus:outline-none transition-all text-base font-medium"
                aria-label={`Add ${name}`}
              >
                <span className="text-xl leading-none">+</span> Add another {name.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </button>
            </div>
          </>
        )}
      </FieldArray>
    </div>
  )
}
