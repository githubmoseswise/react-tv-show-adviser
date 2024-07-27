import TVShowListItem from "../TVShowListItem/TVShowListItem";
import s from "./style.module.css";

function TVShowList({ TVShowList, onClickItem }) {
  return (
    <>
      <div className={s.title}> Vous pouvez aussi aimer :</div>
      <div className={s.list}>
        {TVShowList.map((tvShow) => {
          return (
            <span key={tvShow.id} className={s.tv_show_list_item}>
              <TVShowListItem onClick={onClickItem} tvShow={tvShow} />
            </span>
          );
        })}
      </div>
    </>
  );
}

export default TVShowList;
