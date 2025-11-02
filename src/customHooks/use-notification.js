import { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";

const ICONS = {
  success: <AiOutlineCheckCircle />,
  error: <AiOutlineCloseCircle />,
  info: <AiOutlineInfoCircle />,
  warning: <AiOutlineWarning />,
};

const COLORS = {
  success: "#05DF72",
  error: "#F64437",
  info: "#51A2FF",
  warning: "#FDC745",
};

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  //   const timer = useRef(null);

  const triggerNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      icon: ICONS[type],
      color: COLORS[type],
      fading: false,
      animate: true,
    };
    setNotifications((prev) => {
      const updatedNotifications = [newNotification, ...prev];
      if (updatedNotifications.length > 6) {
        updatedNotifications.pop(); // Remove the oldest notification
      }
      return updatedNotifications;
    });
    // clearTimeout(timer.current);
    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((noti) => {
          if (noti.id === newNotification.id) {
            return { ...noti, animate: false };
          }
          return noti;
        })
      );
    }, 300);
    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((noti) => {
          if (noti.id === newNotification.id) {
            return { ...noti, fading: true };
          }
          return noti;
        })
      );
    }, 2500);
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((noti) => noti.id !== newNotification.id)
      );
    }, 3000);
  };
  const NotificationComp = ({ styles }) =>
    notifications.length ? (
      <>
        <div className={styles.notifications}>
          {notifications.map((noti, index) => {
            return (
              <div
                key={`${index * Math.random() * 10}-${noti.color}`}
                style={{ backgroundColor: `${noti.color}` }}
                className={`${styles.noti} ${noti.animate? styles.slideIn : ""} ${
                  noti.fading ? styles.fadeOut : ""
                }`}
              >
                <span style={{ marginRight: "10px", fontSize: "20px" }}>
                  {noti.icon}
                </span>
                {noti.message}
              </div>
            );
          })}
        </div>
      </>
    ) : null;

  return [NotificationComp, triggerNotification];
};

export default useNotification;
