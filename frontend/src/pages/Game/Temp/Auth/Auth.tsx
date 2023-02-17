import React, {useEffect, useRef, useState} from 'react';
import {redirect, Router, useNavigate} from 'react-router-dom';
import {Form, Input, Label} from './Auth.styles';

export function getJwtToken() {
	return sessionStorage.getItem('jwt');
}

export function setJwtToken(token: string) {
	sessionStorage.setItem('jwt', token);
}

export function Auth({className}: any) {
	const [state, setState] = useState('');
    const navigate = useNavigate();
    const navigateRef = useRef(navigate);

    useEffect(() => {
        navigateRef.current = navigate;
    }, [navigate])

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		console.log(`Submit value - [${state}]`);
		setJwtToken(state);
        navigateRef.current('/game');
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setState(event.currentTarget.value);
	}

	return (
		<div className={className}>
			<Form onSubmit={handleSubmit}>
				<Label>
					Username:
					<Input
						type="text"
						name="username"
						value={state}
						onChange={handleChange}
					/>
				</Label>
				<Input type="submit" value="Submit" />
			</Form>
		</div>
	);
};
