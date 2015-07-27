# dotavods

This repository contains a collection of CSS customizations for EventVODS' dotavods.
It is derived from the LolEventVods css collection.

## Downloading

To download the respository, simply clone the repository.

	git clone https://github.com/simon--poole/dotavods

## Setting up dev environment

To set up your environment to make changes or build the source from scratch, you'll need to install `Gulp` and a few prerequisites.
This can be done quickly using

	npm install

## Generating sprites
	
You can quickly regenerate sprites files using 
	
	gulp sprites

This updates the `images/teams.png` file and the `less/team-sprites.less` file.
You'll also need to update the `teams.less` file to include any additional sprites.

## Building the source
Building the source is extremely simple - simply run

	gulp build
	
The resulting css files can be found in **dist/**.

