import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'

import './styles.css'

const url = 'https://v2.jokeapi.dev/joke/Any'

const Home = props => {
  const [twoPartjoke, setTwoPartJoke] = useState({})
  const [singlejoke, setSingleJoke] = useState('')

  const [showDelivery, setShowDelivery] = useState(false)

  const fetchingJoke = async () => {
    const response = await fetch(url)

    //   console.log(response)

    if (response.ok) {
      const data = await response.json()
      if (data.type === 'twopart') {
        setTwoPartJoke({
          setup: data.setup,
          delivery: data.delivery,
        })
      } else if (data.type === 'single') {
        const newJoke = data.joke
        setSingleJoke(newJoke)
      }
    }
  }

  useEffect(() => {
    fetchingJoke()
  }, [])

  const sendJoke = () => {
    if (singlejoke) {
      return <p className="single-joke-text">{singlejoke}</p>
    }

    return (
      <>
        {twoPartjoke.setup && (
          <div className="bg">
            <p className="setup">{twoPartjoke.setup}</p>
            {!showDelivery && (
              <button
                className="delivery-btn btn"
                onClick={() => setShowDelivery(!showDelivery)}
                type="button"
              >
                show delivery ?
              </button>
            )}
            {showDelivery && <p className="delivery">{twoPartjoke.delivery}</p>}
          </div>
        )}
      </>
    )
  }

  const logout = () => {
    const {history} = props

    Cookies.remove('currUser')
    history.replace('/login')
  }

  //   console.log(joke)

  return (
    <main className="jokes-container">
      <button type="button" className="log-out-btn btn" onClick={logout}>
        Logout
      </button>
      <div className="card-container">{sendJoke()}</div>
      <button type="button" onClick={fetchingJoke} className="delivery-btn btn">
        New Joke
      </button>
    </main>
  )
}

export default Home
