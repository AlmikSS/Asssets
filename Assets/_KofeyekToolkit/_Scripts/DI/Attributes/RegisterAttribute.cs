using System;

namespace KofeyekToolkit.DI.Attributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = false)]
    public sealed class RegisterAttribute : Attribute
    {
        public Type ContractType { get; }
        public bool IsSingleton { get; set; } = true;

        public RegisterAttribute(Type contractType = null)
        {
            ContractType = contractType;
        }
    }
}