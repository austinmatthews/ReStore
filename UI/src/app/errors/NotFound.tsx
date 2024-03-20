import { Button, Container, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant="h3">
        Ooops we couldn't find what you're looking for
      </Typography>
      <Button fullWidth component={Link} to="/catalog">
        Go Back to shop
      </Button>
    </Container>
  )
}
