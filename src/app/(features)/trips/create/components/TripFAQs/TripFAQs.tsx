'use client'

import React from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { required } from '@/common/utils/formValidators'


const faqFields = {
  question: {
    label: 'Question',
    placeholder: 'Enter question',
    validate: required('At least one question is required'),
  },
  answer: {
    label: 'Answer',
    placeholder: 'Enter answer',
    validate: required('At least one answer is required'),
  },
}


export const TripFAQs = () => {

  return (

    <div>
      <div className="border border-gray-300 rounded-lg p-6 mt-8 bg-gray-50 w-full">
        <h2 className="text-xl font-semibold mb-1">FAQs</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Add common questions and answers about your trip. This helps participants know what to expect.
        </p>

        <FieldArray name="faqs">
          {({ fields }) => (
            <>
              {fields.map((name, idx) => (
                <div
                  key={name}
                  className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200 relative"
                >
                  {(['question', 'answer'] as const).map((field) => (
                    <div className="mb-3" key={field}>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor={`faq-${field}-${idx}`}
                      >
                        {faqFields[field].label}
                      </label>
                      <Field
                        name={`${name}.${field}`}
                        validate={idx === 0 ? faqFields[field].validate : undefined}
                      >
                        {({ input, meta }) => (
                          <>
                            <input
                              {...input}
                              id={`faq-${field}-${idx}`}
                              type="text"
                              placeholder={`${faqFields[field].placeholder} ${idx + 1}`}
                              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {meta.touched && meta.error && (
                              <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                  ))}

                  {(fields?.length ?? 0) > 1 && (
                    <button
                      type="button"
                      onClick={() => fields.remove(idx)}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xl font-bold px-2 py-1 rounded focus:outline-none"
                      aria-label="Remove FAQ"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}

              <div className="flex justify-center mt-2">
                <button
                  type="button"
                  onClick={() => fields.push({ question: '', answer: '' })}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 focus:outline-none transition-all text-base font-medium"
                  aria-label="Add FAQ"
                >
                  <span className="text-xl leading-none">+</span> Add another FAQ
                </button>
              </div>
            </>
          )}
        </FieldArray>
      </div>
    </div>
  )
}
