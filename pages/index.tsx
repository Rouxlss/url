import { Button, Grid, Input, Loading, Text } from '@nextui-org/react'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react';
import { Layout } from '../components/layouts/';
import urlApi from '../api/urlApi';

const HomePage: NextPage = () => {

	const [urlOriginal, setUrlOriginal] = useState('');
	const [isCreated, setIsCreated] = useState(false);
	const [shortUrl, setShortUrl] = useState('AA');
	const [isLoading, setisLoading] = useState(false);
	const [copy, setCopy] = useState(false)

	const submit = async (e: React.FormEvent) => {

		e.preventDefault();
		if (urlOriginal.length > 0) {

			const { data } = await urlApi.post('/url', {
				originalUrl: urlOriginal,
			});

			setisLoading(true);
			setIsCreated(true);

			setTimeout(() => {
				setShortUrl(data.url);
			}, 1000);

		}

	}

	const copyText = () => {

		if(copy == false) {
			setCopy(true);
		}

		setTimeout(() => {
			setCopy(false);
		}, 1000);

		navigator.clipboard.writeText(shortUrl);
	}

	useEffect(() => {

		if (shortUrl.length > 0) {
			setisLoading(false);
		}

	}, [shortUrl])


	const createUrl = () => {
		setCopy(false);
		setIsCreated(false);
		setShortUrl('')
		setUrlOriginal('')
	}

	return (
		<>
			<Layout>
				<>
				{
					isCreated && (
						<Grid xs={10} sm={8} md={6} lg={4} css={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							margin: 'auto',
							height: '70vh'
						}}>
							<div style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}>
							<Text css={{textAlign: 'center'}} h2>HERE IS YOUR URL</Text>
							{
								!isLoading && (
									<Text 
										className='url-short'
										blockquote
										onTouchStart={copyText}
										onClick={copyText}
										css={{
										cursor: 'pointer',
										textAlign:'center',
										margin: 'auto' ,
										fontSize: '25px',
										textGradient: "45deg, $blue500 -20%, $pink500 50%",
									}}>{shortUrl}</Text>
								) || (
									<Loading color={'secondary'} size="lg" />
								)
							}
							<Button
								onClick={createUrl}
								color='gradient'
								ghost css={{ marginTop: 20 }}>
								Create another url
							</Button>
							</div>
							{
								copy && (
									<Text style={{width: 150, textAlign: 'center', marginTop: 20}} blockquote>Url Copied!</Text>
								)
							}
						</Grid>
					) || (
						<Grid xs={10} md={6} lg={3} css={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							margin: 'auto'
						}}>
							<form onSubmit={(e) => submit(e)} style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}>
								<Input
									onChange={(e) => setUrlOriginal(e.target.value)}
									value={urlOriginal}
									css={{ marginTop: 30 }}
									placeholder="Enter URL" />
								<Button type='submit'
									color='gradient'
									ghost css={{ marginTop: 20 }}>
									Create URL
								</Button>
							</form>
						</Grid>
					)
				}
				
				</>
			</Layout>
		</>
	)
}


export default HomePage
