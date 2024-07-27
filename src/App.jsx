import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import "./global.css";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import TVShowDetail from "./components/TVShowDetail/TVShowDetail";
import Logo from "./components/Logo/Logo";
import logoImage from "./assets/images/logo.png";
import TVShowList from "./components/TVShowList/TVShowList";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {

  console.log('API Key:', process.env.REACT_APP_API_KEY_PARAM);

  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, SetRecommendationList] = useState([]);

  async function fetchPopulars() {
    try {
      const populars = await TVShowAPI.fetchPopulars();

      if (populars.length > 0) {
        setCurrentTVShow(populars[0]);
      }
    } catch (error) {
      alert("Erreur durant la recherche des séries populaires" + error.message);
    }
  }

  async function fetchRecommendations(tvShowId) {
    try {
      const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);

      if (recommendations.length > 0) {
        SetRecommendationList(recommendations.slice(0, 10));
      }
    } catch (error) {
      alert("Erreur durant la recherche des séries populaires");
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  async function searchTVShow(tvShowName) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (error) {
      alert("Erreur durant la recherche des séries populaires");
    }
  }

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <div className="logo">
              <Logo
                title="MosesWatch"
                subtitle="Trouvez un film qui pourrait vous plaire"
                image={logoImage}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4">
            <SearchBar onSubmit={searchTVShow} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommendations}>
        {recommendationList && recommendationList.length > 0 && (
          <TVShowList
            onClickItem={setCurrentTVShow}
            TVShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}

export default App;
