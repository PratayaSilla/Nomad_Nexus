import React from 'react'
import InputField from '@/common/fields/Input';


const VerificationDetails = () => {

    const userFields = {
        address: {
            name: 'address',
            label: 'Address',
            placeholder: 'Enter your address',
        },
        adhaar : {
            name: 'adhaar',
            label: 'Adhaar',
            placeholder: 'Enter your adhaar number',
          },
    }
    const userFieldNames : (keyof typeof userFields)[] = [
        'address',
        'adhaar',
      ];

  return (
      <div>
           {
                userFieldNames.map((key) => (
                    <InputField
                        key={key}
                        {...userFields[key]}
                    />
                ))
            }
    </div>
  )
}

export default VerificationDetails