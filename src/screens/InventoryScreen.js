import React, { useState } from 'react';
import InventoryTable from '../components/InventoryScreen/InventoryTable';
import InventoryTableHeader from '../components/InventoryScreen/InventoryTableHeader'; 


const InventoryScreen = () => {
  // Sample data for the inventory table
  const [inventory, setInventory] = useState([
    { id: '001', name: 'Product A', quantity: 120, category: 'Electronics', price: 500, percentageSold: '75%' },
    { id: '002', name: 'Product B', quantity: 50, category: 'Apparel', price: 30, percentageSold: '60%' },
    { id: '003', name: 'Product C', quantity: 200, category: 'Home & Kitchen', price: 150, percentageSold: '90%' },
  ]);

  const handleAddProduct = () => {
    console.log('Add Product button clicked');
    // Logic to add a new product
  };

  const handleExportPdf = () => {
    console.log('Export to PDF button clicked');
    // Logic to export the inventory to a PDF
  };

  const handleApplyFilter = (filter) => {
    console.log(`Filter applied: ${filter}`);
    // Logic to apply the selected filter
  };

  return (
    <div style={{ padding: '20px' }}>
      <InventoryTableHeader
        onAddProduct={handleAddProduct}
        onExportPdf={handleExportPdf}
        onApplyFilter={handleApplyFilter}
      />
      <InventoryTable inventory={inventory} />
    </div>
  );
};

export default InventoryScreen;
