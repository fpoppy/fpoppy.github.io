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
		"fileName": "rockclimbinsfw.png",
		"type": "image",
		"width": 700,
		"thumbnailText": "cz comm!",
		"text": "Painted this for Czyzc! I don't know how to rock climb, but if you tell me i put the ropes in the wrong spot I will cry."
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
		"width": 1000,
		"thumbnailText": "stream sketches",
		"text": "I was doing some givaways on stream! Rough sketches can be very relaxing if you don't stress too much about the details."
	},
	{
		"fileName": "drawwithroo.png",
		"type": "image",
		"width": 500,
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

document.querySelector("#commLink").addEventListener('click', (e) => {
	var commElem = document.querySelector(".commissions");
	animateContainer(commElem, 800, 800);
});

document.querySelector("#projectsLink").addEventListener('click', (e) => {
	var projectElem = document.querySelector(".projectFolder");
	animateContainer(projectElem, 600, 500);
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

	var x = Math.floor(Math.random() * (window.innerWidth - width));
	var y = Math.floor(Math.random() * (window.innerHeight - height));

	elem.style.left = x + "px";
	elem.style.top = y + "px";

	elem.style.display= 'block';
	window.setTimeout(function() {
		elem.style.opacity = 1;
		elem.style.transform = 'translate(0px, -20px)';
	},100);
}