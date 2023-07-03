import './index.css'

const LanguageFilterItem = props => {
  const {languageData, onClickButton} = props

  const onClickButtonOp = id => {
    onClickButton(id)
  }

  return (
    <li>
      <button
        type="button"
        className="button"
        onClick={() => onClickButtonOp(languageData.id)}
      >
        {languageData.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
