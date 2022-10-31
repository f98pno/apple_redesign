import Image from 'next/image'
import React from 'react'
import { urlFor } from '../sanity'

interface Props {
  product: Product
}

const Product = ({ product }: Props) => {
  return (
    <div>
      <div>
        <Image
          src={urlFor(product.image[0]).url()}
          layout='fill'
          objectFit='contain'
        />
      </div>
    </div>
  )
}

export default Product
