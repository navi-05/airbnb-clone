'use client'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Modal from "./Modal"
import useRegisterModal from '@/hooks/useRegisterModal'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import Button from '../Button'
import useLoginModal from '@/hooks/useLoginModal'

const LoginModal = () => {
  const registerModal = useRegisterModal() 
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({  
    defaultValues: {
      email: '',
      password: ''
    }
  })
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn('credentials', {
        ...data,
        redirect: false,
    })
    .then((callback) => {
        setIsLoading(false)
        if(callback?.ok) {
            toast.success('Looged in')
            router.refresh()
            loginModal.onClose()
        }
        if(callback?.error) toast.error(callback.error)
    })
  }

  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading 
        title='Welcome Back!'
        subtitle='Login to your account!'
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
          First time using Airbnb?
        </div>
        <div
          className='text-neutral-800 cursor-pointer hover:underline'
          onClick={toggle} 
        >
          Create an account
        </div>
      </div>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLable='Continue' 
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal