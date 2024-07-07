"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from 'react';
import messages from '@/constants/messages.json';
import { EmailIcon } from "@/components/icons/EmailIcon";


export default function Home() {

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <main className="bg-white dark:bg-black flex flex-col items-center md:mx-10 gap-10 rounded-md shadow-xl p-10 my-4">
      <section className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl md:text-4xl mb-10 font-bold">Dive into the World of Anonymous Texts</h1>
        <p className="text-lg md:text-xl font-semibold"> Anony Texts - Where your identity remains a secret.</p>
      </section>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full max-w-xl">
        <CarouselContent>
          {messages.map((message, index) => (
            <CarouselItem key={index}>
              <div className="p-6">
                <Card className="space-y-2 md:space-y-4">
                  <CardHeader>{message.title}</CardHeader>
                  <CardContent className="flex items-center gap-10">
                    <EmailIcon className="h-6 w-6" />
                    <div>
                      <p className="text-sm mb-2">{message.content}</p>
                      <p className="text-xs">~ {message.received}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </main>
  );
}
