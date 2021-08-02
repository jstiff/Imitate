import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { API_URL } from './config'

export default OAuth = (props) =>  {
  
	const [user, setUser] = useState({
		user: {},
		disabled: ''
	      });
  


	      useEffect(() =>{
		const { socket:any, provider:any } = props;
		socket.on(provider, user => {  
			popup.close()
			setUser( (prevUserState) => (
				{
				...prevUserState, 
				user: {user},
				})
		      )
		
	      });
  

  const checkPopup = () => {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        setUser((prevState) => (
		{
		...prevState, 
		 disabled: '',
		}));
      }
    }, 1000)
  }

  const openPopup = () => {
    const { provider, socket } = props;
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

 const startAuth = () => {
    if (!user.disabled) {
      popup = this.openPopup()  
      checkPopup()
      setUser((prevState) => (
	      {
	      ...prevState,      
	      disabled: 'disabled'
	}));
    }
  }

const closeCard = () => {
    setUser((prevState) => ({
	...prevState,     
	user: {}
}));
  }

  
const { name, photo} = user;
const { provider } = props;
const { disabled } = user;
const atSymbol = provider === 'twitter' ? '@' : ''
    
    return (
      <div>
        {name
          ? <div className='card'> 
              <img src={photo} alt={name} />
              <FontAwesome
                name='times-circle'
                className='close'
                onClick={closeCard}
              />
              <h4>{`${atSymbol}${name}`}</h4>
            </div>
          : <div className='button-wrapper fadein-fast'>
              <button 
                onClick={startAuth} 
                className={`${provider} ${disabled} button`}
              >
                <FontAwesome
                  name={provider}
                />
              </button>
            </div>
        }
      </div>
    )
  }


OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
};
