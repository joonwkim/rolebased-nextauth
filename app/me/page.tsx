'use client'
import { useSession } from "next-auth/react"

const MePage = () => {
    const { data } = useSession()

  if(data ==null){
    return (
    
      <pre>로그인 해야 프로파일을 볼 수 있습니다.</pre>
    )
  }
  return (
    
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}

export default MePage