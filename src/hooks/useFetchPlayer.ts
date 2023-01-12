import getPlayer from "helpers/getPlayer";
import { useState, useEffect } from "react";
import { IUser } from "types/models";

const initialPlayer: IUser = {
	name: "Louis", image: "src/assets/pingu.png", coalition: "Federation",
	score: 666, games: 66, wins: 66, ratio: 1, achievements: [], id: 9999
};

const useFetchPlayer = (id?: number) => {
	const [player, setPlayer] = useState<IUser>(initialPlayer);

	const fetchPlayer = async () => {
		const player = await getPlayer(id);
		if (player)
			setPlayer(player);
	};

	useEffect(() => {
		fetchPlayer();
	}, [id]);

	return player;
}

export default useFetchPlayer;
