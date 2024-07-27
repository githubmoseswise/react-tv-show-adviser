import React from "react";
import { Search as SearchIcon } from "react-bootstrap-icons";
import s from "./style.module.css"

function SearchBar({onSubmit}) {

  function submit(e) {
    if (e.key=== "Enter" && e.target.value.trim() !== "") {
      onSubmit(e.target.value);
    }
  }
  return (
    <>
      <SearchIcon size={27} className={s.icon}/>
      <input
        onKeyUp={submit}
        type="text"
        placeholder="Recherche un film que tu peux aimer"
        className={s.input}
      />
    </>
  );
}

export default SearchBar;
