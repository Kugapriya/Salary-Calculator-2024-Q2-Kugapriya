import  { useState } from 'react';
import DeductionsList from './assets/Components/DeductionsList';
import EarningsList from './assets/Components/EarningsList';
import SalaryResult from './assets/Components/SalaryResult';
import SalaryForm from './assets/Components/SalaryForm'; 
import './App.css';


const calculateTax = (grossEarnings) => {
  let tax = 0;

  if (grossEarnings <= 100000) {
    tax = 0;
  } else if (grossEarnings <= 141667) {
    tax = (grossEarnings - 100000) * 0.06 - 6000;
  } else if (grossEarnings <= 183333) {
    tax = (grossEarnings - 141667) * 0.12 - 14500;
  } else if (grossEarnings <= 225000) {
    tax = (grossEarnings - 183333) * 0.18 - 25500;
  } else if (grossEarnings <= 266667) {
    tax = (grossEarnings - 225000) * 0.24 - 39000;
  } else if (grossEarnings <= 308333) {
    tax = (grossEarnings - 266667) * 0.30 - 55000;
  } else {
    tax = (grossEarnings - 308333) * 0.36 - 73500;
  }

  return Math.max(0, tax); 
};

const App = () => {
  const [deductions, setDeductions] = useState([
    { label: 'Deduction 1', amount: 0 },
    { label: 'Deduction 2', amount: 0 },
  ]);

  const [earnings, setEarnings] = useState([
    { label: 'Earning 1', amount: 0, applicable: true },
    { label: 'Earning 2', amount: 0, applicable: true },
  ]);

  const [epfApplicable] = useState(true);

  const handleDeductionsChange = (index, amount) => {
    const newDeductions = [...deductions];
    newDeductions[index].amount = amount;
    setDeductions(newDeductions);
  };

  const handleEarningsChange = (index, amount) => {
    const newEarnings = [...earnings];
    newEarnings[index].amount = amount;
    setEarnings(newEarnings);
  };

  const totalEarnings = earnings.reduce((total, earning) => total + (earning.applicable ? earning.amount : 0), 0);
  const grossEarnings = totalEarnings - deductions.reduce((total, deduction) => total + deduction.amount, 0);

  const taxAmount = calculateTax(grossEarnings); 

  const netSalary = grossEarnings - taxAmount;

  const salaryDetails = {
    totalEarnings,
    grossEarnings,
    tax: taxAmount,
    netSalary,
  };

  return (
    <div className="app">
      <h1>Salary Calculator</h1>

      <SalaryForm />

      <DeductionsList deductions={deductions} onDeductionsChange={handleDeductionsChange} />

      <EarningsList earnings={earnings} onEarningsChange={handleEarningsChange} epfApplicable={epfApplicable} />

      <SalaryResult salaryDetails={salaryDetails} />
    </div>
  );
};

export default App;
