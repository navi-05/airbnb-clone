'use client'

import EmptyState from "@/components/EmptyState"
import { useEffect } from "react"

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({
  error
}) => {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <EmptyState 
      title="Uh Oh!"
      subtitle="Something's wrong. Please wait or refresh while we do what's necessary 🥲"
    />
  )
}

export default ErrorState