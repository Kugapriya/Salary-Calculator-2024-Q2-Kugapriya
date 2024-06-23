import PropTypes from 'prop-types'; 
import './SalaryResult.css';

const SalaryResult = ({ salaryDetails }) => {
  return (
    <div className="salary-result">
      <h3>Salary Details</h3>
      <div>
        <strong>Total Earnings:</strong> {salaryDetails.totalEarnings}
      </div>
      <div>
        <strong>Gross Earnings:</strong> {salaryDetails.grossEarnings}
      </div>
      <div>
        <strong>Tax:</strong> {salaryDetails.tax}
      </div>
      <div>
        <strong>Net Salary:</strong> {salaryDetails.netSalary}
      </div>
    </div>
  );
};

SalaryResult.propTypes = {
  salaryDetails: PropTypes.shape({
    totalEarnings: PropTypes.number.isRequired,
    grossEarnings: PropTypes.number.isRequired,
    tax: PropTypes.number.isRequired,
    netSalary: PropTypes.number.isRequired,
  }).isRequired,
};

export default SalaryResult;
