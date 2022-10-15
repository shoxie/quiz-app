import { atom } from "jotai";
import { Notification } from "@/types/global";

export const notificationsAtom = atom<Notification[]>([]);
export const headerHeightAtom = atom<number>(0)