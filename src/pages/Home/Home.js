import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const examples = [
    { title: "Toast Notification (useNotification Hook)", path: "/toast" },
    // Add new examples easily later
  ];

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.heading}>Custom Hooks Examples</h1>
      <div className={styles.linksContainer}>
        {examples.map((ex, i) => (
          <Link key={i} to={ex.path} className={styles.exampleLink}>
            {ex.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
