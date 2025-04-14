
let alertFn: ((msg: string, type?: "success" | "error" | "info" | "warning") => void) | null = null;

export function setAlertFunction(fn: typeof alertFn) {
  alertFn = fn;
}

export function showAlert(msg: string, type: "success" | "error" | "info" | "warning" = "info") {
  if (alertFn) alertFn(msg, type);
}
