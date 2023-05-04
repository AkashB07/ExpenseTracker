import React from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';

import { themesActions } from "../../store/theme";

const Premium = () => {
  const data = useSelector((state) => state.expense.allExpense);

  const csvData = data.map((d) => {
    return {
      amount: d.amount,
      description: d.description,
      category: d.category,
    };
  });

  const dispatch = useDispatch();

  const changeThemeHandler = () => {
    dispatch(themesActions.theme());
  };

  const csvReport = {
    filename: "Report.csv",
    data: csvData,
  };

  return (
    <div>
      <div>
        <Button variant="light" onClick={changeThemeHandler}>Change Theme</Button>
      </div>
      <div>
        <CSVLink {...csvReport}>Download Expense</CSVLink>
      </div>
    </div>
  );
};

export default Premium;