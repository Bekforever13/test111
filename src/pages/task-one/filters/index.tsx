import { Button, Drawer, Input, Select, Slider } from 'antd'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

type Props = {
  setSort: Dispatch<SetStateAction<string>>
  sort: string
  setPage: Dispatch<SetStateAction<number>>
  selectedCategory: string
  setSelectedCategory: Dispatch<SetStateAction<string>>
  price: number[]
  setPrice: Dispatch<SetStateAction<number[]>>
}

const sortOptions = [
  { label: 'По умолчанию', value: '' },
  { label: 'По возврастанию цены', value: 'asc' },
  { label: 'По убыванию цены', value: 'desc' },
  { label: 'По наименованию', value: 'name' },
  { label: 'По возврастанию рейтинга', value: 'rating_asc' },
  { label: 'По убыванию рейтинга', value: 'rating_desc' },
  { label: 'По количеству', value: 'count' },
]
const categoriesOptions = [
  { label: 'smartphones', value: 'smartphones' },
  { label: 'laptops', value: 'laptops' },
  { label: 'fragrances', value: 'fragrances' },
  { label: 'skincare', value: 'skincare' },
  { label: 'groceries', value: 'groceries' },
  { label: 'home-decoration', value: 'home-decoration' },
  { label: 'furniture', value: 'furniture' },
  { label: 'tops', value: 'tops' },
  { label: 'womens-dresses', value: 'womens-dresses' },
  { label: 'womens-shoes', value: 'womens-shoes' },
  { label: 'mens-shirts', value: 'mens-shirts' },
  { label: 'mens-shoes', value: 'mens-shoes' },
  { label: 'mens-watches', value: 'mens-watches' },
  { label: 'womens-watches', value: 'womens-watches' },
  { label: 'womens-bags', value: 'womens-bags' },
  { label: 'womens-jewellery', value: 'womens-jewellery' },
  { label: 'sunglasses', value: 'sunglasses' },
  { label: 'automotive', value: 'automotive' },
  { label: 'motorcycle', value: 'motorcycle' },
  { label: 'lighting', value: 'lighting' },
]

const ProductFilters: FC<Props> = ({
  setPage,
  setSort,
  sort,
  selectedCategory,
  setSelectedCategory,
  price,
  setPrice,
}) => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => setOpen(true)
  const onClose = () => setOpen(false)
  const handleReset = () => {
    setOpen(false)
    setPrice([0, 10000])
    setSelectedCategory('')
  }

  useEffect(() => {
    if (!price[0] && !price[1]) {
      setPrice([0, 10000])
    }
  }, [price])

  return (
    <div className='flex items-center gap-5'>
      <Select
        options={sortOptions}
        value={sort}
        onChange={value => {
          setSort(value)
          setPage(1)
        }}
        style={{ width: 200 }}
      />
      <Button onClick={showDrawer}>Фильтры</Button>
      <Drawer title='Фильтры' onClose={onClose} open={open}>
        <div className='flex flex-col gap-5 mb-10'>
          <span className='text-gray-400'>Категория:</span>
          <div className='flex flex-wrap items-center gap-3'>
            {categoriesOptions.map(el => (
              <Button
                size='small'
                type={selectedCategory === el.value ? 'primary' : 'default'}
                key={el.value}
                onClick={() => setSelectedCategory(el.value)}
              >
                {el.label}
              </Button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <span className='text-gray-400'>Цена:</span>
          <div className='flex items-center gap-5'>
            <Input
              type='number'
              prefix='От'
              value={price[0]}
              onChange={e => setPrice([parseFloat(e.target.value), price[1]])}
              step='0.01'
              min={0}
              max={10000}
            />
            <Input
              type='number'
              prefix='До'
              value={price[1]}
              onChange={e => setPrice([price[0], parseFloat(e.target.value)])}
              step='0.01'
              min={0}
              max={10000}
            />
          </div>
          <Slider
            tooltip={{ formatter: null }}
            onChange={e => setPrice(e.map(el => parseFloat(el.toString())))}
            min={0}
            max={10000}
            range
            value={price}
          />
        </div>
        <Button type='primary' className='mt-10' onClick={handleReset}>
          Очистить фильтры
        </Button>
      </Drawer>
    </div>
  )
}

export { ProductFilters }
