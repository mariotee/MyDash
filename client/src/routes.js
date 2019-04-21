import DashboardScene from 'scenes/dashboard';
import CustomersManagerScene from 'scenes/customersManager';
import BillingReportsScene from 'scenes/billingReports';
import ServiceMapScene from 'scenes/serviceMap';
import TaskManagerScene from "scenes/taskManager"

import {
  Dashboard,
  ContentPaste,
  LibraryBooks,
  Tv,
  FormatListNumbered,
} from '@material-ui/icons';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardScene,
    icon: Dashboard,
  },
  {
    path: '/customersmanager',
    name: 'Customers Manager',
    component: CustomersManagerScene,
    icon: ContentPaste,
  },
  {
    path: '/billing',
    name: 'Billing Reports',
    component: BillingReportsScene,
    icon: LibraryBooks,
  },
  {
    path: '/servicemap',
    name: 'Distributed Service Map',
    component: ServiceMapScene,
    icon: Tv,
  },  
  {
    path: '/taskmanager',
    name: 'Task Manager',
    component: TaskManagerScene,
    icon: FormatListNumbered,
  },  
];

export default routes;