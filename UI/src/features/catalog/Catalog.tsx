import LoadingComponent from '../../app/layout/LoadingComponent'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import ProductList from './ProductList'
import { useEffect } from 'react'
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setProductParams } from './catalogSlice'
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import ProductSearch from './ProductSearch'
import RadioButtonGroup from '../../app/components/RadioButtonGroup'
import CheckboxButtons from '../../app/components/CheckboxButtons'

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - high to low' },
  { value: 'price', label: 'Price - low to high' },
]

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll)
  const { productsLoaded, status, filtersLoaded, brands, types, productParams } = useAppSelector((state) => state.catalog)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync())
  }, [dispatch, productsLoaded])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync())
  }, [dispatch, filtersLoaded])

  if (status.includes('pending')) return <LoadingComponent message="Loading Products..." />

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
          ></CheckboxButtons>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
          ></CheckboxButtons>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Displaying 1-6 of 20 items</Typography>
          <Pagination color="secondary" size="large" count={10} page={2}></Pagination>
        </Box>
      </Grid>
    </Grid>
  )
}
