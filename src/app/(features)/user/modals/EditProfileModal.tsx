import React, { useState } from 'react'
import Modal from '@/common/components/Modal/Modal'
import { Form } from 'react-final-form'
import BasicsUserDetails from './components/BasicsUserDetails'
import ExtraUserDetaills from './components/ExtraUserDetaills'
import VerificationDetails from './components/VerificationDetails'
import { motion } from 'framer-motion'
import Button from '@/common/components/atoms/Button'
import { usePOSTData } from '@/common/hooks/services/methods/useSmartPostMutation'
import { getUpdatedValues } from '@/common/utils/getUpdatedObject'
import { notify } from '@/common/utils/notify'

type Props = {
  isOpen: boolean
  userData : object
  onClose: () => void
  userId: string
  onSuccess: () => void
}

const EditProfileModal = ({ isOpen, onClose, userData, userId, onSuccess }: Props) => {


  function onSubmit(values: { [key: string]: unknown }) {

    const updatedValues = getUpdatedValues(userData as unknown as Record<string, unknown>,
      values as Record<string, unknown>)
    
    if (Object.keys(updatedValues).length === 0) {
      notify.error('No values changed to Save!')
      return
    }
        
    if (updatedValues) {
      postData({ _id: userId , updatedValues: updatedValues })
    }
    
  }

  const [activeStep, setActiveStep] = useState(1)

  const steps = {
    "1": BasicsUserDetails,
    "2": ExtraUserDetaills ,
    "3": VerificationDetails,
  };

  const StepContent = steps[activeStep.toString() as keyof typeof steps];

  const { postData, loading, error } = usePOSTData('/api/users/updateUser',{
    onSuccess: () => {
      notify.success('Profile Updated Successfully !')
      onSuccess()
      onClose()
    }
  })

  const totalSteps = Object.keys(steps).length
  const progress = ((activeStep - 1) / (totalSteps - 1)) * 100

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="px-8 pb-8 pt-6 max-w-xl"
      closeBtnClasses=""
      title="Edit your Profile"
    >
      <>
        <div className="relative w-full max-w-sm mx-auto mb-6">
          <div className="flex justify-between items-center relative z-10">
            {Object.keys(steps).map((stepKey) => {
              const step = Number(stepKey)
              return (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 cursor-pointer ${activeStep === step
                      ? 'bg-black text-white scale-110'
                      : 'bg-gray-300 text-black'
                    }`}
                >
                  {step}
                </button>
              )
            })}
          </div>
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-300 z-0 transform -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-black"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <Form
          onSubmit={onSubmit}
          initialValues={userData}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <StepContent userData={userData} />
                <div className='flex justify-end mt-6'>
                  <Button className='bg-secondary text-white rounded-lg px-6'>{loading ? 'Saving...' : 'Save'}</Button>
                </div>
              </form>
            )
          }}
        />
        {error && <div className='text-error'>{error}</div>}
      </>
    </Modal>
  )
}

export default EditProfileModal
