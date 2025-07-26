'use client'

import React, { useRef } from 'react'
import Button from '@/common/components/atoms/Button'
import { TripBasics } from './components/TripBasics/TripBasics'
import { TripImages } from './components/TripImages/TripImages'
import { TripFAQs } from './components/TripFAQs/TripFAQs'
import { TripInclusions } from './components/TripInclusions/TripInclusions'
import { useTripFormStore } from './store/useTripFormStore'
import { Form } from 'react-final-form'
import { FormApi } from 'final-form'
import arrayMutators from 'final-form-arrays'
import { usePOSTData } from '@/common/hooks/services/methods/useSmartPostMutation'
import { useSession } from 'next-auth/react'

export default function CreateTrip() {
  
  const currentStep = useTripFormStore((s) => s.currentStep)
  const setCurrentStep = useTripFormStore((s) => s.setCurrentStep)
  const formData = useTripFormStore((d) => d.formData)
  const setFormData = useTripFormStore((d) => d.setFormData)

  const steps = [
    { label: 'Trip Basics', component: <TripBasics /> },
    { label: 'Trip Images', component: <TripImages /> },
    { label: 'Trip FAQs', component: <TripFAQs /> },
    { label: 'Trip Inclusions', component: <TripInclusions /> },
  ]  

  const {data} = useSession()

  const handleNext = () => {
    const data = formRef.current?.getState().values
    setFormData({...formData,...data})
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }
  const handleBack = () => {
    const data = formRef.current?.getState().values
    setFormData({...formData,...data})
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const { postData, loading, error } = usePOSTData('/api/trips/create') 
  
  const onSubmit = (values: object) => {
    setFormData({...formData,...values})
    postData({
          ...formData,
          ...values,
          host : data?.user?._id,
          status : 'published'
      })
  }

  const formRef = useRef<FormApi<object> | null>(null)

  return (
    <div className="min-h-screen bg-white text-black font-sans py-10 w-full px-[30%]">
      <h1 className="text-3xl font-bold mb-8">Create a Trip</h1>

      <div className="flex justify-between mb-8">
        <Button type="button" onClick={handleBack} disabled={currentStep === 0}>
          Back
        </Button>
        <Button type="button" onClick={handleNext} disabled={currentStep === steps.length - 1}>
          Next
        </Button>
      </div>
      <Form
        onSubmit={onSubmit}
        initialValues={formData}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit, form }) => {
          formRef.current = form
         return  (
          <form onSubmit={handleSubmit}>
              <div>{steps[currentStep].component}</div>
              <button type='submit' disabled={loading}>Submit</button>
          </form>
        )}
      }/>
      {error && <div>{error}</div>}
    </div>
  )
}
