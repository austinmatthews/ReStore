import { Grid } from '@mui/material'
import { Product } from '../../app/models/products'
import ProductCard from './ProductCard'

interface Props {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  return (
    <>
      <Grid container spacing={4}>
        {products.map((p, index) => (
          <Grid item xs={4} key={index}>
            <ProductCard key={index} product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
