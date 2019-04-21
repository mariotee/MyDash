import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import Layout from 'layout';
import IncompleteTasksContainer from 'containers/taskManager';

class TaskManager extends React.Component {
  render() {
    return (
      <Layout title="Task Manager">
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <Card>
              <IncompleteTasksContainer/>
            </Card>
          </Grid>
          {/*    
          <Grid item xs={12} md={6}>
            <Card>
              <CompletedTasksContainer/>
            </Card>
          </Grid>
          */}
        </Grid>
      </Layout>
    );
  }
}

export default TaskManager;
