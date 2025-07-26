import React from 'react'
import InputField from '@/common/fields/Input'
import { required } from '@/common/utils/formValidators'
import { ArrayInput } from '@/common/fields/ArrayInput';

export type TripBasicsFormValues = {
  title: string;
  description: string;
  location: string;
  category: string;
  maxParticipants: string;
  startDate: string;
  endDate: string;
};

const fields = {
  title: {
    name: 'title',
    label: 'Trip Title',
    placeholder: 'Enter trip title',
  },
  description: {
    name: 'description',
    label: 'Trip Description',
    placeholder: 'Describe your trip',
    textarea: true,
  },
  latitude: {
    name: 'latitude',
    label: 'Latitude',
    placeholder: 'Enter location latitude',
  },
  longitude: {
    name: 'longitude',
    label: 'Longitude',
    placeholder: 'Enter location longitude',
  },
  address : {
    name : "address",
    label : 'Address',
    placeholder : "Enter address"
  },
  maxParticipants: {
    name: 'maxCapacity',
    label: 'Maximum Participants',
    placeholder: 'Enter max participants',
  },
  startDate: {
    name: 'startDate',
    label: 'Start Date',
    placeholder: 'Select start date',
    type : "date" 
  },
  endDate: {
    name: 'endDate',
    label: 'End Date',
    placeholder: 'Select end date',
    type : "date" 
  },
  tags : {
    name : 'tags',
    label: "Trip Tags",
    description: 'List all the trip related tags to help people discover your trips',
    placeholder: 'Tags',
    errorMsg: 'At least five tags are required',
  },
  price : {
    name: 'price',
    label: 'Trip Price',
    placeholder: 'Trip Price',
  }
}

const inputFieldKeys: (keyof typeof fields)[] = [
  'title',
  'description',
  'latitude',
  'longitude',
  'address',
  'maxParticipants',
  'startDate',
  'endDate',
  'price'
];

export const TripBasics = () => {
  return (
    <div className='w-full'>
      {inputFieldKeys.map((key) => (
        <InputField
          key={key}
          {...fields[key]}
          validate={required(`${fields[key].label} is required`)}
        />
      ))}
      <ArrayInput
        key={'tags'}
        {...fields.tags}
      />
    </div>
  );
};
