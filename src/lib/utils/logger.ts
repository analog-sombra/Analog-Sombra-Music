import winston from "winston";

const { combine, timestamp, printf, colorize, errors, prettyPrint } =
  winston.format;

// Define your custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  if (stack) {
    return `[${timestamp}] ${level}: ${stack}`;
  }

  // Check if the message is an object or an array, and print accordingly
  if (typeof message === "object") {
    return `[${timestamp}] ${level}: ${JSON.stringify(message, null, 2)}`;
  }

  // For primitive types like strings, numbers, etc.
  return `[${timestamp}] ${level}: ${message}`;
});

// Create a Winston logger instance
const logger = winston.createLogger({
  level: "debug", // Set default logging level
  format: combine(
    colorize(),
    timestamp(),
    prettyPrint(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
