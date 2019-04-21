import React from 'react';
import PropTypes from 'prop-types';
import Chartist from 'react-chartist';

import { connect } from 'react-redux';
import * as BillingActions from 'store/Billing/actions.js';

import animation from 'utils/ChartistAnimation.js';

const mapStateToProps = (state) => ({ data: state.billing.data });

const mapDispatchToProps = (dispatch) => ({
  getAllUsageFromApi: () => {
    dispatch(BillingActions.getAllUsageFromApi());
  },
});

class RevenueChartContainer extends React.Component {
  componentDidMount() {
    this.props.getAllUsageFromApi();
  }

  render() {
    const getDay = (offset) => {
      let d = new Date("2019-04-16")
      d.setDate(d.getDate() + offset)
      return d
    }
    const getString = (day) => day.toDateString().slice(4,-5)
    const day0 = getDay(-6)
    const day1 = getDay(-5)
    const day2 = getDay(-4)
    const day3 = getDay(-3)
    const day4 = getDay(-2)
    const day5 = getDay(-1)
    const day6 = getDay(0)
    const chartData = {
      labels: [
        getString(day0),
        getString(day1),
        getString(day2),
        getString(day3),
        getString(day4),
        getString(day5),
        getString(day6),
      ],
      series: [[0,0,0,0,0,0,0]],
    }

    if (this.props.data) {      
      for (const element of this.props.data) {
        const {dateIssued, usageInMegabytes, unitPricePerMegabyteUsd} = element
        let d = new Date(dateIssued)
        chartData.series[0][0] += d.toDateString() === day0.toDateString() ? usageInMegabytes*unitPricePerMegabyteUsd : 0
        chartData.series[0][1] += d.toDateString() === day1.toDateString() ? usageInMegabytes*unitPricePerMegabyteUsd : 0
        chartData.series[0][2] += d.toDateString() === day2.toDateString() ? usageInMegabytes*unitPricePerMegabyteUsd : 0
        chartData.series[0][3] += d.toDateString() === day3.toDateString() ? usageInMegabytes*unitPricePerMegabyteUsd : 0
        chartData.series[0][4] += d.toDateString() === day4.toDateString() ? usageInMegabytes*unitPricePerMegabyteUsd : 0
        chartData.series[0][5] += d.toDateString() === day5.toDateString() ? usageInMegabytes*unitPricePerMegabyteUsd : 0
        chartData.series[0][6] += d.toDateString() === day6.toDateString() ? usageInMegabytes*unitPricePerMegabyteUsd : 0
      }
    }
    return (
      <Chartist
        type="Line"
        data={chartData}
        options={{ 
          low: 0,
          axisX: {
            showGrid: false,
          },                 
        }}
        listener={animation}
      />
    );
  }
}

RevenueChartContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAllUsageFromApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProps)(RevenueChartContainer);
