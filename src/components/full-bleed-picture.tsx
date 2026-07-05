import Image from 'next/image'
import { JSX } from 'react'
import styled from 'styled-components'

const FullBleed = styled.div`
  position: relative;
  left: 50%;
  width: 100vw;
  margin-left: -50vw;

  img {
    width: 100%;
    height: auto;
    max-width: none;
    border-radius: 0;
  }
`

interface FullBleedPictureProps {
  alt: string
  height: number
  src: string
  width: number
}

export function FullBleedPicture({ alt, height, src, width }: FullBleedPictureProps): JSX.Element {
  return (
    <FullBleed>
      <Image
        alt={alt}
        height={height}
        sizes="100vw"
        src={src}
        width={width}
      />
    </FullBleed>
  )
}
