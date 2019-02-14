/*
Program Name:   Console: List WordPress plugins and description
File Name:      ehCode_2019.02.14_JavaScriptES6_ListWordPresPluginsAdmin_01.00.js
Date Created:   02/14/18
Date Modified:  --
Version:        1.00
Programmer:     Eric Hepperle

Purpose: Scrape plugin information using vanilla JavaScript ES6
and then display as pipe-separated or as html table.
    
Usage:
- Login to WordPress dashboard and navigate to Plugins page
- Paste the code below into browser console and hit enter
- Copy-paste either pipe-separated list into a spreadsheet and save,
or HTML table into a .htm/.html file, save and launch in browser.

Returns:
A list of installed plugin names and associated data formatted 2 ways:
pipe-separated and HTML tables.

Sample Results:
[Pipe-Separated]

1 | Advanced Custom Fields PRO | Customize WordPress with powerful, professional and intuitive fields. | 5.7.10 | Elliot Condon |
2 | bbPress | bbPress is forum software with a twist from the creators of WordPress. | 2.5.14 | The bbPress Community |
3 | Contact Form 7 | Just another contact form plugin. Simple but flexible. | 5.1.1 | Takayuki Miyoshi | 
...

[HTML Table]

<table>
	<tr>
		<td>1</td>
		<td>Advanced Custom Fields PRO</td>
		<td>Customize WordPress with powerful, professional and intuitive fields.</td>
		<td>5.7.10</td>
		<td><a href="http://www.elliotcondon.com/">Elliot Condon</a></td>
	</tr>
	<tr>
		<td>2</td>
		<td>Akismet Anti-Spam</td>
		<td>Used by millions, Akismet is quite possibly the best way in the world to protect your blog from spam. Your site is fully configured and being protected, even while you sleep.</td>
		<td>4.1</td>
		<td><a href="https://automattic.com/wordpress-plugins/">Automattic</a></td>
	</tr> ...

Requires: 
	* WordPress login.
    * Installed plugins.
	
Demonstrates:
	- ES6
	- Vanilla JavaScript
	- Spread Operator
	- forEach()
	- querySelectorAll()
    - DOM traversal
    - Pseudocode Algorithm
*/

/* global $ */
/*jshint esversion: 6 */

console.clear();

/* ----------- VARIABLES ----------- */

// Create an array to hold processed plugin group objects
var groupsArr = [];
var outputViews = {}; // object with string properties

var selPluginGroups = '#the-list tr.active:not(.plugin-update-tr)';
var selPluginTitle = '.plugin-title > strong';
var selPluginDescr = '.plugin-description';
var selPluginVerAuthURI = '.plugin-version-author-uri';

var pluginGroups = document.querySelectorAll(selPluginGroups);
console.log('pluginGroups');
console.log(pluginGroups);

// --- POPULATE GROUPS ARRAY --- //

Array.from(pluginGroups).forEach(function(group, i) {

    var thisObj = {};
    
    var pluginTitle = group.querySelector(selPluginTitle).innerText;
    var pluginDescr = group.querySelector(selPluginDescr).innerText;
    
    var authVerURI_txt = group.querySelector(selPluginVerAuthURI).innerText.split(' | ');
    var authVerURI_htm = group.querySelector(selPluginVerAuthURI).innerHTML.split(' | ');
    
    var pluginVersion_txt = authVerURI_txt[0].split('Version ')[1];
    var pluginVersion_htm = authVerURI_htm[0].split('Version ')[1];
    
    var pluginAuthor_txt = authVerURI_txt[1].split('By ')[1];
    var pluginAuthor_htm = authVerURI_htm[1].split('By ')[1];
    
    // Add properties to current object
    thisObj.pluginTitle = pluginTitle;
    thisObj.pluginDescr = pluginDescr;
    thisObj.pluginVersion_txt = pluginVersion_txt;
    thisObj.pluginAuthor_txt = pluginAuthor_txt;
    thisObj.pluginVersion_htm = pluginVersion_htm;
    thisObj.pluginAuthor_htm = pluginAuthor_htm;
    
    groupsArr.push(thisObj);
    
    
});

console.log('groupsArr');
console.log(groupsArr);


// --- FORMAT PLUGINS LIST AS PIPE-SEPARATED --- //

var outStr = "";
var count = 1;

console.log("GROUPS ARRAY");
groupsArr.forEach(function(group, i) {
    
    console.log(group);
    
    var pluginInfoStr = 
    
        count + " | "
        + group.pluginTitle + " | "
        + group.pluginDescr + " | "
        + group.pluginVersion_txt + " | "
        + group.pluginAuthor_txt + " | ";

    outStr += pluginInfoStr + "\n";
    
    count++;
    
});

console.log('OUT STRING');
console.log(outStr);

outputViews.psv = outStr;
console.log('outputViews');
console.log(outputViews);

// --- FORMAT PLUGINS LIST AS HTML --- //

var outStr = "<table>\n";
var count = 1;

console.log("HTML OUTPUT");
groupsArr.forEach(function(group, i) {
    
    console.log(group);
    
    var pluginInfoStr = 
    "\t<tr>\n" +
        "\t\t<td>"
            + count +
        "</td>\n" +
    
        "\t\t<td>"
            + group.pluginTitle +
        "</td>\n" +
    
        "\t\t<td>"
            + group.pluginDescr +
        "</td>\n" +
    
        "\t\t<td>"
            + group.pluginVersion_htm +
        "</td>\n" +
    
        "\t\t<td>"
            + group.pluginAuthor_htm +
        "</td>\n" +
    "\t</tr>\n";
   

    outStr += pluginInfoStr;
    
    count++;
    
});

// close table
outStr += "<table>";


console.log('OUT STRING');
console.log(outStr);

outputViews.htm = outStr;
console.log('outputViews');
console.log(outputViews);



/* -----------  FUNCTIONS ----------- */

/*

@params:
- l = label; text to identify the object we are printing
- o = the object to be displayed
- s = any formatting for the label
*/
function logObj(l, o, s) {
    
    console.log("%c\t\t%s\t\t",s,l);
    console.log(o);
    
}

/*
    Note: this regex is pulled from:
    https://stackoverflow.com/questions/45380207/regex-to-extract-the-top-level-domain-from-a-url
    
    http://www.golangprograms.com/regular-expression-to-extract-domain-from-url.html
*/
function getDomain(u){
    var url = u;
    var reg = new RegExp("^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)");
    var domain = url.match(reg)[1];
    
    return domain;
    
}


/*

NOTES:

    02/14/19 - Created file. WORKS!

*/

/*
ALGORITHM:

Create an array to hold processed plugin group objects

DEFINE VARIABLES:
- Plugin group selector

CREATE & POPULATE GROUPS ARRAY

Grab all PLUGIN GROUPS with querySelectorAll()

For each PLUGIN GROUP

    CREATE new plugin group object
    
    Foreach group object
    
        Grab plugin name
        Add plugin name as object property
        
        Grab Description
        Addd description as object property
        
        Grab Version
        Add version as object property
        
        Grab Author
        Add autho as property
    
    ADD plugin group object to groups array

CREATE FORMATTED Pipe-Separated OUTPUT

Create Out string variable
Initialize to ""

Create count variable
Initialize count to 1

Foreach group in groups array

    Current plugin info string = count | pluginName | description | version | author
    
    Append plugin info string to out string
    
    Increment count
    
Return out string to console
    
*/
