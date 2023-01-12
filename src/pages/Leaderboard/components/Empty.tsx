import ButtonURL from 'components/ButtonURL';

const Empty = () => {
	return (
		<div className="empty">
			<p className='empty__title'>No player is registered in the leaderboard yet</p>
			<div className='empty__redirect'>
				<ButtonURL text="Play" url="/" />
				<p className='empty__redirect__text'>and you'll be here !</p>
			</div>
		</div>
	);
}

export default Empty;
