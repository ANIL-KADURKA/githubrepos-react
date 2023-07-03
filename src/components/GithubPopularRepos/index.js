import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,
    activeRepository: [],
    result: '',
  }

  componentDidMount() {
    this.getLanguageData()
  }

  onClickButton = id => {
    this.setState(
      {
        activeLanguage: id,
      },
      this.getLanguageData,
    )
  }

  getLanguageData = async () => {
    const {activeLanguage} = this.state

    this.setState({
      result: '',
    })

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
      }))

      this.setState({
        activeRepository: updatedData,
        result: 'SUCCESS',
      })
    } else {
      this.setState({
        result: 'FAILURE',
        activeRepository: [],
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderCardsContainer = () => {
    const {activeRepository} = this.state
    return (
      <ul className="cards-container">
        {activeRepository.map(each => (
          <RepositoryItem key={each.id} RepositoryEachItem={each} />
        ))}
      </ul>
    )
  }

  renderFailImage = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderTheFinal = () => {
    const {result} = this.state
    switch (result) {
      case 'SUCCESS':
        return this.renderCardsContainer()
      case 'FAILURE':
        return this.renderFailImage()
      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <div className="github-container">
        <h1>Popular</h1>
        <ul className="buttons-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              onClickButton={this.onClickButton}
              languageData={each}
              key={each.id}
            />
          ))}
        </ul>
        {this.renderTheFinal()}
      </div>
    )
  }
}

export default GithubPopularRepos
