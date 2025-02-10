import React from 'react';

const FilterModal = ({ isOpen, onClose, onApply }) => {
  const [filterValue, setFilterValue] = React.useState('');

  const handleApply = () => {
    onApply(filterValue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content whitebox-card">
        <div className="modal-header">
          <div className='modal-title'>Filter Data</div>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Enter filter value"
          className='form-control'
        />
        <button className="btn" onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
};

export default FilterModal;