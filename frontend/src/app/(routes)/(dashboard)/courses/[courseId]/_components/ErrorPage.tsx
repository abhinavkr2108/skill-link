"use client";
import {
  Card,
  CardHeader,
  Heading,
  useToast,
  CardBody,
  CardFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ErrorPage() {
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    toast({
      title: "Error Fetching Course",
      description: "Course could not be found",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }, []);

  const navigateToHome = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-full w-full font-bold">
      <Card>
        <CardHeader>
          <Heading size="md"> Error 404!</Heading>
        </CardHeader>
        <CardBody>
          <Text>Course not found. Make sure the course id is correct</Text>
        </CardBody>
        <CardFooter>
          <Button onClick={navigateToHome}>Return to Home</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
