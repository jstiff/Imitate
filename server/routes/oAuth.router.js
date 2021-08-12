const express = require("express");
const url = require('url');
const router = express.Router();
const config = require("../config");
const FormData = require("form-data");
const fetch = require("node-fetch");
const axios = require("axios");
const cors = require('cors');
const { client_id, redirect_uri, client_secret, proxy_url, loaded } = require("../config");

router.get("/userState", (req,res) => {
	
	const initialState = {
	client_id,
	redirect_uri,
	proxy_url,
	loaded	
      };
      
      res.send(initialState);
      
      })
router.get("/", cors(), (req,res)=> {
	// trying to initiate the oAuth process from here, but having no luck!!!


	const oAuth_url = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}`;
	
	axios.get(oAuth_url, {headers: {
		"Access-Control-Allow-Origin" : "*",
		"Content-type": "Application/json",
		'Accept': "application/json",
		}   
	    }).then((response) => {
		console.log("AXIOS GET")
		res.redirect(url.format({
			pathname:"authenticate/login/callback",
			query:response,
		}));
	}).catch(error => console.log("FUCKING ERROR", error))

	
	
	// const getCode = async () => {
	// 	try {
	// 	let temp = await axios.get(oAuth_url)
	// 	console.log('INSIDE GETCODE', temp)
	// 	  return temp
	// 	} catch (error) {
	// 	  console.error(error)
	// 	}
	//       }
	//       res.redirect(url.format({
	// 	 	pathname:"authenticate/login/callback",
	// 	 	query:getCode(),
	// 	}));
})

router.post("/login/callback", cors(), (req, res) =>  {
	       
		const {code} = req.body;
		
		if(!code){
			return res.send({
				success: false, 
				message: "Error, req.body has no code object"
			});
	
		}
			
		
			
		
	
	      
		const data = new FormData();
		
		data.append("client_id", client_id);
		data.append("client_secret", client_secret);
		data.append("code", code);
		data.append("redirect_uri", redirect_uri);
	
	
		
		// Request to exchange code for an access token
		
		  fetch(`https://github.com/login/oauth/access_token`, {
			   method: "POST",
			    body: data,
		}).then((response) => {
			return response.text()
			 })
		  .then((paramsString) => {
	            
		    let params = new URLSearchParams(paramsString);
		    const access_token = params.get("access_token");
		    
		    // Request to return data of a user that has been authenticated
		    return fetch(`https://api.github.com/user`, {
			headers: {
			  Authorization: `token ${access_token}`,
			},
		      });
		    })
		  .then((response) =>  response.json())
		  .then((response) => {
			  
		     return res.status(200).json(response);
		  })
		  .catch((error) => {
		    return res.status(400).json(error);
	
		});
	        
	});


module.exports = router;


