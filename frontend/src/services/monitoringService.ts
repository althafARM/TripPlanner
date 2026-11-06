const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// System monitoring types
export interface SystemStatus {
  status: string;
  cpu: {
    usage_percent: number;
  };
  memory: {
    total_gb: number;
    used_gb: number;
    usage_percent: number;
  };
  disk: {
    total_gb: number;
    used_gb: number;
    usage_percent: number;
  };
  uptime_seconds: number;
}

// AI monitoring types
export interface AIMonitoring {
  status: string;
  ai_monitoring: {
    total_requests: number;
    successful_requests: number;
    failed_requests: number;
    average_response_time: number;
    last_request_time: string | null;
  };
}

// Database monitoring types
export interface DatabaseStatus {
  database: string;
  status: string;
  healthy: boolean;
}

// Logs types
export interface ApplicationLogs {
  status: string;
  total_logs: number;
  logs: string[];
}

// Common API request function
async function fetchMonitoringData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Monitoring API error: ${response.status}`);
  }

  return response.json();
}

// Get system information
export function getSystemStatus() {
  return fetchMonitoringData<SystemStatus>("/api/monitoring/system");
}

// Get AI request statistics
export function getAIMonitoring() {
  return fetchMonitoringData<AIMonitoring>("/api/monitoring/ai");
}

// Get database connection status
export function getDatabaseStatus() {
  return fetchMonitoringData<DatabaseStatus>("/api/monitoring/database");
}

// Get application logs
export function getApplicationLogs() {
  return fetchMonitoringData<ApplicationLogs>("/api/monitoring/logs");
}