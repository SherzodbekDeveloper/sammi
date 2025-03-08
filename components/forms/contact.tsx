"use client"
import { ContactSchema } from '@/lib/validation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Send } from 'lucide-react'
import { toast } from 'sonner'

function Contact() {
  const [isLaoding, setIsLaoding] = useState(false)

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      message: "",
      name: '',
      email: ''
    },
  })

  function onSubmit(values: z.infer<typeof ContactSchema>) {
    setIsLaoding(true)
    const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_API!
    const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
    const promise = fetch(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: `Name: ${values.name}
        email: ${values.email}
        message: ${values.message}
        `
      })
    }).then(() => form.reset()).finally(() => setIsLaoding(false))
    toast.promise(promise, {
      loading: 'Loading..',
      success: "Successfully sent!",
      error: "Error while sending!"
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea disabled={isLaoding} className='resize-none h-32' placeholder="Ask question or say hi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isLaoding} placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isLaoding} placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='w-fit' size={'lg'}>
            <span>Send</span>
            <Send className='w-4 h-4 ml-2' />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Contact