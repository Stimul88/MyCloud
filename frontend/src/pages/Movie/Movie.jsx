import {useDispatch, useSelector} from "react-redux";
import {MovieCard} from "../../components";
// import {fetchCards} from "../../store/auth";
import {useNavigate} from "react-router-dom";

export function Movie() {
  const { allCards, loading, error } = useSelector((state) => state.imdb);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // const choice = (idNumber) => {
  //   navigate('/card');
  //   dispatch(fetchCards(`i=${idNumber}`))
  // }

  return (
    <>
      {/*{loading && <h4>Loading...</h4>}*/}
      {/*{error && <h4>{error}</h4>}*/}
      {/*{allCards.Search*/}
      {/*  ? allCards.Search.map(item =>*/}
      {/*    <MovieCard*/}
      {/*      key={item.imdbID}*/}
      {/*      props={item}*/}
      {/*      onChoice={()=> choice(item.imdbID)}*/}
      {/*    />)*/}
      {/*  : "Empty"}*/}
    </>
  )
}

