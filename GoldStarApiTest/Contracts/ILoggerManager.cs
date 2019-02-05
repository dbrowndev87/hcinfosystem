/**
 * Name: ILoggerManger
 * Description: This is an interface to be implemented by the Logger Manager , containing the different types of logging
 *         strings that will be added to log files
 * 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
namespace Contracts
{
    public interface ILoggerManager
    {
        void LogInfo(string message);
        void LogWarn(string message);
        void LogDebug(string message);
        void LogError(string message);
    }
}