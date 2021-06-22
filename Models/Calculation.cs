using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calculator.Models
{
    public enum Operator
    {
        Add = 1,
        Sub = 2,
        Mul = 3,
        Div = 4
    }
    public class Calculation
    {
        public string Id { get; set; }
        public double Num1 { get; set; }
        public double Num2 { get; set; }
        public Operator Oper { get; set; }
        public double Result { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
