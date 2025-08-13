import type { DataSourceConfig } from './types'

// Configure your data source here.
// For Google Sheets CSV: publish to web and paste the CSV link into csvUrl.
// For JSON: host a JSON file and set jsonUrl. If neither set, it falls back to /data/sample.json.
export const dataSource: DataSourceConfig = {
  // Prefer env vars when available (no code change needed when deploying)
  csvUrl: (import.meta as any).env?.VITE_DATA_CSV_URL || undefined,
  jsonUrl: (import.meta as any).env?.VITE_DATA_JSON_URL || undefined,
}
