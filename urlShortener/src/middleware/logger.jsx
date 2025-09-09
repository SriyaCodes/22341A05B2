
export function Log(stack, level, packageName, message) {

  const log = {
    timestamp: new Date().toISOString(),
    stack,
    level,
    package: packageName,
    message,
  };
  
  localStorage.setItem(`log-${Date.now()}`, JSON.stringify(log));
}
