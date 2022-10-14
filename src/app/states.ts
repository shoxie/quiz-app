import { atom } from "jotai";
import { Notification } from "@/types/global";

export const notificationsAtom = atom<Notification[]>([]);
