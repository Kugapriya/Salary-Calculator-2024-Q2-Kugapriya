
import PropTypes from 'prop-types';

const DeductionsList = ({ deductions, onDeductionsChange }) => {
  const handleAmountChange = (index, e) => {
    onDeductionsChange(index, e.target.value);
  };

  return (
    <div className="deductions-list">
      <h3>Deductions</h3>
      {deductions.map((deduction, index) => (
        <div key={index}>
          <label>{deduction.label}:</label>
          <input
            type="number"
            value={deduction.amount}
            onChange={(e) => handleAmountChange(index, e)}
          />
        </div>
      ))}
    </div>
  );
};

DeductionsList.propTypes = {
  deductions: PropTypes.array.isRequired,
  onDeductionsChange: PropTypes.func.isRequired,
};

export default DeductionsList;
