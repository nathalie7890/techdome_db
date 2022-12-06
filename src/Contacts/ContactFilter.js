import { styles } from "./styles/ContactFilter.styles";

export default function ContactFilter({ filters, setFilters }) {
  return (
    <div className={styles.mainContainer}>
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "" })}
        className={styles.all}
      >
        All
      </button>
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "isAdmin" })}
        className={styles.admin}
      >
        Admin
      </button>
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "notAdmin" })}
        className={styles.nonAdmin}
      >
        Non-Admin
      </button>
    </div>
  );
}
