export interface HtttpAdapter {
  get<T>(url: string): Promise<T>;
}
