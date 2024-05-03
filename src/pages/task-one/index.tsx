import { ProductCard } from '@/components'
import { useGetProductsQuery } from '@/store/index.endpoints'
import { Pagination, Spin } from 'antd'
import { useState } from 'react'
import { ProductFilters } from './filters'

const TaskOne = () => {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [price, setPrice] = useState([0, 10000])
  const { data, isLoading } = useGetProductsQuery({ page, limit: 1000 })

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Наши продукты</h1>
        <ProductFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          price={price}
          setPrice={setPrice}
          setSort={setSort}
          sort={sort}
          setPage={setPage}
        />
      </div>
      <Spin spinning={isLoading}>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 w-full place-items-center gap-14'>
          {data?.products
            .filter(item => {
              const inPriceRange =
                item.price >= price[0] && item.price <= price[1]
              const isSelectedCategory =
                selectedCategory === '' || item.category === selectedCategory
              return inPriceRange && isSelectedCategory
            })
            .slice((page - 1) * 20, page * 20)
            .sort((a, b) => {
              if (sort === 'asc') {
                return a.price - b.price
              } else if (sort === 'desc') {
                return b.price - a.price
              } else if (sort === 'name') {
                return a.title.localeCompare(b.title)
              } else if (sort === 'rating_asc') {
                return a.rating - b.rating
              } else if (sort === 'rating_desc') {
                return b.rating - a.rating
              } else if (sort === 'count') {
                return a.stock - b.stock
              } else {
                return 0
              }
            })
            .map(item => (
              <ProductCard item={item} key={item.id} />
            ))}
        </div>
      </Spin>
      <div className='flex justify-center'>
        <Pagination
          total={data?.total || 0}
          onChange={page => setPage(page)}
          current={page}
          pageSize={20}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

export { TaskOne }
