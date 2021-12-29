import React, { useState } from 'react';
import styled from 'styled-components';
import { Magic } from 'magic-sdk';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
// import API from '../utils/Api';
import axios from 'axios';

const Test: React.FC = () => {
	const navigate = useNavigate();
	if (document.cookie && document.cookie.includes('authed')) {
		console.log('hey');
		window.location.href = '/dashboard/organizer';
	}
	const [formData, setFormData] = useState({ email: '' });
	const inputHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY);
		console.log(process.env);
		if ('pk_live_72F52D0476CE882A') {
			const did: string | null = await new Magic(
				'pk_live_72F52D0476CE882A'
			).auth.loginWithMagicLink({ email: formData.email });

			// const res = await API.post('/auth/organization', {
			// 	headers: {
			// 		Authorization: `BEARER ${did}`
			// 	}
			const res = await axios.post('/auth/organization', {
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:3000',
					Authorization: `BEARER ${did}`
				}
			});
			// });
			console.log(res);
			if (res.data.ok) {
				navigate('/dashboard/organizer');
			}
			console.log(res.data);
		}
		console.log(formData);
	};
	return (
		<>
			<Helmet>
				<script>
					{
						"if(document.cookie && document.cookie.includes('authed')) {window.location.href = '/dashboard'}"
					}
				</script>
			</Helmet>
			<Container>
				<HeaderContainer>
					<Header>Organization Sign Up</Header>
					{JSON.stringify(process.env)}
				</HeaderContainer>
				<FormContainer onSubmit={submitHandler}>
					<Label>Email</Label>
					<InputField name="email" onChange={inputHandler} />
					<SubmitButton type="submit">Submit</SubmitButton>
				</FormContainer>
			</Container>
		</>
	);
};

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HeaderContainer = styled.div`
	width: 100%;
	/* padding-left: 30px; */
`;
const Header = styled.p`
	font-size: 2.5rem;
	font-weight: bold;
	margin-left: 30px;
`;

const FormContainer = styled.form`
	display: flex;
	padding: 3rem;
	display: flex;
	flex-direction: column;
	width: max-content;
	/* align-items: center;
	justify-content: center; */
`;

const Label = styled.p`
	font-size: 1.3rem;
	font-weight: bold;
	margin: 5px;
`;

const InputField = styled.input`
	border-style: none;
	border: solid #000000 1px;
	padding: 3px;
	border-radius: 3px;
	margin: 8px 15px 15px 15px;
	padding: 8px;
	font-size: 1.057rem;
`;
const SubmitButton = styled.button`
	border-style: none;
	background-color: #3e43b0;
	padding: 4px;
	border-radius: 5px;
	color: white;
	font-size: 1.2rem;
	margin: 5px 55px;
	padding: 5px 0;
	cursor: pointer;
	&:hover {
		background-color: #656ac9;
	}
`;

export default Test;
