import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material'
import { Product } from '../../app/models/products'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import agent from '../../app/api/agent'
import { LoadingButton } from '@mui/lab'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false)

  function handleAddItem(productId: number) {
    setLoading(true)
    agent.Basket.addItem(productId)
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }
  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: { fontWeight: 'bold', color: 'primary.main' },
          }}
        />
        <CardMedia
          sx={{ maxWidth: '100%', maxHeight: '100%', bgcolor: 'primary.light' }}
          image={product.pictureUrl}
          title={product.name}
          component="img"
        />
        <CardContent>
          <Typography color="secondary" gutterBottom variant="h6">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loading}
            onClick={() => handleAddItem(product.id)}
            size="small"
          >
            Add To Cart
          </LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">
            View
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

/* <ListItem key={product.id}>
<ListItemAvatar>
  <Avatar src={product.pictureUrl} />
</ListItemAvatar>
<ListItemText>
  {product.name} - {product.price}
</ListItemText>
</ListItem> */