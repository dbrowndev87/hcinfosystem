/**
 * Name: LoggerService
 * Description: This is the LoggerService class that uses the NLog framework that allows to configure logging messages
 *         for a variety of locations. This class will create the different types of logging messages debug, error, info,
 *         and warn. When these methods are called they will write to the log file using todays date. 
 * Author: Nick Peconi/Darcy Brown
 * Date: January 7th, 2019
 */
using Contracts;
using NLog;

namespace LoggerService
{
    public class LoggerManager : ILoggerManager
    {
        private static ILogger logger = LogManager.GetCurrentClassLogger();
 
        public LoggerManager()
        {
        }
 
        public void LogDebug(string message)
        {
            logger.Debug(message);
        }
 
        public void LogError(string message)
        {
            logger.Error(message);
        }
 
        public void LogInfo(string message)
        {
            logger.Info(message);
        }
 
        public void LogWarn(string message)
        {
            logger.Warn(message);
        }
    }
}