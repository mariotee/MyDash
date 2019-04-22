import React from 'react'
import Chartist from 'react-chartist'

import Grid from '@material-ui/core/Grid';
import { Typography, Card, CardContent } from '@material-ui/core'

import Layout from 'layout'
import ServiceMapContainer from 'containers/serviceMap'
import IncompleteTasksContainer from "containers/taskManager"

import animation from 'utils/ChartistAnimation.js'

import MockRevenueContainer from 'containers/revenueChartContainer.js'

class DashboardContainer extends React.Component {
  render() {
    const data = {
      labels: ["Jan'18", "Feb'18", "Mar'18", "Apr'18", "May'18", "Jun'18"],
      series: [
        [9512, 4842, 8115, 2121, 1285, 9085],
        [5556, 9965, 3123, 6557, 8385, 7012],
        [1234, 2133, 2134, 4332, 3123, 4533],
      ],
    };

    const barGraphData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      series: [[5, 8, 13, 12, 9]],
    };

    const thirdData = {
      labels: ['1', '2', '3', '4'],
      series: [[43, 56, 77, 99], [12, 77, 88, 50]],
    };

    const fourthData = {
      labels: ['1', '2', '3', '4'],
      series: [
        [9, 2, 5, 8], //series a
        [], //skipped to show series b color
        [], //skipped to show series c color
        [5, 4, 8, 7], //series d
      ],
    };

    const options = {
      low: 0,
      axisX: {
        showGrid: false,
      },
      axisY: {
        showGrid: false,
      },
      showArea: true,
    };

    return (
      <Layout title="Dashboard (uses both web api and hardcoded data)">
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="title">{'Revenue'}</Typography>
                <MockRevenueContainer />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="title">{'Data (hardcoded)'}</Typography>
                <Chartist
                  data={data}
                  options={options}
                  type={'Line'}
                  listener={animation}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card>
              <CardContent>
                <Typography variant="title">{'Incomplete Tasks'}</Typography>
                <IncompleteTasksContainer/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={7}>
            <Card>
              <CardContent>
                <Typography variant="title">{'Service Map'}</Typography>
                <div style={{ height: '415px' }}>
                  <ServiceMapContainer/>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="title">{'Analyses (hardcoded)'}</Typography>
                <Typography variant="caption">{'(This Week)'}</Typography>
                <Chartist
                  data={barGraphData}
                  options={options}
                  type={'Bar'}
                  listener={animation}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="title">{'Line Graph (hardcoded)'}</Typography>
                <Typography variant="caption">{'(Some Graph)'}</Typography>
                <Chartist
                  data={thirdData}
                  options={options}
                  type={'Line'}
                  listener={animation}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="title">{'Line Graph (hardcoded)'}</Typography>
                <Typography variant="caption">
                  {'(Some Other Graph)'}
                </Typography>
                <Chartist
                  data={fourthData}
                  options={options}
                  type={'Line'}
                  listener={animation}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default DashboardContainer;