import React from 'react'
import InputField from '@/common/fields/Input';
import TextEditorField from '@/common/fields/TextEditorField'


type Props = {
    userData : object
}

const ExtraUserDetaills = ({userData} : Props) => {

    const userFields = {
        socialMedias: {
            name: 'socialMedias',
            label: 'Share your social medias',
            placeholder: 'Enter your address',
        },
    }

    const userFieldNames : (keyof typeof userFields)[] = [
        'socialMedias',
      ];

    return (
        <div>
            <TextEditorField placeholder='Enter your Bio' name='bio'/>
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

export default ExtraUserDetaills