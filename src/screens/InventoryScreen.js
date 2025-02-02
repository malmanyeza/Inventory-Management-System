// InventoryScreen.jsx
import React, { useState } from 'react';
import InventoryTable from '../components/InventoryScreen/InventoryTable';
import InventoryTableHeader from '../components/InventoryScreen/InventoryTableHeader';

const InventoryScreen = () => {
  const [inventory, setInventory] = useState([
    { id: '001', name: 'Product A', quantity: 120, category: 'Electronics', price: 500, percentageSold: '75%' },
    { id: '002', name: 'Product B', quantity: 50, category: 'Apparel', price: 30, percentageSold: '60%' },
    { id: '003', name: 'Product C', quantity: 200, category: 'Home & Kitchen', price: 150, percentageSold: '90%' },
  ]);

  const handleAddProduct = () => {/* existing logic */};
  const handleExportPdf = () => {/* existing logic */};
  const handleApplyFilter = (filter) => {/* existing logic */};

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      height: '90%',
      margin: '0 10px 5px 10px',
      borderRadius: '10px',
      padding: '20px',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}>
        <InventoryTableHeader
          onAddProduct={handleAddProduct}
          onExportPdf={handleExportPdf}
          onApplyFilter={handleApplyFilter}
        />
        
        <div style={{
          flex: 1,
          width: '100%',
          marginTop: '10px',
          overflowY: 'auto',
          paddingRight: '10px',
        }}>
          <InventoryTable inventory={inventory} />
        </div>
      </div>

      {/* Scrollbar styles */}
      <style>
        {`
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            border: 2px solid rgba(255, 255, 255, 0.3);
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.7);
          }
        `}
      </style>
    </div>
  );
};

export default InventoryScreen;