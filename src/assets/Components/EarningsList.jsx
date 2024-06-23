import PropTypes from 'prop-types';
import './EarningsList.css';

const EarningsList = ({ earnings, onEarningsChange, epfApplicable }) => {
  const handleAmountChange = (index, e) => {
    onEarningsChange(index, e.target.value);
  };

  return (
    <div className="earnings-list">
      <h3>Earnings</h3>
      {earnings.map((earning, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={earning.applicable}
              onChange={() => onEarningsChange(index, !earning.applicable)}
            />
            {earning.label}:
          </label>
          <input
            type="number"
            value={earning.amount}
            onChange={(e) => handleAmountChange(index, e)}
            disabled={!earning.applicable || !epfApplicable}
          />
        </div>
      ))}
    </div>
  );
};

EarningsList.propTypes = {
  earnings: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      applicable: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onEarningsChange: PropTypes.func.isRequired,
  epfApplicable: PropTypes.bool.isRequired,
};

export default EarningsList;
