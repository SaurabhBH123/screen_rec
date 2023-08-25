import { Button, Container, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const toast = useToast()
    const navigate = useNavigate()

    const handleLogin = ()=>{
        axios.post(`https://nice-cyan-parrot-kit.cyclic.cloud/login`,{name,email})
        .then((res)=>{
            toast({
                title: `${res.data.msg}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
              localStorage.setItem("token",res.data.token)
              navigate("/")
        })
        .catch((err)=>{
            toast({
                title: `Login Failed!`,
                description: `${err.response.data.msg}`,
                status: 'error',
                isClosable: true,
            })
            navigate("/signup")
        })
    }
  return (
    <Container maxW={"400px"} mt={10} p={5} boxShadow="md">
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <FormLabel>Name</FormLabel>
        <Input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <Button type="submit" mt={4} onClick={handleLogin}>Login</Button>
      </FormControl>
    </Container>
  )
}

export default Login