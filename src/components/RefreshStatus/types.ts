export interface RefreshStatusType {
  refreshing: boolean;
  isSafe: boolean;
  onRefresh: () => void;
}
