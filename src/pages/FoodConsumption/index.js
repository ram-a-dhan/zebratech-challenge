import React, { useState, useEffect } from 'react'
import { Grid, Box, Paper, Typography } from '@material-ui/core'

const FoodConsumption = () => {
  const [dailyFoodConsumption, setDailyFoodConsumption] = useState([])

  useEffect(() => {
    fetch('/api/food-consumption.json')
      .then(res => res.json())
      .then(res => {
        setDailyFoodConsumption(res.data.foodConsumption.daily)
      })
  }, [])

  // useEffect(() => {
  //   if (dailyFoodConsumption.length) console.log(dailyFoodConsumption);
  // }, [dailyFoodConsumption])

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
