# Functional specifications or how works or ft_transcendance from 42 school
Here we are going to explain all the functionnalities of our project ft_transcendance from a user perspective.

# Why are we doing that?

We need to define all the user behavior on our website, from where the user tries to connect to the use of the chat. We also need to be sure we don't miss something in our design.

# Overview Global of the project

We need to create a website with the following usages :
- Registration through 42 API (that means we have to sign in via 42 to connect to our website).
- A chat to discuss with people, conversation groups.
- A social page with friends and people you blocked.
- The Pong game : be able to play to the famous pong game.
- Spectate the pong game.
- A statistic page with information about the player, the global leaderboard and other informations.
- A setting page to change the nickname, the profile picture and enable 2FA.

# Who is involved in this project
- Robin Collas: Full stack developer
- Vincent Bachelet: Full stack developer
- Antoine Rolland: Full stack developer
- Louis Raffin: Full stack developer

# Summary
1. [LANDING PAGE](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#Landing-page)
2. [REGISTRATION](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#Registration-page)
3. [DOUBLE FACTOR AUTHENTICATION](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#Double-Factor-Authentication-page)
4. [PLAY](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#Play-page)
5. [MENU](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#The-menu)
6. [PONG GAME](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#the-pong-game-page)
7. [SPECTATE SELECTION](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#spectate-game-selection-page)
8. [SPECTATE GAME](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#spectate-game-page)
9. [LEADERBOARD](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#learderboard)
10. [MY STATS](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#my-stats-pages)
11. [SETTINGS](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#settings-page)
12. [CHAT](https://github.com/vbachele/ft_transcendance_42/blob/main/FunctionalSpecifications.md#chat-page)
	- [The left bar]()
	- [Private message page]()
	- [Channel messages page]()

## Landing Page 

Here is an image of our landing page.
**As user non logged** i am able to interact with the following buttons:
- The red button play:
	When I click on it, I am able to go to the 42 API to connect.
- The login button: 
	When I click on it, I am able to go to the 42 API to connect.
- The moon icon:
	When I click on it, I launch the dark mode.
- The spectate button:
	When I click on it, I go the the spectate Game selection page (Link to the spectate part)

## Registration page 
 
**As a non logged** user after connecting to the 42 API, this page aims to finalize the registration to the website. 
- The profil picture icon: 
	By default, you have the one from 42 school.
	When I click on the icon, I can upload from my computer a new icon, the size of the icon will be automatically cropped, It is not mandatory.  

- Choose a nickname field: 
	You have to choose a nickmane, 8 caracters maximum, this part is mandatory to go to the next page. 

- The moon icon: 
	When I click on it, I launch the dark mode.  

- The spectate button: 
	When I click on it, I go the spectate Game selection page (Link to the spectate part)  

- The button "Continue": 
	- If you enter a valid nickname, you can go to the next page.
	- If you don't have a valid nickname or you don't enter one, you have an error message "please enter a valid nickname".
	- If you entered a nickname already user, you have an error message "nickname already used" 

## Double Factor Authentication page
**As a user who already has an account + enable double factor authentication** you see this page. It aims to add a protection for your account.
- The back button:
	If I click on it, I go to the landing page.  

- The moon icon: 
	When I click on it, I launch the dark mode.  

- The spectate button: 
	When I click on it, I go the spectate Game selection page (Link to the spectate part). 

- The field number: 
	It requires to enter the 6 valid numbers from your authenticator app. 

- The "continue" button:
	- If the 6 digit numbers are valid, you can go the play page.
	- If the 6 digit number are wrong, you have an error message "The code is not valid".

## Play page
**As a user logged**, now I have access to the functionnality of the website
- The "play" button, when I click on it, I am now waiting for a game with a timer a cross in the menu bar:
		- If I click on the cross, I am not waiting for a game anymore
		- If I click on the play button again while I am still waiting for a game, it does not do anything. 

-  The nickname + icon:
		When I click on it, it opens the menu (link to the menu). 
		When I click again on it, it closes the menu. 

- The moon icon: 
		When I click on it, I launch the dark mode. 

## The menu
**As a user logged** you are able a new menu and click on your nickname with your image. The menu contains the following things:
- Play button:
	When I click on it, I am able to launch a wait for a game (link to the wait4game page).
	If I already launched a game, it does not do anything. 

- Spectate button:
	When I click on it, I am going the spectate Game selection page (link to the spectate page). 

- Social button: 
	When I click on it, I am going the social page (link to the social page). 

- Chat button: 
	When I click on it, I am going the chat page (link to the chat page). 

- leaderboard button: 
	When I click on it, I am going the leaderboard page (link to the leaderboard page). 

- Stats button: 
	When I click on it, I am going the Stats page (link to the Stats page). 

- Settings button: 
	When I click on it, I am going the settings page (link to the settings page). 

- Logout:
	It opens a popup to confirm if you want to log out:
	- If you click on the cross or "cancel", the pop up is closed.
	- If you click on "confirm", you will be redirect to the landing page (link to the landing part). 

- Click again on the nickname with your image.
	When I click on it i close the menu.

## The Pong Game Page
**As a user logged** I am able to play the pong game after matching with someone else.
- Menu bar:
	- The moon icon: 
		When I click on it, I launch the dark mode. 
	- 	The nickname + icon: 
		When I click on it, it opens the menu (link to the menu). 
		When I click again on it, it closes the menu. 
- The game: 
	- I can move my bar by using the arrows of my keyboards. 
	- When I scored, the numbers are changing accordingly on the screen. 
	- The first one to be at 10 points wins the game, has a victory, the other one has a defeat. 
	- The first to disconnects to the game looses the game and has a defeat 
	- Once the game is over (by seeing the screen loose or victory), you are redirected to the play game page. 

## Spectate game selection page
**As a user loggedIn or not loggedIn** I can select among the 4 last games started to spectate on this page. 

- Menu bar:
	- The moon icon: 
		When I click on it, I launch the dark mode. 
	- 	The nickname + icon: 
		When I click on it, it opens the menu (link to the menu). 
		When I click again on it, it closes the menu. 

- The game to spectate:
	- The firt one, is the last game started.
		If I click on it I am redirected to the spectate page of this game.
	- Then it is in the order the second one is the second last game started etc..
		If I click on it I am redirected to the spectate page of this game.
	The first game started of the 4 disappears if a new game appears. (because we can only spectate 4 games at the same time)

## Spectate game page
**The difference here is you can be logged in or not**, if you are not logged in you have an image by default and a random username
- Menu bar:
	- The moon icon: 
		When I click on it, I launch the dark mode. 
	- 	The nickname + icon: 
		When I click on it, it opens the menu (link to the menu). 
		When I click again on it, it closes the menu. 

- Game part:
	- I can see the name of the 2 players.
	- It is redirection to the game part, I can't interact with the screen 

- Chat part:
	- I can send and see messages:
		- My messages are red and displayed on the right
		- the messages from the other are grey and displayed on the left.
		- When the screen is full of messages, the oldest one on the top disappears (to approve)
	- About the message itself: 
		- I have the name, picture and the message. If i am not logged in i have a random picture and a random name choose by our team.

## Learderboard
**As a user logged in** I have information about the global leaderboard of the game with information about the player.
- Each player on this page has the following information:
	- Your Rank, this is decided by the number of victory you did.
	- Your name and your profile picture.
	- The number of game you played.
	- Number of wins.
	- Ratio total games played / wins.
	- achievement you have made. 

- Click on a player information
	- You will be redirected directly on the player "My stats" page. 

- Menu bar:
	- The moon icon: 
		When I click on it, I launch the dark mode. 
	- 	The nickname + icon: 
		When I click on it, it opens the menu (link to the menu). 
		When I click again on it, it closes the menu.

## My Stats pages
**As a user logged in** I have personnal game information about the user in this page.
I can see the following information about the user:
- Your nickname
- Your 42 coalition
- You ratio Total game/win
- The number of: 
	- matches
	- wins
	- achievements earns
- Your last matches:
	- The opponent name
	- The score
	- The ratio win / defeat 

- Achievment earned:
	- When I hover with my mouse on one of the achievment, I see information about how to have it. 

- Top 3 players (Not available on mobile version)
	- I see a resume about the top 3 player from the leaderboard
	- If I click on "see full leaderboard", I am redirected to the leaderboard page. 

- Menu bar:
	- The moon icon: 
		When I click on it, I launch the dark mode. 
	- 	The nickname + icon: 
		When I click on it, it opens the menu (link to the menu). 
		When I click again on it, it closes the menu.

## Settings page
**As a user logged in** I can do the following:
- I can click on the profile picture and change my picture
- I can enable the double authentication, it opens a popup to enable the 2FA. When the 2FA is enable the button becomes green.
- I can change my nickname, to approve it, I need to press "enter", A good nickname is 8 caracters maximum.
	- If the nickname is already taken or more than 8 caracters an error message appears: 
		- "Nickname is 8 caracters maximum".
		- "Nickname already used".

- Menu bar:
	- The moon icon: 
		When I click on it, I launch the dark mode. 
	- 	The nickname + icon: 
		When I click on it, it opens the menu (link to the menu). 
		When I click again on it, it closes the menu.

## Chat page
**As a logged in user** I can search, create channels, discuss in channels, give rights to my channels, send direct messages, have more information about a user.
- Menu bar:
	- The moon icon: 
		When I click on it, I launch the dark mode. 
	- 	The nickname + icon: 
		When I click on it, it opens the menu (link to the menu). 
		When I click again on it, it closes the menu.

### The left discussion bar
- The search bar
	- The channel part:
		- I can see the channels i've joined or i was invited, the last one is the first in the list.
		- I click on a channel name, it opens the channel in the center of the screen with the historic of the conversation.
		- If I click on "+" it opens a pop up to create a new channel (explanations below).
	- The creation channel pop up: 
		- If I click on the cross or "cancel button", it closes the channel, 
		- I have to give a name to the channel (xxxx caracters maximum), it is mandatory.
		-  If I click on private channel, the channel will be visible only by the people who were invited.
		- If I choose a password, the channel will require a password to be connected. 
		- If I click on create channel:
			- If the name is good. It creates the channel and the name appears on Ir channel bar.
			- If the name is already taken, I have an error message, "this name is already used". 
			- If the name is too long, I have an error message "the name of the channel is too long".
	- The discussion part: 
		- I can see the private messages, I have the last messages sent or received in first in the list.
		- If I click on a message, it opens the discussion in the center of the screen.
		- If I click on "+" it opens the discussion research bar (montrer image) in the center of the screen, I can search a name. I see my friend first during the search, then the other name, if I have friend in common, I see how many.
		- If have a message waiting from another user, I see it with a number, indicating how many messages are waiting.
		- I clicked on a discussion, the color of the discussion in the bar becomes grey. 

### Chat private message
- The discussion bar (when I open direct message):
	- I can see a bar on top with the following information:
		- Profile picture of the user we discussed to.
		- His nickname.
		- his status: 
			- live
			- Last seen xx min ago (until 60 min).
			- Last seen xx hours ago (between 60 min to 24 hours)
			- Last seen xx days ago (between 24 hours and infinite).
		- When I click on the profile picture or the nickname, it opens a dedicated user bar on the right (see what the user bar does below).
- The messaging part:
	- I can see the day of the message:
		- Today if it is today.
		- "December 6th 2022".
	- I can the message from a user which contains:
		- profile picture
		- nickname
			- messages sent
		- Hour from the message (6:30 pm)
	- Message from the other user are in grey on the left.
	- Message from me are in red on the right.
	- I can send the message with the field bar "message" at the bottom of the page pressing "enter" or click on the arrow of the field messages.
	- The last message are at the bottom, the first message on the top.
	- You can scroll to the top if there are too many messages.

- Right User private message bar:
	Here I can do actions about the user we selected.
	- I can click on the right top cross to close the bar.
	- I can see the nickname + the user profile picture.
	- I can see a lot of options available:
		- The status of the user with the different mark (green, red, or grey).
		- "View profile", when I click on it, I am redirected to the user stat profile
		- "Invite to a game":
			- If the user has a green mark, he will receive an invitation an will have 10 seconds to answer yes/no. If yes, I are redirected to the pong game, if no you can send an invite again.
			- If he has a red mark I can have the following errors:
				- "The user is in a game"
				- "You already have sent an invite"
			- If the user has a grey mark, you have the following errors:
				- "This user is disconnected"
		- "Invite to a channel":
			- I can invite the user to channel which the mode "invitation only" (To be sure about that"). Once invited, the user sees the channels on the left bar side
		- "Add to friend list":
			- If the user is not my friend, I can add him to my friend list.
			- If the user is my friend, I don't see the button "Add to my friend list" to him to my friend list.
		- "Block":
			- If the user is unblocked, I can block him. block a user cause the following actions (TO CONFIRM):
				- I and him can't discuss with each other (Confirm how to do this).
				- I and him can't invite each other game (the button is hidden).
				- I and him can't spectate his game.
				- I and him can't invite each other to a game.


### Chat channel messages
- The channel top bar: 
	Here I can see the name of the channel "#NameOfChannel" and I can perfom the following actions:
	- Click on the arrow button (**need to be administrator to see this option**):
		If I click on it, it opens the channels settings pop up:
		- Channel setting pop up:
			- I can click on the right top cross or "cancel" button to close the pop up:
			- I can change the name of the channel:
				- If there is a channel with the same name, I have an error "This name is already used"
				- If the name of the channel doesn't respect the norm "The name of the channel is too long"
			- I can change the description of the channel:
				- If the description of the channel doesn't respect the norm "The description of the channel is too long".
			- Password field:
				- I can add a password, now If someone wants to join the channel, he has to put the password to connect to it.
				- If the password changed, if a new user wants to join the channel, It has to put the new password.
				- For existing user in the channel, it doesn't change anything.
			- "Change settings" button:
				If I click on it, I can apply all the changes about (name, description, private channel, password). If an error occurs, I have the related error and the changes are not applied.
		
	- Click on the number of channels members
		I can see a pop up with a field research, a list of users and an invite button.
		- I can click on the right top cross or "cancel" button to close the pop up:
		- I can use the search bar to find a user 
		- I can see in the menu of the pop up my friend (TO BE CONFIRMED).
		- If I click on one of those friend I can add hime to the channel. 

	- Leave the channels 
		If I click on the icon of "log out":
		- I immediatly leave the channel.
		- I can't see this channel on the left bar side
		- If the channel doesn't have invite, or password, I can search it and join it again
		- I need to be invited again if it is on invitation only (TO BE CONFIRMED)
		- If the channel has a password, I have to put the password again to join the channel.

- Channel messaging part
	- I can see the day of the message:
		- Today if it is today.
		- "December 6th 2022".
	- I can the message from a user which contains:
		- profile picture
		- nickname
			- messages sent
		- Hour from the message (6:30 pm)
	- Message from the other user are in grey on the left.
	- Message from me are in red on the right.
	- I can send the message with the field bar "message" at the bottom of the page pressing "enter" or click on the arrow of the field messages.
	- The last message are at the bottom, the first message on the top.
	- You can scroll to the top if there are too many messages.

- Right User private message bar:
	Here I can do actions about the user we selected.
	- I can click on the right top cross to close the bar.
	- I can see the nickname + the user profile picture.
	- I can see a lot of options available:
		- The status of the user with the different mark (green, red, or grey).
		- "View profile", when I click on it, I am redirected to the user stat profile
		- "Invite to a game":
			- If the user has a green mark, he will receive an invitation an will have 10 seconds to answer yes/no. If yes, I are redirected to the pong game, if no you can send an invite again.
			- If he has a red mark I can have the following errors:
				- "The user is in a game"
				- "You already have sent an invite"
			- If the user has a grey mark, you have the following errors:
				- "This user is disconnected"
		- "Invite to a channel":
			- I can invite the user to channel which the mode "invitation only" (To be sure about that"). Once invited, the user sees the channels on the left bar side
		- "Add to friend list":
			- If the user is not my friend, I can add him to my friend list.
			- If the user is my friend, I don't see the button "Add to my friend list" to him to my friend list.
		- "Block":
			- If the user is unblocked, I can block him. block a user cause the following actions (TO CONFIRM):
				- I and him can't discuss with each other (Confirm how to do this).
				- I and him can't invite each other game (the button is hidden).
				- I and him can't spectate his game.
				- I and him can't invite each other to a game.
		- "Give administrator privileges"
			**I need to be an administrator of the channel**
			- If the other user is not an administrator of the channel I can see this button
			- If I click on it the user will be administrator of this channel and will have the same right has I for the channel.
		- "Ban from channel" 
			**I need to be an administrator of the channel**
			- If the other user is not an administrator of the channel I can see this button
			- The other use is not banned already 
			- If I click on it the user will be ban of this channel.
				- He will be removed and will not see anymore the channel of the left bar side
				- He will not see anymore the channel by doing the search on the left bar side
				- It is impossible to invite him the channel anymore, unless he is unban
		- "Unban from the channel"
			**I need to be an administrator of the channel**
			- I see this button if the other user is already banned from the channel.
			- If I click on this button, the user will be unbanned:
				- He will be able to search the channel on the left bar side
				- He will be able to join the channel and see it on the left bar side.
				- He will be able to send messages and see historic of the channel again
		- "Mute"
			**I need to be an administrator of the channel**
			- If the other user is not an administrator of the channel I can see this button
			- The other use is not muted already 
			- I can mute the other user from the channel by clicking on this button :
				- He can see messages and the previous messages
				- He can't send messages anymore.
		- "Unmute"
			**I need to be an administrator of the channel**
			- If the other user is not an administrator of the channel I can see this button
			- The other use is muted already 
			- I can unmute the other user from the channel by clicking on this button :
				- He can see messages and the previous messages
				- He can send messages again.

## Social page
**As a user logged in** I can see my friends and the user blocked. 
- The friend part:
	- I can see the user i've added.
	- I can only see friend, if a friend is blocked, he is not in the friend list
	- I can use the search bar to find a friend.
	- I can see the user status:
		- Online (with the green mark)
		- Ingame or game research/invited to a game (with the red mark) 
		- Disconnected (with the grey mark).
	- I can click on it to send a private message which redirected to the chat.
	- If he has a red mark, I can click to spectate the game.
	- I can block him: If this user is blocked, he will be in the block list and not in the friend list anymore.
	- I can invite him to a game if he has the green mark, that means he is available.
- The block part:
	If a user is blocked he can't send me direct message and not being in my friend list.
	- I can see the user I've blocked.
	- If I click on the unblock button:
		- The user will be unblocked and able to send me a message.
		- If it was a friend, I will see him in my friend list.
- Menu bar:
	- The moon icon: 
		When I click on it, I launch the dark mode. 
	- 	The nickname + icon: 
		When I click on it, it opens the menu (link to the menu). 
		When I click again on it, it closes the menu.