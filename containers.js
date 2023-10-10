/*

things to feed in:
	- "type" of display file (image, gif?, gallery?, audio?)
	- file name
	- width of container
	- thumbnail description
	- text description

I need js to:
	- create the projectEntry with id projectThumb# a projectThumbnail image and description in the projectfolderContainer div
	- create the projectImage/gif/gallery/sound container with an id of project# and the width
		- here i put the image and the text description
	- connect the thumbnail to the container in js with an animateContainer() 

*/

var projectList = [
	{
		"fileName": "test.gif",
		"type": "image",
		"width": 400,
		"thumbnailText": "this website!",
		"text": "Working on this has been a super fun project! I'm ceratinly not a web developer, but I've learned a lot about how jankily I can graft ideas into the Katamari ball of trash that this website is."
	},
	{
		"fileName": "mythic.png",
		"type": "image",
		"width": 400,
		"thumbnailText": "mythic",
		"text": "Drew this for MythicalRedFox's b-day! happy pets uvu"
	},
	{
		"fileName": "greybday.png",
		"type": "image",
		"width": 400,
		"thumbnailText": "grey",
		"text": "This was for GreyscaleVixen's b-day! She is a good fox and professional Metazooa player."
	},
	{
		"fileName": "gyoju.png",
		"type": "image",
		"width": 400,
		"thumbnailText": "gyoju",
		"text": "This one reminds me of my old corvid that i used to take care of... Ahh, My crow pet. (get it)"
	},
	{
		"fileName": "kass.png",
		"type": "image",
		"width": 700,
		"thumbnailText": "kass",
		"text": "Keliff (at twitch.tv/keliff) hosted another draw together sesh! Maybe you pick up on the things he makes me feel."
	},
	{
		"fileName": "drip.png",
		"type": "image",
		"width": 500,
		"thumbnailText": "drip",
		"text": "redeem random antler"
	},
	{
		"fileName": "rockclimbinsfw.png",
		"type": "image",
		"width": 700,
		"thumbnailText": "cz comm!",
		"text": "Painted this for Czyzc! I don't know how to rock climb, but if you tell me i put the ropes in the wrong spot I will cry."
	},
	{
		"fileName": "pngtuberplus.gif",
		"type": "image",
		"width": 400,
		"thumbnailText": "tuber",
		"text": "This is the Poppy I use for stream! Made with PNGTuberPlus, a super fun program ot work in."
	},
	{
		"fileName": "kusa.png",
		"type": "image",
		"width": 400,
		"thumbnailText": "kusalito",
		"text": "feliz huevos uvu"
	},
	{
		"fileName": "project_1.png",
		"type": "image",
		"width": 800,
		"thumbnailText": "stream sketches",
		"text": "I was doing some givaways on stream! Rough sketches can be very relaxing if you don't stress too much about the details."
	},
	{
		"fileName": "drawwithroo.png",
		"type": "image",
		"width": 700,
		"thumbnailText": "southpaw",
		"text": "Keliff (at twitch.tv/keliff) was hosting a draw together sesh of the adorable SouthPaw from Cassette Beasts! I drew some silly gestures for that"
	}

]

setupProjects(projectList);

function setupProjects(list) {
	var projectFolder = document.querySelector(".projectFolderContainer");
	var body = document.querySelector("body");
	var before = document.querySelector(".commissions");

	list.forEach(function (e, index){
		// insert project thumbnails in the project folder
		var projectEntry = document.createElement("div");
		projectEntry.classList.add("projectEntry");
		projectEntry.setAttribute('id', `projectThumb${index}`);
		projectEntry.classList.add('undraggable');

		var thumbnail = document.createElement("img");
		thumbnail.setAttribute('src', `./images/${projectList[index].fileName}`);
		thumbnail.classList.add('projectThumbnail');

		var thumbPara = document.createElement("p");
		var thumbNode = document.createTextNode(projectList[index].thumbnailText);

		thumbPara.appendChild(thumbNode);

		projectEntry.appendChild(thumbnail);
		projectEntry.appendChild(thumbPara);
		projectFolder.appendChild(projectEntry);

		// figure out how to do different things based on content
		// insert project containers into body
		var projectImageDiv = document.createElement("div");
		projectImageDiv.classList.add("container", "projectImage");
		projectImageDiv.setAttribute('id', `project${index}`)
		projectImageDiv.style.width = `${projectList[index].width}px`;

		var projectImage = document.createElement("img"); 
		projectImage.setAttribute('src', `./images/${projectList[index].fileName}`);
		projectImage.style.width = '100%';
		projectImage.style.height = '100%';
		projectImage.style.borderRadius = '10px';

		var para = document.createElement("p");
		para.setAttribute('style', 'padding: 15px 10px 0px 10px;');
		var node = document.createTextNode(projectList[index].text);

		para.appendChild(node);

		var x = document.createElement('div');
		x.classList.add('close');
		x.classList.add('undraggable');
		x.innerText = 'X';

		projectImageDiv.appendChild(projectImage);
		projectImageDiv.appendChild(para);
		projectImageDiv.appendChild(x);
		body.insertBefore(projectImageDiv, before);

		// figure out something for the height lmao

		// add event listeners on thumbnail click
		document.querySelector(`#projectThumb${index}`).addEventListener('click', (e) => {
			animateContainer(projectImageDiv, projectList[index].width, 600);
		});
	});
};

// set container opening for "poppy" "draw and stream" "i'm up to", "want art"
document.querySelector("#welcomeLink").addEventListener('click', (e) => {
	var commElem = document.querySelector(".welcome");
	animateContainer(commElem, 550, 200);
});

document.querySelector("#poppyLink").addEventListener('click', (e) => {
	var commElem = document.querySelector(".poppy");
	animateContainer(commElem, 720, 400);
});

document.querySelector("#streamLink").addEventListener('click', (e) => {
	var commElem = document.querySelector(".stream");
	animateContainer(commElem, 850, 550);
});

document.querySelector("#commLink").addEventListener('click', (e) => {
	var commElem = document.querySelector(".commissions");
	animateContainer(commElem, 800, 800);
});

document.querySelector("#projectsLink").addEventListener('click', (e) => {
	var projectElem = document.querySelector(".projectFolder");
	animateContainer(projectElem, 600, 500);
});

document.querySelector(".formLink").addEventListener('click', (e)=>{
	window.open('https://forms.gle/Fuyap1y53JA72vVk7', '_blank').focus();
});

// set default z-index
var selectedNode = document.querySelector(".landing");
selectedNode.style.zIndex = "2";

// if you click on a container, set it on top
var clickables = document.querySelectorAll(".container")
clickables.forEach(elem => {
	elem.addEventListener('mousedown', (e)=> {
		bringToTop(elem);
	});
});

function bringToTop(elem)
{
	selectedNode.style.zIndex = "1";
	elem.style.zIndex = "2";
	selectedNode = elem;
}

// set close button functionality
var closeButtons = document.querySelectorAll(".close")

closeButtons.forEach(element => {
	element.addEventListener('click', (e) => {
		var parent = e.target.parentNode;
		parent.style.opacity = 0;
		parent.style.transform = 'translate(0, 20px)';
		window.setTimeout(function() {
			parent.style.display= 'none';
		},300);
	});
});

// "spawn" container, set it on top, and animate it upwards
function animateContainer(elem, width, height) {
	if (elem.style.display == 'block') return;
	bringToTop(elem);

	var x = Math.floor(Math.random() * (window.innerWidth - width - 20)) + 20;
	var y = Math.floor(Math.random() * (window.innerHeight - height - 20)) + 20;

	elem.style.left = x + "px";
	elem.style.top = y + "px";

	elem.style.display= 'block';
	window.setTimeout(function() {
		elem.style.opacity = 1;
		elem.style.transform = 'translate(0px, -20px)';
	},100);
}