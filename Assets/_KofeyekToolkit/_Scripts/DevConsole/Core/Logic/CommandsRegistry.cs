using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace KofeyekToolkit.DevConsole
{
    /// <summary>
    /// Находит методы с атрибутом <see cref="CommandAttribute"/> и хранит их метаданные для выполнения из консоли.
    /// </summary>
    public static class CommandsRegistry
    {
        private static readonly Dictionary<string, ConsoleCommand> _commands = new(); 
        /// <summary>
        /// Зарегистрированные команды, доступные для выполнения.
        /// </summary>
        public static IReadOnlyDictionary<string, ConsoleCommand> Commands => _commands;

        /// <summary>
        /// Находит и регистрирует все методы, отмеченные атрибутом команды.
        /// </summary>
        public static void RegisterAllCommands()
        {
            _commands.Clear();

            var methods = AppDomain.CurrentDomain.GetAssemblies().
                SelectMany(a => a.GetTypes()).
                SelectMany(t => t.GetMethods(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.Instance));

            foreach (var method in methods)
            {
                var attribute = method.GetCustomAttribute<CommandAttribute>();
                
                if (attribute == null)
                    continue;

                object target = null;

                if (!method.IsStatic)
                {
                    if (typeof(UnityEngine.Object).IsAssignableFrom(method.DeclaringType))
                        target = UnityEngine.Object.FindAnyObjectByType(method.DeclaringType);
                    else if (method.DeclaringType != null)
                        target = Activator.CreateInstance(method.DeclaringType);
                }

                var command = new ConsoleCommand(
                    attribute.Name,
                    attribute.Description,
                    method,
                    target,
                    method.GetParameters());
                
                _commands.Add(command.Name, command);
            }
        }

        /// <summary>
        /// Ищет команду по имени.
        /// </summary>
        public static bool TryGetCommand(string commandName, out ConsoleCommand command)
        {
            return _commands.TryGetValue(commandName.ToLower(), out command);
        }
    }
}