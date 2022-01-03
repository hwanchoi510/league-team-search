### League Game Stat Search App

This App uses the Riot API to search the stats of the players in the current game

App written by Hwan Choi (choihwany@naver.com)

# Functions

You search by inputting the summoner name (IGN) and select the approporiate server
Pressing submit will fetch all the data of the summoner's current game
If they are not in a game or it is a invalid summoner name, it will show an error message
If it is a valid summoner name and they are in a "Classic" Game Mode game, then it'll show the info of all the players in the game.
Info Shown:
&emsp;Current Game Info:
&emsp;&emsp;For Each Summoner In-Game:
&emsp;&emsp;&emsp;Summoner Name
&emsp;&emsp;&emsp;Champion Icon
&emsp;&emsp;&emsp;Spells
&emsp;&emsp;&emsp;All the runes (even the ones not shown in game)
&emsp;Summoner Info:
&emsp;&emsp;For Each Summoner In-Game:
&emsp;&emsp;&emsp;Summoner Name
&emsp;&emsp;&emsp;Summoner Icon
&emsp;&emsp;&emsp;Tier
&emsp;&emsp;&emsp;Rank Points
&emsp;&emsp;&emsp;Stat of the 5 most recent ranked games

# Restrictions

Only NA and KR servers are supported so far

Player must be in a "Classic" Game Mode (Solo, Flex or Normal in Summoner's Rift)

Due to Request Rate Limit, you cannot search multiple times in short period of time (Roughly once per 2 min)