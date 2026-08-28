using System;
using System.Collections.Generic;

namespace KofeyekToolkit.DI.Core
{
    public static class TypeMetadata
    {
        private static readonly Dictionary<Type, TypeInfo> Cache = new();

        public static TypeInfo Get(Type type)
        {
            if (!Cache.TryGetValue(type, out var info))
            {
                info = new  TypeInfo(type);
                Cache[type] = info;
            }
            
            return info;
        }
    }
}