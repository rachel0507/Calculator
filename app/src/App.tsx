import React, { useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator/Calculator";
import CalculationList from "./components/calculationList/calculationList";
import { Header } from "./components/header/header";

const { useRef } = React;


function App() {
  const [editCalculation, setEditCalulation] = useState<any>();

  //reference to calculator child component
  const childRef = useRef();

  //reload calculation history after calcultor change
  const updateCalcList = (event: React.MouseEvent<unknown>, updatedRows: ICalculation[]) => {
    (childRef.current as any).updateRows(updatedRows);
  }

  return (
    <div className="App">
      <Header />
      <Calculator
        newCalculation={editCalculation || {}}
        setState={setEditCalulation}
        onCalculationSave={updateCalcList} />
      <CalculationList ref={childRef}
        handleCalculationEdit={(event: React.MouseEvent<unknown>, row: ICalculation) => setEditCalulation(row)}
      />
    </div>
  );
}

export default App;
