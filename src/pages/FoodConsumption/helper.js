export const generateHighchartsData = (dailyFoodConsumption = []) => {
	const options = {
		chart: {
      type: 'column',
		},
		title: {
			text: null,
		},
		xAxis: {
			title: {
        text:'Day/Month'
      },
      categories: [],
      min: 0,
      max: 19,
      scrollbar: {
            enabled: true
      },
      labels: {
        overflow: 'justify'
      },
		},
		yAxis: {
      title: {
        text: 'Meat Consumption (kg)'
      },
			min: 0,
    },
    legend: {
      align: 'left',
      verticalAlign: 'top',
      floating: false,
      shadow: false,
    },
    tooltip: {
        headerFormat: '<b>Period: {point.x}</b><br/>',
        pointFormat: '<span style="color:{point.color}">●</span> {series.name}: {point.y}<br/>',
        footerFormat: 'Total: {point.total}',
        shared: true
    },
		plotOptions: {
			column: {
				stacking: 'normal',
				dataLabels: {
					enabled: false,
				},
			},
		},
		series: [],
	};

	if (dailyFoodConsumption.length > 0) {
    // date label array
		options.xAxis.categories = Object.values(
      dailyFoodConsumption
        .reduce((acc, val) => {
          if (!acc[val.date]) acc[val.date] = val;
          return acc;
        }, {})
    )
      .map((el) => {
        return `${el.day}/${el.month}`;
      });

    // animal array for series looping
		const animals = Object.values(
      dailyFoodConsumption
        .reduce((acc, val) => {
          if (!acc[val.animal]) acc[val.animal] = val;
          return acc;
        }, {})
      )
        .map(consumption => {
          return consumption.animal
        })

    // date array for series looping
    let dates = Object.values(
      dailyFoodConsumption
        .reduce((acc, val) => {
          if (!acc[val.date]) acc[val.date] = val;
          return acc;
        }, {})
    )
      .map((el) => {
        return el.date;
      });

    // series looping
		let animalSeries = animals.map(animal => {
      let data = dates.map(date => {
        return dailyFoodConsumption
          .filter(consumption => {
            return consumption.animal === animal && consumption.date === date
          })
          .reduce((acc, val) => {
            return acc + Math.round(val.meat / 10)
          }, 0)
      })

      return {
        name: animal,
        data: data.map(datum => datum / 100),
      }
    })

    // color codes according to example
    const colorCode = {
      'BERUANG'  : '#C23D36', 
      'SERIGALA'   : '#AEAEAE', 
      'BUAYA' : '#7B9C55',
      'SINGA' : '#F7D147',
      'MACAN' : '#EC9B3F',
      'ULAR' : '#74C367',
      'LAINNYA': '#2F70B3',
    }

    // adding color codes 
    animalSeries = animalSeries.map(animal => {
      animal.color = colorCode[animal.name]
      return animal
    })

    // sort according to example
    const sortedBy = {
      'BERUANG'  : 0, 
      'SERIGALA'   : 1, 
      'BUAYA' : 2,
      'SINGA' : 3,
      'MACAN' : 4,
      'ULAR' : 5,
      'LAINNYA': 6,
    }
    
    options.series = animalSeries.sort((a, b) => sortedBy[a.name] - sortedBy[b.name])
	}
	return options;
};

export const dayMonthSort = (dailyFoodConsumption) => {
	return dailyFoodConsumption
		.map((consumption) => {
			consumption.newDate = new Date(
				`${consumption.year}-${consumption.month}-${consumption.day}`
      )
      consumption.date = consumption.newDate.toISOString()
			return consumption;
		})
		.sort((a, b) => a.newDate - b.newDate)
};
