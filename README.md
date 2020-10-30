# Red Blue

![Banner](https://github.com/Harry-Lees/Red-Blue/blob/main/.github/banner.PNG)

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
* [Rules](#rules)

## About the Project

This a Python3 (Flask) &amp; JS based board game which leverages Webhooks for communication. You can play it [here](https://red-blue.herokuapp.com/) 

### Built With

* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [SocketIO](https://socket.io/)

## Getting Started

### Prerequisites

to install this projects dependancies, navigate to the project directory and execute `pip3 install -r requirements.txt`

After you've installed the dependancies, you can run the project by simply running `python3 app.py` which will launch the Flask development server.
Note: The flask development server is meant for development only and should not be used in production.

## Rules

* The game is played between 2 players (Red & Blue) and the objetive of the game is to capture the maximum number of green squares and convert them into their color.
* The game starts with Red player making the first move by clicking on any square on the empty green borad. And then the Blue player makes his move.
* Everytime you click a square, the squares adjacent to it in all the directions are convert into your color.
* The players can only click on empty green sqaures and not on other player's captured square.
* The game is won when all the squares are captured by both the players and the player with maximum sqaure of his color wins.
