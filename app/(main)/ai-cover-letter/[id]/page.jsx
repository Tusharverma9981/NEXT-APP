// app/product/[id]/page.jsx

import React from 'react'

const ProductPage = ({ params }) => {
  const { id } = params

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Product ID</h1>
      <p className="mt-4 text-xl text-blue-600">{id}</p>
    </div>
  )
}

export default ProductPage
