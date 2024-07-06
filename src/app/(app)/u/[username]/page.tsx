"use client"
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { APIResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import { CircularLoader } from "@/components/specific/CircularLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { parseStringMessages } from "@/lib/parseStringMessages";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export type SendMessageProps = {
    params: { username: string }
}

const initialMessageString =
    "What's your favorite movie?||Do you have any pets?||What's your dream job?";

const SendMessage = ({ params }: SendMessageProps) => {
    const [suggestMessageString, setSuggestMessageString] = useState<string>(initialMessageString);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { username } = params;
    const { toast } = useToast();

    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
    });

    const handleMessageClick = (message: string) => {
        form.setValue('content', message);
    };

    const messageContent = form.watch("content");

    const suggetMessages = () => {
        setSuggestMessageString(initialMessageString)
    }

    const onSubmit = async (data: z.infer<typeof messageSchema>) => {
        setIsLoading(true);
        try {
            const response = await axios.post<APIResponse>('/api/send-message', {
                ...data,
                username,
            });

            toast({
                title: response.data.message,
                variant: 'default',
            });

            form.reset({ ...form.getValues(), content: '' });
        } catch (error) {
            const axiosError = error as AxiosError<APIResponse>;
            toast({
                title: 'Error',
                description:
                    axiosError.response?.data.message ?? 'Failed to sent message',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-6xl bg-white dark:bg-black my-8 p-8 mx-8 md:mx-6 lg:mx-auto">
            <h1 className="text-4xl lg:text-5xl mb-2">Public Profile Link</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        name="content"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Send Anonymous Message to@{username}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Write your anonymous message here"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center">
                        {
                            isLoading ?
                                (
                                    <div className="flex items-center"><CircularLoader className="h-6 w-6 mr-2 animate-spin" /> Please wait</div>
                                )
                                :
                                (
                                    <Button type="submit" disabled={!messageContent || isLoading}>Send</Button>
                                )
                        }
                    </div>
                </form>
            </Form>
            <div className="space-y-6 my-8">
                <div className="space-y-4 mb-14">
                    <Button onClick={suggetMessages}>Suggest Messages</Button>
                    <p>Click on any message below to select it.</p>
                </div>
                <Card className="md:w-2/3 bg-black mx-auto border-none">
                    <CardContent className="flex flex-col gap-6">
                        {parseStringMessages(suggestMessageString).map((message, index) => (
                            <Button
                                key={index}
                                variant={"outline"}
                                className="mb-3 py-5 "
                                onClick={() => handleMessageClick(message)}
                            >{message}</Button>
                        ))}
                    </CardContent>
                </Card>
                <Separator className="my-8" />
                <div className="text-center">
                    <Link className="underline text-sm underline-offset-4" href="/dashboard">Check your message board?</Link>
                </div>
            </div>
        </div>
    )
}

export default SendMessage
