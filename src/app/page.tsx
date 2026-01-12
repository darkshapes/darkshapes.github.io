/*
*/
"use client";

import React, { useState, useEffect, useRef } from 'react'
import tw from 'tailwind-styled-components'

import Neuron from '@/components/neuron'
import Darkshapes from '@/assets/darkshapes_alpha_gray_without_neuron.svg'

const Container = tw.div`
  relative
  bg-white
  h-full
  bg-white
  justify-start
  items-center
  p-0 m-0
`

const Hero = tw.div`
  h-[50vh]
  flex items-stretch justify-center align-center text-center
  text-white bg-neutral-900
  m-auto
  p-0 m-0
`

const Content = tw.div`
  w-screen md:w-[100vh]
  px-5 md:px-20 py-4
  mx-auto mt-0
  bg-neutral-900
  text-base md:text-[1.25em]
`

const SectionHeader = tw.h2`
  mt-0 mb-0 text-[.9em] md:text-[.9em] font-mono-sans
`

const SectionDescription = tw.p`
  text-[1.2em] md:text-[.8em] font-mono-sans
  mt-2 mb-5 md:mb-0
`

const Page = () => {
  const heroRef = useRef<HTMLDivElement>(null)


  const [heroStyle, setHeroStyle] = useState({
    width: '100vw',
    maskSize: '100vh',
  })

  useEffect(() => {
    const updateStyle = () => {
      const isSmallScreen = window.innerWidth < 768
      setHeroStyle({
        width: isSmallScreen ? '100vw' : '100vh',
        maskSize: isSmallScreen ? '100vw' : '100vh',
      })
    }

    updateStyle() // initial run
    window.addEventListener('resize', updateStyle)
    return () => window.removeEventListener('resize', updateStyle)
  }, [])

  return (
    <Container style={{ alignItems: 'center', justifyContent: 'center', transformOrigin: 'center center', }} >
      <Hero ref={heroRef}
        style={{
          margin: '0 auto',
          maskImage: `url(${Darkshapes.src})`,
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          ...heroStyle,
          justifyContent: 'center',
          // alignItems: 'center',
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease-out',

        }}
      >
        <Neuron />
      </Hero>

      <Content style={{
        margin: '0 auto',
        maskPosition: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        transformOrigin: 'center center',
        transition: 'transform 0.3s ease-out',
      }} >
        <div className="text-4xl md:text-3xl lg:text-3xl min-text-[20pt] max-h-[2vw] font-bold mb-20 md:mb-0 r-10 w-full text-center md:text-right tracking-widest">darkshapes
          <p className="text-[.6em] md:text-[.5em] font-sans mb-0">we build our answers</p>
        </div>
        <section id="shadowbox">
          <SectionHeader>
          <p className="mt-20 mb-4 pb-5 text-left">
            Umbrella organization rethinking machine-learning tools that work for people, not corporations.
          </p></SectionHeader>
          <SectionDescription><b>Shadowbox</b> is an ANN instrument.</SectionDescription>
        </section>
        <section id="mir">
          <SectionDescription><b>MIR</b> is a URI taxonomy of ANN models.</SectionDescription>
        </section>
        <section id="nnll">
          <SectionDescription><b>nnll</b> is a collection of tools for model analysis and inference.</SectionDescription>
        </section>
        <section id="divisor">
          <SectionDescription><b>divisor</b> is an interactive denoiser.</SectionDescription>
        </section>
        <section id="Documentation">
          <SectionDescription>Explore our <a href="/docs" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">documentation</a>.</SectionDescription>
        </section>
        <section id="source">
          <SectionDescription>Check out our source code on <a href="https://github.com/darkshapes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">GitHub</a>.</SectionDescription>
        </section>
        <section id="chat">
          <SectionDescription className="mb-10 md:mb-10">Find us on <a href="https://discord.gg/RYaJw9mPPe" className="text-blue-500 hover:text-blue-600">Discord</a>.</SectionDescription>
        </section>
      </Content>
    </Container>
  )
}

export default Page