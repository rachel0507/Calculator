using Calculator.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Calculator.Controllers
{
    [ApiController]
    public class CalculatorController : ControllerBase
    {
        private readonly string _fileName = "calculationList.json";

        [HttpGet]
        [Route("GetCalculationList")]
        public List<Calculation> GetCalculationList()
        {
            var listString = System.IO.File.ReadAllText(_fileName);
            var calcList = JsonSerializer.Deserialize<List<Calculation>>(listString).OrderByDescending(c => c.Updated).ToList();
            return calcList;
        }

        [HttpPost]
        [Route("SaveCalculation")]
        public List<Calculation> SaveCalculation([FromBody] Calculation calculation)
        {
            var calcList = GetCalculationList();
            calculation.Result = CalcResult(calculation);
            calculation.Updated = DateTime.Now;
            if (calculation.Id != null)
            {
                var updateCalculation = calcList.First(c => c.Id == calculation.Id);
                updateCalculation.Num1 = calculation.Num1;
                updateCalculation.Num2 = calculation.Num2;
                updateCalculation.Oper = calculation.Oper;
                updateCalculation.Result = calculation.Result;
            }
            else
            {
                calculation.Id = Guid.NewGuid().ToString("N");
                calculation.Created = DateTime.Now;
                calcList.Add(calculation);
            }

            SaveCalcList(calcList);
            return GetCalculationList(); ;
        }

        [HttpDelete("{id}")]
        [Route("DeleteCalculation/{ids}")]
        public List<Calculation> Delete(string ids)
        {
            var listIds = ids.Split(',').ToList();
            var calcList = GetCalculationList();
            calcList.RemoveAll(c => listIds.IndexOf(c.Id.ToString()) >= 0);
            SaveCalcList(calcList);
            return GetCalculationList();
        }

        private void SaveCalcList(List<Calculation> calcList)
        {
            System.IO.File.WriteAllText(_fileName, JsonSerializer.Serialize(calcList));
        }

        private double CalcResult(Calculation calculation)
        {
            switch (calculation.Oper)
            {
                case Operator.Add:
                    return calculation.Num1 + calculation.Num2;
                case Operator.Sub:
                    return calculation.Num1 - calculation.Num2;
                case Operator.Mul:
                    return calculation.Num1 * calculation.Num2;
                case Operator.Div:
                    return calculation.Num1 / calculation.Num2;
            }
            throw new Exception("undefined operator");
        }
    }
}
