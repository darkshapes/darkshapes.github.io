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
          <p className="mt-30 mb-0 pb-5 text-left lg:text">
            Umbrella organization rethinking machine-learning tools that work for people, not corporations.
          </p></SectionHeader>
          </section>
        <section id='salon' className='mt-0 mb-10'>
          <SectionHeader><p>Our collective of artists, engineers, writers, and scientists blend expertise to spark honest discussions, bold critiques, and collaboration that fuels radically new art and software projects. By fostering community knowledge we challenge the status quo and redefine techno-social ethics.</p>
</SectionHeader>
<section id="for"><SectionHeader><p className='mt-5'>For the creative and curious of the 21st century.</p></SectionHeader></section>
        </section>
        <section id="documentation">
          <SectionDescription>Read our software <a href="/docs" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Documentation</a>.</SectionDescription>
        </section>
        <section id="research">
          <SectionDescription>Explore our link map on <a href="https://www.tldraw.com/p/buk-uYBmC1A_Q3i51cwHq?d=v5008.3963.5071.3165.page"  target="_blank"  className="text-blue-500 hover:text-blue-600">TLDraw</a>.</SectionDescription>
          </section>
        <section id="software">
          <SectionDescription>Download our software from <a href="https://github.com/darkshapes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">GitHub</a> or <a href="https://codeberg.org/darkshapes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Codeberg</a> .</SectionDescription>
        </section>
        <section id="progress">
          <SectionDescription>Track responsible AI at our hub on <a href="https://hf.co/darkshapes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">HuggingFace</a>.</SectionDescription>
        </section>
        <section id="chat">
          <SectionDescription className="mb-10 md:mb-10">Join us on <a href="https://discord.gg/RYaJw9mPPe" className="text-blue-500 hover:text-blue-600">Discord</a>.</SectionDescription>
        </section>
      </Content>
    </Container>
  )
}

export default Page