import { useState } from 'react';
import TextEditor from '../components/TextEditor/TextEditor';
import Button from '../components/atoms/Button';
import { useForm } from 'react-final-form';
import { notify } from '../utils/notify';

interface Props {
    placeholder?: string;
    name: string;
}

export default function ManualTextEditor({ placeholder, name }: Props) {
    const form = useForm();
    const [value, setValue] = useState('');

    const handleChange = (val: string) => {
        setValue(val);
    };

    const handleSave = () => {
        notify.success('Bio Saved Successfully!')
        form.change(name, value);
    };
    
    return (
        <>
            <TextEditor
                value={form.getState().values?.bio}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <div className='flex justify-end'>
                <Button type='button' className='bg-secondary text-white rounded-xl' onClick={handleSave}>Save Bio</Button>
            </div>
        </>
    );
}
