import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Notification } from "@/types/global";

enum NotificationTypes {
  "loading",
  "info",
  "error",
  "success",
}

type NotificationType = keyof typeof NotificationTypes

type TNotiContext = {
  notis: Notification[];
  addNoti: (
    title: string,
    content: string,
    type: NotificationType,
    actionText: string,
    action: () => void
  ) => void;
};

type Props = {
  children?: ReactNode;
};

const NotificationContext = createContext<TNotiContext>({
  notis: [],
  addNoti: (
    title: string,
    content: string,
    type: NotificationType,
    actionText: string,
    action: () => void
  ) => {},
});

export function NotificationProvider({ children }: Props) {
  const [notis, setNotis] = useState<Notification[]>([]);

  const addNoti = (
    title: string,
    content: string,
    type: NotificationType,
    actionText: string,
    action: () => void
  ) => {
    const newItem = {
      title,
      content,
      id: Math.floor(Math.random() * 999).toString(),
      type,
      action,
      actionText,
    };
    const temp = [...notis, newItem];
    setNotis(temp);
    setTimeout(() => {
      action()
      setNotis((prev) => {
        const newArr = prev.filter((item, idx) => item !== newItem);
        return newArr;
      });
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{
        notis,
        addNoti,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNoti() {
  const data = useContext(NotificationContext);

  if (!data) {
    throw new Error("Noti must be provided");
  }

  return data;
}
