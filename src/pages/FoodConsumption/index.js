import React from 'react'
import { Grid, Box, Paper, Typography } from '@material-ui/core';

const FoodConsumption = () => {
  return (
    <Grid spacing={3} container>
      <Grid xs={12} item>
        <Box component={Paper} height="100%">
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Daily Food Consumption
            </Typography>
            
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default FoodConsumption
