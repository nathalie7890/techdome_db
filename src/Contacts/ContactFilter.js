import { style } from "./styles/ContactFilter.styles";

export default function ContactFilter({ filters, setFilters }) {
  return (
    <div className={style.mainContainer}>
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "" })}
        className={style.all}
      >
        All
      </button>
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "isAdmin" })}
        className={style.admin}
      >
        Admin
      </button>
      <button
        onClick={() => setFilters({ ...filters, isAdmin: "notAdmin" })}
        className={style.nonAdmin}
      >
        Non-Admin
      </button>
    </div>
  );
}
