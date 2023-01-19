import React, {ChangeEventHandler, useState} from 'react';
import * as S from './EditName.styles';
import * as F from 'styles/font.styles';
import * as UI from 'styles/buttons.styles';

const EditName = () => {
	const [value, setValue] = useState('');

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		console.log(value);
	};

	return (
		<S.FormContainer onSubmit={handleSubmit}>
			<S.InputContainer>
				<F.Text weight="600">Choose a nickname*</F.Text>
				<S.Input
					type="text"
					value={value}
					onChange={handleChange}
					placeholder="Enter your nickname"
					maxLength={8}
					minLength={2}
					required
				/>
			</S.InputContainer>
			<UI.SecondaryButton type="submit">Continue</UI.SecondaryButton>
		</S.FormContainer>
	);
};

export default EditName;
