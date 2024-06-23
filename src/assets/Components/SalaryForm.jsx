import  { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './SalaryForm.css';

const SalaryForm = () => {
  const [results, setResults] = useState({
    totalEarnings: 0,
    grossEarnings: 0,
    netSalary: 0,
    taxAmount: 0,
  });

  const initialValues = {
    basicSalary: '',
    earnings: [],
    deductions: [],
  };

  const validationSchema = Yup.object().shape({
    basicSalary: Yup.number().required('Basic Salary is required'),
  });

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

  const handleSubmit = (values) => {
    let totalEarnings = parseFloat(values.basicSalary);

    values.earnings.forEach((earning) => {
      totalEarnings += parseFloat(earning.amount);
    });

    const grossEarnings =
      totalEarnings -
      parseFloat(
        values.deductions.reduce((acc, deduction) => acc + parseFloat(deduction.amount), 0)
      );

    const taxAmount = calculateTax(grossEarnings);

    const netSalary = grossEarnings - taxAmount;

    setResults({
      totalEarnings: totalEarnings, 
      grossEarnings: grossEarnings,
      netSalary: netSalary,
      taxAmount: taxAmount,
    });
  };

  return (
    <div className="salary-form-container">
      <h2>Salary Calculator</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="basicSalary">Basic Salary:</label>
              <Field type="number" id="basicSalary" name="basicSalary" />
              <ErrorMessage name="basicSalary" component="div" className="error" />
            </div>

            <FieldArray name="earnings">
              {({ push, remove }) => (
                <div>
                  <h3>Earnings</h3>
                  {values.earnings.map((earning, index) => (
                    <div key={index} className="form-group">
                      <Field
                        type="number"
                        name={`earnings.${index}.amount`}
                        placeholder="Amount"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="btn-remove"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ amount: '' })}
                    className="btn-add"
                  >
                    Add Earning
                  </button>
                </div>
              )}
            </FieldArray>

            <FieldArray name="deductions">
              {({ push, remove }) => (
                <div>
                  <h3>Deductions</h3>
                  {values.deductions.map((deduction, index) => (
                    <div key={index} className="form-group">
                      <Field
                        type="number"
                        name={`deductions.${index}.amount`}
                        placeholder="Amount"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="btn-remove"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ amount: '' })}
                    className="btn-add"
                  >
                    Add Deduction
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="form-buttons">
              <button type="submit">Calculate Salary</button>
              <button type="reset">Reset</button>
            </div>
          </Form>
        )}
      </Formik>

     
      <div className="results">
        <h3>Results</h3>
        <p>Total Earnings: {results.totalEarnings}</p>
        <p>Gross Earnings: {results.grossEarnings}</p>
        <p>Tax Deducted: {results.taxAmount}</p>
        <p>Net Salary: {results.netSalary}</p>
      </div>
    </div>
  );
};

export default SalaryForm;
