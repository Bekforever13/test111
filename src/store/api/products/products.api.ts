import { api } from "../../index.api"
import { IProductsData, IProductsParams } from "./products.types"

export const ProductsAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProductsData, IProductsParams>({
      query: ({ page, limit }) => ({
        url: "/products",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["products"],
    }),
  }),
})
