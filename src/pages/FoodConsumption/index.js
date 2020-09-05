import React, { useState, useEffect } from 'react'
import { Grid, Box, Paper, Typography } from '@material-ui/core'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { generateHighchartsData, dayMonthSort } from './helper';

const FoodConsumption = () => {
  const [dailyFoodConsumption, setDailyFoodConsumption] = useState([])

  useEffect(() => {
    fetch('/api/food-consumption.json')
      .then(res => res.json())
      .then(res => {
        const sorted = dayMonthSort(res.data.foodConsumption.daily)
        setDailyFoodConsumption(sorted)
      })
  }, [])

  useEffect(() => {
    if (dailyFoodConsumption.length) {
      // console.log(
      //   dailyFoodConsumption[0]
      // )
    }
  }, [dailyFoodConsumption])

  return (
    <Grid spacing={3} container>
      <Grid xs={12} item>
        <Box component={Paper} height="100%">
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Daily Food Consumption
            </Typography>
            <HighchartsReact
              highcharts={Highcharts}
              options={generateHighchartsData(dailyFoodConsumption)}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default FoodConsumption
