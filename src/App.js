import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AIAssistantScreen from './screens/AIAssistantScreen';
import StatsScreen from './screens/StatsScreen';
import InventoryScreen from './screens/InventoryScreen';
import CustomersScreen from './screens/CustomersScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import SideDrawer from './components/SideDrawer';
import { Toolbar, Box, CssBaseline } from '@mui/material';
import './index.css';

const drawerWidth = 250;

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}  className="main-background">
        <CssBaseline />
        <SideDrawer drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<AIAssistantScreen />} />
            <Route path="/stats" element={<StatsScreen />} />
            <Route path="/inventory" element={<InventoryScreen />} />
            <Route path="/customers" element={<CustomersScreen />} />
            <Route path="/place-order" element={<PlaceOrderScreen />} />
          </Routes>
        </Box>
      </div>
    </Router>
  );
};

export default App;