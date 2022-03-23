import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { FC } from 'react'
import urlApi from '../api/urlApi';
import { useEffect } from 'react';


const URLRedirect = () => {

	const router = useRouter()
	const { shortUrl } = router.query;

	const getdata = async () => {

		const {data} = await urlApi.get(`/url/${shortUrl}`)

		window.location.href = data.url.originalUrl

	}

	useEffect(() => {
	  
		if(shortUrl){
			getdata()
		}

	}, [shortUrl])
	
	
	return (
		<div style={{padding:50, fontSize:25}}>Cargando...</div>
	)
}

export default URLRedirect