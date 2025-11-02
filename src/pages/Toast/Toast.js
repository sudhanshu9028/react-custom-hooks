import { Link } from "react-router-dom";
import useNotification from "../../customHooks/use-notification";
import s from "./Toast.module.css";

const Toast = () => {
  const [NotificationComp, triggerNotification] = useNotification();

  return (
    <div>
      <Link to="/" className={s.backLink}>
        ← Back to Home
      </Link>
      <div className={s.container}>
        <h1>Toast Buttons</h1>
        <div className={s.btnClass}>
          <button
            className={s.btn}
            onClick={() =>
              triggerNotification("success", "notification successful")
            }
          >
            Show Success
          </button>
          <button
            className={s.btn}
            onClick={() => triggerNotification("info", "some info")}
          >
            Show Info
          </button>
          <button
            className={s.btn}
            onClick={() => triggerNotification("warning", "warning")}
          >
            Show Warning
          </button>
          <button
            className={s.btn}
            onClick={() => triggerNotification("error", "Error bhai")}
          >
            Show Error
          </button>
        </div>
        {/* <div className={s.notifications}>
            {notifications.map((noti, index)=>{
                return <div key={`${index*Math.random()*10}-${noti.color}`} style={{ backgroundColor:`${noti.color}` }} className={s.noti}>{noti.text}</div>
            })}
        </div> */}
        <NotificationComp styles={s} />
      </div>
    </div>
  );
};

export default Toast;
