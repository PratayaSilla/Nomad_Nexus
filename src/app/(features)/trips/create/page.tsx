'use client'

import React, { useRef, useState } from 'react'
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

  const { data } = useSession()

  const handleNext = () => {
    const data = formRef.current?.getState().values
    setFormData({ ...formData, ...data })
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    const data = formRef.current?.getState().values
    setFormData({ ...formData, ...data })
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const { postData, loading, error } = usePOSTData('/api/trips/create')

  const onSubmit = (values: object) => {
    setFormData({ ...formData, ...values })
    postData({
      ...formData,
      ...values,
      host: data?.user?._id,
      status: formStatus
    })
  }
  const [formStatus,setFormStatus] = useState('draft')


  const formRef = useRef<FormApi<object> | null>(null)

  return (
    <div className="min-h-screen text-text-primary font-sans py-10 w-full ">
      <h1 className="text-3xl font-bold mb-8">Create a Trip</h1>
      <Form
        onSubmit={onSubmit}
        initialValues={formData}
        mutators={{ ...arrayMutators }}
        render={({ handleSubmit, form }) => {
          formRef.current = form
          return (
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between mb-4">
                <Button 
                    type="button" 
                    onClick={handleBack} 
                    className='bg-secondary text-background rounded-lg' 
                    disabled={currentStep === 0}
                >
                  Back
                </Button>
                <div className='flex gap-4'>
                  <Button 
                      type="submit" 
                      className='bg-secondary text-background rounded-lg' 
                      disabled={currentStep === steps.length - 1}
                  >
                    Save Draft
                  </Button>
                  {(currentStep < steps.length - 1) && (
                      <Button 
                        type="button" 
                        onClick={handleNext} 
                        className='bg-secondary text-background rounded-lg' 
                        disabled={currentStep === steps.length - 1}
                      >
                        Next
                      </Button>
                  )}
                  {(currentStep === steps.length - 1) && (
                      <Button 
                          type='submit' 
                          className='bg-secondary text-background rounded-lg' 
                          onClick={() => setFormStatus('published')}
                          disabled={loading}
                      >
                        {loading ? 'Submitting..' : 'Submit'}
                      </Button>
                  )}
                </div>
              </div>
              {error && <div className='text-error text-center mb-4'>{error}</div>}
              <div>{steps[currentStep].component}</div>
            </form>
          )
        }
        } />

    </div>
  )
}
