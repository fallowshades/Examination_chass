/**
 * avoid revalidation on save data mode.
 */
import { useEffect } from "react";
//https://sergiodxa.com/tutorials/keep-your-loader-data-fresh-in-remix
// Extend Navigator type to include 'connection'
interface NavigatorConnection {
  effectiveType?: string;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
}

interface NavigatorExtended extends Navigator {
  connection?: NavigatorConnection;
}

declare const navigator: NavigatorExtended;
import { useRevalidator } from "react-router";
import { useSyncExternalStore } from "react";

// Check if user is online/offline
//1. handle lack of internet connection
function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("online", callback);
      window.addEventListener("offline", callback);
      return () => {
        window.removeEventListener("online", callback);
        window.removeEventListener("offline", callback);
      };
    },
    () => navigator.onLine,
    () => true
  );
}

// Check if tab is visible or not
//3. stop when inactivde
function useVisibilityState() {
  return useSyncExternalStore(
    (callback) => {
      document.addEventListener("visibilitychange", callback);
      return () => document.removeEventListener("visibilitychange", callback);
    },
    () => document.visibilityState,
    () => "visible"
  );
}

// Detect connection speed (if browser supports it)
// Network Information API :https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
//4, connect status and interval spd.
function useConnectionSpeed() {
  return useSyncExternalStore(
    (callback) => {
      const connection = navigator.connection;
      if (!connection) return () => {};
      connection?.addEventListener?.("change", callback);
      return () => connection?.removeEventListener?.("change", callback);
    },
    () => navigator.connection?.effectiveType ?? "4g",
    () => "4g"
  );
} //stop when app inactive

//2. update effect consider o nlinestatus
//3. stop when inactivde
export function OnlineManager() {
  const { revalidate } = useRevalidator();
  const online = useOnlineStatus();
  const visible = useVisibilityState();
  const speed = useConnectionSpeed();

  useEffect(() => {
    if (!online || visible === "hidden") return;

    const interval = setInterval(revalidate, speed === "4g" ? 1000 : 5000);
    return () => clearInterval(interval);
  }, [online, visible, speed, revalidate]);

  return null;
}
