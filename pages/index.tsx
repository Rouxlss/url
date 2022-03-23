import { Button, Grid, Input, Text } from '@nextui-org/react'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react';
import { Layout } from '../components/layouts/';
import urlApi from '../api/urlApi';

const HomePage: NextPage = () => {

	const [urlOriginal, setUrlOriginal] = useState('');
	const [isCreated, setIsCreated] = useState(false)
	const [shortUrl, setShortUrl] = useState('AA')

	const submit = async (e: React.FormEvent) => {

		e.preventDefault();
		if (urlOriginal.length > 0) {
			const { data } = await urlApi.post('/url', {
				originalUrl: urlOriginal,
			});

			setIsCreated(true);
			setShortUrl(data.url)
		}

	}

	const createUrl = () => {
		setIsCreated(false);
		setShortUrl('')
		setUrlOriginal('')
	}

	return (
		<>
			<Layout>
				{
					isCreated && (
						<Grid css={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<Text h2>HERE IS YOUR URL</Text>
							<Text css={{
								textGradient: "45deg, $blue500 -20%, $pink500 50%",
							}} h3>{shortUrl}</Text>
							<Button
								onClick={createUrl}
								color='gradient'
								ghost css={{ marginTop: 20 }}>
								Create another url
							</Button>
						</Grid>
					) || (
						<Grid css={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<form onSubmit={(e) => submit(e)} style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}>
								<Input width={'500px'}
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
			</Layout>
		</>
	)
}


export default HomePage
