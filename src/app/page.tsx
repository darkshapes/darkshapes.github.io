"use client"

import React, { useState, useEffect, useRef } from 'react'
import tw from 'tailwind-styled-components'

import Neuron from '@/components/neuron'
import Darkshapes from '@/assets/darkshapes_alpha_gray_without_neuron.svg'

const Container = tw.div`
  relative
  w-full
  h-full
  bg-white
`;

const Hero = tw.div`
  h-[50vh]
  flex
  items-center
  justify-center
  text-white
  text-center
  bg-neutral-900
`

// const Title = tw.h1`text-5xl font-bold mb-4`
// const Subtitle = tw.p`text-xl mb-8`
// const Button   = tw.button`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded`

const Navbar = tw.nav`
  fixed top-0 left-0 w-full bg-white shadow-md
  transition-transform duration-300 ease-in-out transform
  ${(p) => (p.show ? 'translate-y-0' : '-translate-y-full')}
`
const NavContainer = tw.div`max-w-6xl mx-auto px-4 py-3 flex justify-between items-center`
const Logo        = tw.div`text-2xl font-bold`
const NavLinks    = tw.div`space-x-4`
const NavLink     = tw.a`text-gray-700 hover:text-gray-900`

const Content = tw.div`p-8 max-w-4xl mx-auto bg-neutral-900`

const Page = () => {
  const [showNavbar, setShowNavbar] = useState<true|undefined>(undefined)
  const heroRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!heroRef.current) return
    const heroBottom = heroRef.current.getBoundingClientRect().bottom
    setShowNavbar(heroBottom < 0 || undefined)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Container>
      <Hero ref={heroRef}
        style={{
          maskImage: `url(${Darkshapes.src})`,
          maskRepeat: 'no-repeat',
          maskSize: '100vh',
          maskPosition: 'center',
        }}
      >
        <Neuron />
      </Hero>

      <Navbar show={showNavbar}>
        <NavContainer>
          <Logo>MySite</Logo>
          <NavLinks>
            <NavLink href="#shadowbox">Shadowbox</NavLink>
            <NavLink href="#mir">MIR</NavLink>
            <NavLink href="#nnll">nnll</NavLink>
            <NavLink href="#source">Source</NavLink>
          </NavLinks>
        </NavContainer>
      </Navbar>

      <Content>
        <div className="text-6xl font-bold font-mono mb-4 w-full text-center tracking-widest">darkshapes</div>
        <section id="shadowbox">
          <h2 className="text-3xl font-bold mb-4">Shadowbox</h2>
          <p>Shadowbox = sdbx + singularity</p>
        </section>
        <section id="mir" className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Machine Intelligence Resource</h2>
          <p>MIR is a taxonomy of ML models.</p>
        </section>
        <section id="nnll" className="mt-12">
          <h2 className="text-3xl font-bold mb-4">nnll</h2>
          <p>nnll is a collection of tools for model analysis and inference.</p>
        </section>
        <section id="source" className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Source</h2>
          <p>Find us on <a href="https://github.com/darkshapes" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">GitHub</a>.</p>
        </section>
      </Content>
    </Container>
  )
}

export default Page;