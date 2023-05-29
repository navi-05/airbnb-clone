'use client'

import { usePathname, useSearchParams } from "next/navigation"

import Container from "../Container"
import { categories } from "@/utils"
import CategoryBox from "../CategoryBox"

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathName = usePathname()

  const isMainPage = pathName === '/'
  if(!isMainPage) return null

  return (
  <Container>
    <div className="pt-4 flex flex-row items-center justify-center overflow-x-auto">
      {categories.map((item) => (
        <CategoryBox
          key={item.label}
          label={item.label}
          selected={category === item.label}
          icon={item.icon}
        />
      ))}
    </div>
  </Container>
  )
}

export default Categories