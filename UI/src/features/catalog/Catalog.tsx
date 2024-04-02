import LoadingComponent from '../../app/layout/LoadingComponent'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import ProductList from './ProductList'
import { useEffect } from 'react'
import { fetchFiltersAsync, fetchProductsAsync, productSelectors } from './catalogSlice'

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll)
  const { productsLoaded, status, filtersLoaded } = useAppSelector((state) => state.catalog)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync())
  }, [dispatch, productsLoaded])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync())
  }, [dispatch, filtersLoaded])

  if (status.includes('pending')) return <LoadingComponent message="Loading Products..." />

  return (
    <>
      <ProductList products={products} />
    </>
  )
}
