# Boredem
Boredem is a Discord bot used for moderation.
### Its features include:
Kicking<br/>
Banning<br/>
Ping<br/>
Help<br/>
Aliases<br/>
Invite command
### Owner only features:
Evaluate<br/>
Stop<br/>
Reboot<br/>

### Future features:
Pruning<br/>
Muting/Unmuting/Temporarily muting<br/>
Temporarily banning/Softbanning/Unbanning<br/>
Warning/Unwarning<br/>
Changing nicknames<br/>
Logging<br/>
Assigning roles/Removing roles<br/>
Deleting specific messages/Getting message content/info<br/>
Dashboard<br/>
GUI<br/>
Rewrite

### Future owner only features
Blacklisting guilds<br/>
Reloading

## Insallation and setup
Node.js and Git are required for the installation of Boredem.
### Simple installation (recommended)
* Head on over to [your applications page](https://discordapp.com/developers/applications) and click the blurple button labelled `New Application`
  * Enter a name
    * If you have a team to test your instance, select your team
  * Click create
  * Customise your application the way you want it
  * Click the option in the left pane labelled `Bot`
  * Click the button with the name `Add Bot`
  * Confirm you wish to create a bot user
  * Under the token subsection, click copy. Paste it somewhere safe. You will need this token later
* You will also need to add your bot to a server.
  * Click OAuth2
  * Select the bot scope
  * Select the permissions you want to use
  * Click the blurple copy button
  * Paste it into your omnibox
  * Select a server
  * Click authorise
* Download Boredem's setup file ([Bash/Mac/Linux](https://boredem.uk.to/downloads/open-source/boredem-js/setup.sh) | [Windows](https://boredem.uk.to/downloads/open-source/boredem-js/setup.bat))
* Run the file you downloaded for your respective operating system/command line
* When you see a text editor prompting you to create `conf.json`, enter the following:
```json
{
"token":"-insert your Discord token here-",
"ostatus":"online/idle/dnd",
"prefix":"-insert your intended prefix here-",
"ownerID":"-insert your own user ID here-",
"logchannelID":"-insert the id of the channel you want to log to-",
"embedcolour":"-insert the colour of embeds here, format: 0xHEXCODE"
}
```
* In Bash, hit CTRL + X, Y then press enter. In Windows, save like you normally would (usually CTRL + S) in your preferred editor
* Find your user directory and open the directory labelled `boredem-js`
* Run the respective run.* file for your operating system/command line<br/>
  * To gain access to the PHBlowTestSuccessful and KyleFail emojis, please request your instance to be added to [Bot Testing Server](https://discord.gg/ahyzfEv)

* Yes [@jacob-g](https://github.com/jacob-g), I totally used your profile picture just for this...
![alt text](https://github.com/boredemdiscord/boredem-js/blob/master/resources/simpleinstallation.gif)
