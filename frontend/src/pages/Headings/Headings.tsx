import useFetchFriendsOf from 'hooks/useFetchFriendsOf';
import useFetchUserByName from 'hooks/useFetchUserByName';
import {backend} from 'lib/backend';
import styled from 'styled-components';
import * as F from 'styles/font.styles';

const Headings = () => {
	// console.log('ONE ');
	// data?.map((friend) => {
	// 	console.log('friend: ', friend.name);
	// });

	console.log('TWO ');
	backend.addFriend('Loader', 'louis');
	// backend.removeFriend('Loader', 'louis');
	let {data} = useFetchFriendsOf('Loader');
	data?.map((friend) => {
		console.log('friend: ', friend.name);
	});

	// console.log('THREE ');
	// data?.map((friend) => {
	// 	console.log('friend: ', friend.name);
	// });

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<F.H1>Test Page</F.H1>
		</div>
	);
};

export default Headings;
