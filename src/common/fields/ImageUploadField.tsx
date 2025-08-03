import React, { useRef, useState } from 'react';
import { Field } from 'react-final-form';
import Image from 'next/image';
import { usePOSTData } from '@/common/hooks/services/methods/useSmartPostMutation';

interface Props {
    name: string;
    label: string;
    required?: boolean;
    validate?: (value: string) => string | undefined;
    uploadUrl?: string;
    imgHeight: number;
    imgWidth: number;
    imgClassName?: string;
}

export const ImageUploadField: React.FC<Props> = (
    { name, label, required, validate, uploadUrl = '/api/upload/images', imgHeight, imgWidth, imgClassName }
) => {

    const [err, setErr] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const combinedValidate = (value: string) => {
        if (required && !value) {
            return 'This field is required';
        }
        if (validate) {
            return validate(value);
        }
        return undefined;
    };

    const { postData, loading, error } = usePOSTData<string, FormData>(uploadUrl);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, onChange: (url: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('files', file);

        setErr(null);
        const imageData = await postData(formData);
        if (imageData) {
            onChange(imageData);
        } else if (error) {
            setErr(error);
        } else {
            setErr('No URL returned');
        }
    };

    return (
        <Field name={name} validate={combinedValidate}>
            {({ input, meta }) => (
                <div>
                    <label className="block mb-1 font-medium">{label}</label>
                    <div className="flex items-center gap-4 flex-col">
                        <button
                            type="button"
                            className="px-4 py-2 border rounded-lg border-gray-300 bg-white hover:bg-gray-50"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : input.value ? 'Change Image' : 'Upload Image'}
                        </button>
                        {input.value && (
                            <div style={{ height: `${imgHeight}px`, width: `${imgWidth}px` }} className={`relative overflow-hidden rounded ${imgClassName}`}>
                            <Image
                              src={input.value}
                              alt="Preview"
                              width={imgWidth}
                              height={imgHeight}
                              className="h-full w-full object-cover"
                              unoptimized
                            />
                          </div>
                          
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleFileChange(e, input.onChange)}
                        disabled={loading}
                    />
                    {err && <p className="text-sm text-red-500 mt-1">{err}</p>}
                    {meta.touched && meta.error && (
                        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
                    )}
                </div>
            )}
        </Field>
    );
};

export default ImageUploadField; 