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
        <div className="max-h-[4vw] font-bold mb-20 md:mb-0 r-10 w-full text-center md:text-right"><p className="text-7xl tracking-tighter">Darkshapes</p>
          <p className="lg:text-3xl font-sans mb-0 tracking-widest">we build our answers</p>
        </div>
        <section id="header">
          <SectionHeader>
          <p className="mt-20 mb-4 pb-5 text-left">
            Umbrella organization rethinking machine-learning tools that work for people, not corporations.
          </p></SectionHeader>
          </section>
          <section id="sdbx">
          <SectionDescription><b>Shadowbox</b> is a generative neural network instrument.</SectionDescription>
        </section>
        <section id="mir">
          <SectionDescription><b>MIR</b> is a URI taxonomy of neural network models.</SectionDescription>
        </section>
        <section id="dvzr">
          <SectionDescription><b>Divisor</b> is an interactive denoiser.</SectionDescription>
        </section>
        <section id="zdac">
          <SectionDescription><b>Zodiac</b> is a self-arranging neural network sequencer.</SectionDescription>
        </section>
        <section id="ngte">
          <SectionDescription><b>Negate</b> is a synthetic image detector.</SectionDescription>
        </section>
        <section id="nnll">
          <SectionDescription><b>NNLL</b> is a collection of tools for model analysis and inference.</SectionDescription>
        </section>
        <section id="documentation">
          <SectionDescription>Read our software <a href="/docs" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Documentation</a>.</SectionDescription>
        </section>
        <section id="software">
          <SectionDescription>Download our software from <a href="https://github.com/darkshapes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">GitHub</a> or <a href="https://codeberg.org/darkshapes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Codeberg</a> .</SectionDescription>
        </section>
        <section id="progress">
          <SectionDescription>Track responsible AI progress on <a href="https://hf.co/darkshapes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">HuggingFace</a>.</SectionDescription>
        </section>
        <section id="chat">
          <SectionDescription className="mb-10 md:mb-10">Speak with us on <a href="https://discord.gg/RYaJw9mPPe" className="text-blue-500 hover:text-blue-600">Discord</a>.</SectionDescription>
        </section>
      </Content>
    </Container>
  )
}

export default Page