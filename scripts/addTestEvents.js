const request = require('superagent');

/* Event Schema
{
	"type": "[string] The event type",
	"serviceId": "[string] An ID for the service that created this event",
	"icon": "[string] The URL to a small icon for this event",
	"timestamp": "[string] A timestamp indicating when the event occurred",
	"title": "[string] A short summary description of the event",
	"data": "[string] The event payload"
}
*/

const sampleEvents = [
	{
		// Add sample event(s) here...
		"type": "music",
		"serviceId": "concertz",
		"icon": "[string] The URL to a small icon for this event",
		"timestamp": "1520627760",
		"title": "Awesome concert",
		"data": "ok"
	},
	{
		// Add sample event(s) here...
		"type": "music",
		"serviceId": "concertz",
		"icon": "[string] The URL to a small icon for this event",
		"timestamp": "1520617760",
		"title": "Awesome concert 2",
		"data": "ok"
	},
	{
		// Add sample event(s) here...
		"type": "movie",
		"serviceId": "MoovieGuy",
		"icon": "[string] The URL to a small icon for this event",
		"timestamp": "1520645760",
		"title": "Cool Movie",
		"data": "ok"
	},
	{
		// Add sample event(s) here...
		"type": "movie",
		"serviceId": "MoovieGuy",
		"icon": "[string] The URL to a small icon for this event",
		"timestamp": "1520647760",
		"title": "Good Movie",
		"data": "ok"
	},
	{
		// Add sample event(s) here...
		"type": "birthday",
		"serviceId": "steve",
		"icon": "[string] The URL to a small icon for this event",
		"timestamp": "1520622760",
		"title": "Steve's Birthday",
		"data": "ok"
	},
	{
		// Add sample event(s) here...
		"type": "wedding",
		"serviceId": "steve",
		"icon": "[string] The URL to a small icon for this event",
		"timestamp": "1520612454",
		"title": "Steve's Wedding",
		"data": "ok"
	}
];

sampleEvents.forEach(sampleEvent => {
	request.post('https://forgetful-elephant.herokuapp.com/events')
		.send(sampleEvent)
		.end(() => console.log('Sample Event Added!'));
})
