import { Grid, Input, Text } from '@nextui-org/react'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react';
import { Layout } from '../components/layouts/';
import urlApi from '../api/urlApi';

const HomePage: NextPage = () => {

	const [urlOriginal, setUrlOriginal] = useState('');
	const [isCreated, setIsCreated] = useState(false)
	const [shortUrl, setShortUrl] = useState('')

	const submit = async (e: React.FormEvent) => {

		e.preventDefault();
		const {data} = await urlApi.post('/url', {
			originalUrl: urlOriginal,
		});

		setIsCreated(true);
		setShortUrl(data.url)

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
							<Text h3>{shortUrl}</Text>
						</Grid>
					) || (
						<Grid css={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<Text h2>WELCOME TO URL SHORTENER</Text>
							<form onSubmit={(e) => submit(e)}>
								<Input width={'500px'}
									onChange={(e) => setUrlOriginal(e.target.value)}
									value={urlOriginal}
									css={{ marginTop: 30 }}
									placeholder="Enter URL" />
							</form>
						</Grid>
					)
				}
			</Layout>
		</>
	)
}


export default HomePage
