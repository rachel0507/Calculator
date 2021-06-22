enum oper {
  add = 1,
  sub = 2,
  mul = 3,
  div = 4
}

interface ICalculation {
  id: string;
  num1: double;
  num2: double;
  oper: oper;
  result?: double;
}

interface CalculationProps {
  calculatiom: ICalculation;
}

type ApiDataType = {
  message: string;
  status: string;
  calculations?: ICalculation[];
  calculation?: ICalculation;
};
