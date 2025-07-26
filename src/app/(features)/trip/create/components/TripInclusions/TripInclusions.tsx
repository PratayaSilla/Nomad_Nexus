'use client'

import React from 'react'
import { ArrayInput } from '@/common/fields/ArrayInput'

const inclusionFields = [
  {
    key: 'included',
    label: "What's Included",
    desc: 'List what is included in this trip for participants.',
    placeholder: 'Included item',
    error: 'At least one included item is required',
  },
  {
    key: 'notIncluded',
    label: "What's Not Included",
    desc: 'List what is not included in this trip for participants.',
    placeholder: 'Not included item',
    error: 'At least one not included item is required',
  },
] as const

export const TripInclusions = () => {
  return (
    <div className="w-full">
      {inclusionFields.map(({ key, label, desc, placeholder, error }) => (
        <ArrayInput
          key={key}
          name={key}
          label={label}
          description={desc}
          placeholder={placeholder}
          errorMsg={error}
        />
      ))}
    </div>
  )
}
