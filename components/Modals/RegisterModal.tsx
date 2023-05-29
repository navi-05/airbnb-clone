'use client'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

import Modal from "./Modal"
import useRegisterModal from '@/hooks/useRegisterModal'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import Button from '../Button'
import useLoginModal from '@/hooks/useLoginModal'

const RegisterModal = () => {
  const registerModal = useRegisterModal() 
  const [isLoading, setIsLoading] = useState(false)

  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({  
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios.post('/api/register', data)
      .then(() => {
        toast.success('Registration Successful')
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch((error) => toast.error('Something went wrong'))
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggle = useCallback(() => {
    loginModal.onOpen()
    registerModal.onClose()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading 
        title='Welcome to Airbnb'
        subtitle='Create an account!'
      />
      <Input 
        id='email'
        lable='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id='name'
        lable='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id='password'
        type='password'
        lable='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button 
        outline
        lable='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline
        lable='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='flex flex-row items-center justify-center gap-2'>
        <div>
          Already have an account?
        </div>
        <div
          className='text-neutral-800 cursor-pointer hover:underline'
          onClick={toggle} 
        >
          Login
        </div>
      </div>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLable='Continue' 
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal