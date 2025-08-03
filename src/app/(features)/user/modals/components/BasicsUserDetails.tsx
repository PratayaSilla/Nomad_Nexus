import React from 'react'
import InputField from '@/common/fields/Input';
import ImageUploadField from '@/common/fields/ImageUploadField';

type Props = {
    userData : object
}

const BasicsUserDetails = ({userData} : Props) => {

    const userFields = {
        fullName: {
          name: 'fullName',
          label: 'Full Name',
          placeholder: 'Enter your full name',
          validate: (val: string) => !val?.trim() ? 'Name cannot be empty' : undefined
        },
        password: {
          name: 'password',
          label: 'Password',
          placeholder: 'Enter your password',
        },
        // birthDate: {
        //   name: 'birthDate',
        //   label: 'Enter your Birth Date',
        //   placeholder: 'Enter avatar link',
        //   type: 'date'
        // }
    };
    
    const userFieldNames : (keyof typeof userFields)[] = [
        'fullName',
        'password',
        // 'birthDate',
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
            <ImageUploadField
                name='avatar'
                label='Upload Avatar'
                imgHeight={128}
                imgWidth={128}
                imgClassName='rounded-full'
            />
        </div>
    )
}

export default BasicsUserDetails