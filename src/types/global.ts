export type Notification = {
  id: string;
  title: string;
  content: string;
  type: "loading" | "info" | "error" | "complete" | string;
  action: () => void;
  actionText?: string;
};
