import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { selectBasketItems } from '../redux/basketSlice'
import Button from '../components/Button'
import CheckedoutProduct from '../components/CheckedoutProduct'

const Checkout = () => {
  const items = useSelector(selectBasketItems)
  const router = useRouter()

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  )

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      ;(results[item._id] = results[item._id] || []).push(item)
      return results
    }, {} as { [key: string]: Product[] })
    setGroupedItemsInBasket(groupedItems)
  }, [items])

  return (
    <div className='min-h-screen overflow-hidden bg-[#e7ecee]'>
      <Head>
        <title>Bag - Apple</title>
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Header />
      <main className='mx-auto max-w-5xl pb-24'>
        <div>
          <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
            {items.length > 0 ? 'Review your bag.' : 'Your bag is empty'}
          </h1>
          <p className='my-4'>Free delivery and returns</p>
          {items.length === 0 && (
            <Button
              title='Continue Shopping'
              onClick={() => router.push('/')}
            />
          )}
        </div>
        {items.length > 0 && (
          <div className='mx-5 md:mx-8'>
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckedoutProduct
                key={key}
                items={items}
                id={key}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Checkout
