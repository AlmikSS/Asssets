using System;

namespace KofeyekToolkit.DI.Attributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = false)]
    public sealed class RegisterAttribute : Attribute
    {
        public Type ContractType { get; }
        public RegisterType RegisterType { get; set; } 
        
        public RegisterAttribute(Type contractType = null, RegisterType registerType = RegisterType.Singleton)
        {
            ContractType = contractType;
            RegisterType = registerType;
        }
    }

    public enum RegisterType
    {
        Singleton,
        Transient,
    }
}