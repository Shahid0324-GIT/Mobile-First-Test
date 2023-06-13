import {useState} from 'react'
import {Redirect} from 'react-router-dom'

// *************** Styles ***************
import './styles.css'

// *************** Cookies ***************
import Cookies from 'js-cookie'

// *************** Dummy User Details ***************
import data from '../../data'

const Login = props => {
  const [showUsers, setShowUsers] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // console.log(data)

  const onSubmitHandler = e => {
    e.preventDefault()
    // console.log('form submitted')
    const {history} = props
    const loginUser = data.find(user => user.username === username)
    const isPasswordMatch = loginUser.password === password
    console.log(loginUser)
    // console.log(history)

    if (loginUser && isPasswordMatch) {
      Cookies.set('currUser', loginUser.username, {expires: 30})
      history.replace('/')
    }
  }

  const onUsernameChange = e => {
    setUsername(e.target.value)
  }

  const onPasswordChange = e => {
    setPassword(e.target.value)
  }

  const currUser = Cookies.get('currUser')

  if (currUser) {
    return <Redirect to="/" />
  }

  return (
    <>
      <section className="dummy-details">
        <button
          type="button"
          className="dummy-button"
          onClick={() => {
            setShowUsers(!showUsers)
          }}
        >
          open sesame!
        </button>

        {showUsers && (
          <div
            className={
              showUsers ? 'dummy-user-details' : 'hide dummy-user-details'
            }
          >
            {data.map(user => (
              <div key={user.id} className="user-container">
                <p className="username">
                  Username: <span>{user.username}</span>
                </p>
                <p className="password">
                  Password: <span>{user.password}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <main>
        <div className="form-container">
          <div className="side-image-container">
            <img
              src="https://images-platform.99static.com/87lguXRO4xvGT_Lp_Ud2kpSTPOg=/500x500/top/smart/99designs-contests-attachments/39/39236/attachment_39236428"
              alt="joke"
              className="side-image"
            />
          </div>

          <div className="login-container">
            <img
              src="https://logos.textgiraffe.com/logos/logo-name/Joke-designstyle-boots-m.png"
              alt="joke"
              className="logo"
            />

            <form className="details-container" onSubmit={onSubmitHandler}>
              <label className="label" htmlFor="user-input">
                username
              </label>
              <input
                id="user-input"
                className="input"
                placeholder="Username"
                onChange={onUsernameChange}
                value={username}
                type="text"
              />
              <label className="label" htmlFor="pass-input">
                password
              </label>
              <input
                id="pass-input"
                className="input"
                placeholder="Password"
                onChange={onPasswordChange}
                value={password}
                type="password"
              />

              <button className="submit-btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Login
