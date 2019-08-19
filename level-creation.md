# Custom Level Creation

To create your own levels, you need to specify them
in a text file and deploy that file on a text file hosting service.

A good example is the level definition file for the default
levels included in the game, which you can view 
[here](https://github.com/lukasbach/slyder/blob/master/public/default-campaign.txt).

## File Structure

A sample level file looks like that:

    // You can write comments by starting lines with "//"

    // Preamble contains meta information
    !name Level set name
    !author Name of the author
    !website url-to-author-website.com
    ===============================
    // Preamble is ended with at least three equal symbols
    
    // Now comes a list of all levels. Each level begins with
    // a line containing "!level" and ends with either the start
    // of another level or with the end of the file.    
    !level
    // You can provide a custom color palette if you want to
    !color 6e2142 943855 e16363 ffd692 
    // A level can have any amount of boards that are played
    // simultaniously, though it is recommended not to have more than
    // two or three. Boards are seperated with an empty line.
    #####
    #*.>#
    #####
    
    #####
    #*.>#
    #####
    // The usable characters are listed below.
    
    // The next level starts with "!level" again.
    !level
    !color 6e2142 943855 e16363 ffd692
    #####
    #*.>#
    #####
    
    #####
    #*.>#
    #####
    // You need to end the file with an empty line.
    
You can use the following characters in the board map definitions:
* ``#`` Wall
* ``.`` Empty space (character can move through that)
* ``*`` Spawning position for player
* ``>`` Target position
* ``x`` Reset tile. Player resets to spawn on that board upon entering
  this tile.
  
## Deploying

You have to host the text file on a text hosting service.
Then, the URL to call for playing your game will be:

* Hosted in a GitHub Repo: ``https://lukasbach.github.io/slyder/#gh/githubusername/repo/master/path/to/file.txt``
* Hosted in a GitHub Gist: ``https://lukasbach.github.io/slyder/#gist/githubusername/gistname/file.txt``
* Hosted in a PasteBin Paste: ``https://lukasbach.github.io/slyder/#pb/pastebinid``
* Hosted elsewhere: ``https://lukasbach.github.io/slyder/#url/to/file.txt``

## Testing

You can add a ``/4`` on the URL to directly start the fifth level (level IDs start with
zero). You can also add a ``!nointro`` to skip intro to test faster.

For example, by entering
``https://lukasbach.github.io/slyder/#gh/githubusername/repo/master/file.txt/2!nointro``
you will open the third level on the file located at ``https://github.com/githubusername/repo/file.txt``
without viewing the intro.