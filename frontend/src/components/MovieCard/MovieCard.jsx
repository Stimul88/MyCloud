import "./movieCard.css"

export function MovieCard({props, onChoice, onAdd}) {

  return (
    <>
      <div className="movie">
        <h1>{props.Title}</h1>
        <img className={"img"}
             src={props.Poster}
             alt={props.Title}
             onClick={onChoice}
        />
        <h2>{props.Year}</h2>
      </div>
      <hr/>
    </>
  )
}


