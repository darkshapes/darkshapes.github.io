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
  flex
  items-center
  justify-center
  text-white
  text-center
  bg-neutral-900
  align-center
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
const Logo = tw.div`text-2xl font-bold`
const NavLinks = tw.div`space-x-4`
const NavLink = tw.a`text-gray-700 hover:text-gray-900`

const Content = tw.div`px-20 py-4 max-w-[96vh] mx-auto bg-neutral-900 mt-0 text-[1.25em]` //max-w-4xl

const Page = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!heroRef.current) return
    const heroBottom = heroRef.current.getBoundingClientRect().bottom
  }
  const [heroStyle, setHeroStyle] = useState({
    maskSize: '100vw 100vh',
    scale: 'scale(1)'
  })

  useEffect(() => {
    const updateStyle = () => {
      const isSmallScreen = window.innerWidth <= 900
      setHeroStyle({
        maskSize: isSmallScreen ? '100vh' : '100vh',
        scale: isSmallScreen ? 'scale(.5)' : 'scale(1)',
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
          width: '100vh',
          margin: '0 auto',
          maskImage: `url(${Darkshapes.src})`,
          maskRepeat: 'no-repeat',
          maskSize: heroStyle.maskSize,
          maskPosition: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease-out',

        }}
      >
        <Neuron />
      </Hero>

      <Content style={{
        width: '100vh',
        margin: '0 auto',
        maskPosition: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        transformOrigin: 'center center',
        transition: 'transform 0.3s ease-out',
      }} >
        <div className="text-[3vh] min-text-[20pt] max-h-[2vw] font-bold font-mono-sans mt-0 mb-0 r-10 w-full text-right tracking-widest">darkshapes
          <p className="text-[.5em] font-sans mt-0 mb-0">we build our answers</p>
        </div>
        <section id="shadowbox" className="mt-2">
          <h2 className="font-bold mt-0 mb-0">Shadowbox</h2>
          <p className="text-[.75em] mt-0 font-mono mb-0">Shadowbox is a generative AI instrument.</p>
        </section>
        <section id="mir" className="mt-2">
          <h2 className="font-bold mt-0 mb-0">Machine Intelligence Resource</h2>
          <p className="text-[.75em] mt-0 font-mono mb-0">MIR is a URI taxonomy of ML models.</p>
        </section>
        <section id="nnll" className="mt-2">
          <h2 className=" font-bold mt-0 mb-0">Neural Network Link Library</h2>
          <p className="text-[.75em] mt-0 font-mono mb-0">nnll is a collection of tools for model analysis and inference.</p>
        </section>
        <section id="source" className="mt-2">
          <h2 className="font-bold mt-0 mb-0">Source code</h2>
          <p className="text-[.75em] font-mono mt-0 mb-0">Check out our <a href="https://github.com/darkshapes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">GitHub</a>.</p>
        </section>
        <section>
          <h2 className="font-bold mt-0 mb-0">Chat</h2>
          <p className="text-[.75em] font-mono mt-0 mb-50">Find us on <a href="https://discord.gg/RYaJw9mPPe" className="text-blue-500 hover:text-blue-600">Discord</a>.</p>
        </section>
      </Content>
    </Container>
  )
}

export default Page