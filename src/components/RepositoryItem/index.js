import './index.css'

const RepositoryItem = props => {
  const {RepositoryEachItem} = props
  const {
    name,

    starsCount,
    issuesCount,
    avatarUrl,
    forksCount,
  } = RepositoryEachItem

  return (
    <li className="repository-card">
      <img src={avatarUrl} className="image-element" alt={name} />
      <h1 className="head">{name}</h1>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          className="icon-image"
          alt="stars"
        />
        <p>{starsCount}</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          className="icon-image"
          alt="forks"
        />
        <p>{forksCount}</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          className="icon-image"
          alt="open issues"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
