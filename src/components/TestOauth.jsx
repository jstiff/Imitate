import React , {useState, useEffect} from 'react';
import io from 'socket.io-client';
import OAuth from './oAuth';
import Loading from './Loading';
import { API_URL } from './config'
import './AppTest.css';
const socket = io(API_URL)
const providers = ['github']


export default TestOauth =>  {
  
	const [page, setPage] = useState({
		loading: true
	      })
	
        useEffect((
		fetch(`${API_URL}/wake-up`)
	    .then(res => {
	      if (res.ok) {
		setPage({ loading: false })  
	      }
	    })
	))
	
	
	  const buttons = (providers, socket) => 
	    providers.map(provider => 
	      <OAuth 
		provider={provider}
		key={provider}
		socket={socket}
	      />
	    )
	  
	  return (
	    <div className='wrapper'>
	      <div className='container'>
		{page.loading
		  ? <Loading />
		  : buttons(providers, socket)
		}
	      </div>
	      
	    </div>
	  )
	
      }