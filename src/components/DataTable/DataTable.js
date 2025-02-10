import React, { useState } from 'react';
import FilterModal from '../FilterModal/FilterModal';

const DataTable = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleFilterApply = (value) => {
    setFilterValue(value);
    const newData = data.filter(row => 
      Object.values(row).some(val => 
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(newData);
  };

  return (
    <div className="table-responsive whitebox-card">
      <div className="table-title">
        Table Data
        <button onClick={() => setModalOpen(true)}>Open Filter</button>
      </div>
      <FilterModal
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onApply={handleFilterApply} 
      />
      {filteredData.length > 0 && (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {Object.keys(filteredData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTable;