"use client"

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

// const Title = tw.h1`text-5xl font-bold mb-4`
// const Subtitle = tw.p`text-xl mb-8`
// const Button   = tw.button`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded`

// const Navbar = tw.nav`
//   fixed top-0 left-0 w-full bg-white shadow-md
//   transition-transform duration-300 ease-in-out transform
//   ${(p) => (p.show ? 'translate-y-0' : '-translate-y-full')}
// `
// const NavContainer = tw.div`mx-auto px-4 py-3 flex justify-between items-center`
// const Logo = tw.div`text-2xl font-bold`
// const NavLinks = tw.div`space-x-4`
// const NavLink = tw.a`text-gray-700 hover:text-gray-900`

const Content = tw.div`
  w-screen md:w-[100vh]
  px-5 md:px-20 py-4
  mx-auto mt-0
  bg-neutral-900
  text-base md:text-[1.25em]
`

const SectionHeader = tw.h2`
  font-bold mt-0 mb-0 text-[1.5em] md:text-[1em]
`

const SectionDescription = tw.p`
  text-[1em] md:text-[.75em] font-mono
  mt-0 mb-5 md:mb-0
`

const Page = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  // const handleScroll = () => {
  // if (!heroRef.current) return
  // const heroBottom = heroRef.current.getBoundingClientRect().bottom
  // }

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
        <div className="text-4xl md:text-3xl lg:text-3xl min-text-[20pt] max-h-[2vw] font-bold font-mono-sans mt-0 mb-20 md:mb-0 r-10 w-full text-center md:text-right tracking-widest">darkshapes
          <p className="text-[.6em] md:text-[.5em] font-sans mt-0 mb-0">we build our answers</p>
        </div>
        <section id="shadowbox" className="mt-2">
          <SectionHeader>Shadowbox</SectionHeader>
          <SectionDescription>Shadowbox is a generative AI instrument.</SectionDescription>
        </section>
        <section id="mir" className="mt-2">
          <SectionHeader>Machine Intelligence Resource</SectionHeader>
          <SectionDescription>MIR is a URI taxonomy of ML models.</SectionDescription>
        </section>
        <section id="nnll" className="mt-2">
          <SectionHeader>Neural Network Link Library</SectionHeader>
          <SectionDescription>nnll is a collection of tools for model analysis and inference.</SectionDescription>
        </section>
        <section id="source" className="mt-2">
          <SectionHeader>Source code</SectionHeader>
          <SectionDescription>Check out our <a href="https://github.com/darkshapes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">GitHub</a>.</SectionDescription>
        </section>
        <section id="chat" className="mt-2">
          <SectionHeader>Chat</SectionHeader>
          <SectionDescription className="mb-10 md:mb-10">Find us on <a href="https://discord.gg/RYaJw9mPPe" className="text-blue-500 hover:text-blue-600">Discord</a>.</SectionDescription>
        </section>
      </Content>
    </Container>
  )
}

export default Page