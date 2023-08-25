import { Button, Container, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const toast = useToast()
    const navigate = useNavigate()

    const handleRegister = ()=>{
        axios.post(`https://nice-cyan-parrot-kit.cyclic.cloud/register`,{name,email})
        .then((res)=>{
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            navigate("/login")
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <Container maxW={"400px"} mt={10} p={5} boxShadow="md">
      <FormControl mt={4}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <FormLabel>Name</FormLabel>
        <Input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <Button type="submit" mt={4} onClick={handleRegister}>Signup</Button>
      </FormControl>
    </Container>
  );
};

export default Signup;
