import axios, { AxiosResponse } from "axios";

const baseUrl: string = "https://localhost:44306";

export const getCalculationList = async (
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const response: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + `/getCalculationList`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};


export const saveCalculation = async (
  newCalculation: ICalculation
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const calculation: ICalculation = {
      id: newCalculation.id,
      num1: newCalculation.num1,
      num2: newCalculation.num2,
      oper: newCalculation.oper,
    };
    const response: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/saveCalculation",
      calculation
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCalculationById = async (
  id: string[]
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const response: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/deleteCalculation/${id.join(",")}`
    );
    return response.data as any;
  } catch (error) {
    throw new Error(error);
  }
};
