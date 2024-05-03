import { IProduct } from '@/store/api/products/products.types'
import { Badge, Image } from 'antd'
import { FC } from 'react'
import { FaStar, FaCartPlus } from 'react-icons/fa'

type Props = {
  item: IProduct
  key: number
}

const ProductCard: FC<Props> = ({ item }) => {
  return (
    <div key={item.id}>
      <Badge
        count={`${item.discountPercentage}% OFF`}
        className='w-full flex flex-col gap-5 shadow-md px-5 bg-slate-50 py-3 h-[410px] rounded-md hover:-translate-y-1 transition-all hover:shadow-xl'
      >
        <Image
          src={item.images[0]}
          height={250}
          className='object-contain object-center'
        />
        <div>
          <h4 className='text-sm font-semibold'>{item.title}</h4>
          <span>
            <p className='text-gray-500 line-through text-[12px]'>
              ${item.price}
            </p>
            <p>
              $
              {(
                item.price -
                (item.price * item.discountPercentage) / 100
              ).toFixed(2)}
            </p>
          </span>
          <div className='flex items-center justify-between w-full'>
            <span className='flex items-center gap-3'>
              <FaStar color='orange' />
              {item.rating}
            </span>
            <span className='p-3 rounded-full border border-solid flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all'>
              <FaCartPlus color='gray' />
            </span>
          </div>
        </div>
      </Badge>
    </div>
  )
}

export { ProductCard }
