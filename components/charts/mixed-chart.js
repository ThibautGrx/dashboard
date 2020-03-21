import React from 'react'
import PropTypes from 'prop-types'
import BarChart from './bar-chart'
import colors from "../../styles/colors";

const options = {
  tooltips: {
    mode: 'index',
    callbacks: {
      label: (tooltipItem, data) => {
        const datasetLabel = data.datasets[tooltipItem.datasetIndex].label
        return tooltipItem.value === 'NaN' ? datasetLabel + ' : undefined' : datasetLabel + ' : ' + tooltipItem.value
      }
    }
  },
  scales: {
    xAxes: [{
      stacked: true,
      type: 'time',
      time: {
        unit: 'day',
        displayFormats: {
          day: 'DD/MM'
        },
        tooltipFormat: 'DD/MM'
      },
      gridLines: {
        offsetGridLines: true
      },
      offset: true
    }],
    yAxes: [{
      stacked: true
    }]
  }
}

const formatData = data => {
  const datasets = []

  if (data.some(h => h.casConfirmes)) {
    datasets.push({
      label: 'Cas confirmés',
      data: data.map(h => h.casConfirmes - ((h.deces + h.hospitalises + h.reanimation) || 0)),
      backgroundColor: colors.orange
    })
  }

  if (data.some(h => h.hospitalises)) {
    datasets.push({
      label: 'Hospitalisés',
      data: data.map(h => h.hospitalises),
      backgroundColor: colors.darkGrey
    })
  }

  if (data.some(h => h.reanimation)) {
    datasets.push({
      label: 'Réanimation',
      data: data.map(h => h.reanimation),
      backgroundColor: colors.darkerGrey
    })
  }

  if (data.some(h => h.deces)) {
    datasets.push({
      label: 'Décédés',
      data: data.map(h => h.deces),
      backgroundColor: colors.red
    })
  }

  return {
    labels: data.map(h => new Date(h.date)),
    datasets
  }
}

const MixedChart = ({data, height}) => (<BarChart data={formatData(data)} options={options} height={height} />)

MixedChart.defaultProps = {
  height: null
}

MixedChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number
}

export default MixedChart
