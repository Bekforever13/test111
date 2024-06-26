export interface IProduct {
  brand: string
  category: string
  description: string
  discountPercentage: number
  id: number
  images: string[]
  price: number
  rating: number
  stock: number
  thumbnail: string
  title: string
}

export interface IProductsParams {
  page: number
  limit: number
}
export interface IProductsData {
  total: number
  products: IProduct[]
  skip: number
  limit: number
}
