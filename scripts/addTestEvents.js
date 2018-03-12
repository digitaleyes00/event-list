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
		'type'      : 'concert',
		'serviceId' : 'concertz',
		'icon'      : 'https://loremflickr.com/200/200',
		'timestamp' : '1520627760',
		'title'     : 'The Beatles',
		'data'      : '{}'
	},
	{
		'type'      : 'concert',
		'serviceId' : 'concertz',
		'icon'      : 'https://loremflickr.com/200/200',
		'timestamp' : '1520617760',
		'title'     : 'Queens of the Stone Age',
		'data'      : '{}'
	},
	{
		'type'      : 'movie',
		'serviceId' : 'MoovieGuy',
		'icon'      : 'https://loremflickr.com/200/200',
		'timestamp' : '1520645760',
		'title'     : 'Indiana Jones and the Raiders of the Lost Ark',
		'data'      : '{}'
	},
	{
		'type'      : 'birthday',
		'serviceId' : 'steve',
		'icon'      : 'https://loremflickr.com/200/200',
		'timestamp' : '1520622760',
		'title'     : 'Steve\'s Birthday',
		'data'      : '{}'
	},
	{
		'type'      : 'wedding',
		'serviceId' : 'steve',
		'icon'      : 'https://loremflickr.com/200/200',
		'timestamp' : '1520612454',
		'title'     : 'Steve\'s Wedding',
		'data'      : '{}'
	},
	{
		'type'      : 'sports',
		'serviceId' : 'steve',
		'icon'      : 'https://loremflickr.com/200/200',
		'timestamp' : '1520612454',
		'title'     : 'The Big Game',
		'data'      : '{}'
	},
	{
		'type'      : 'movie',
		'serviceId' : 'MoovieGuy',
		'icon'      : 'https://loremflickr.com/200/200',
		'timestamp' : '1520647760',
		'title'     : 'Hackers',
		'data'      : '{}'
	}
];

sampleEvents.forEach((sampleEvent) => {
	request.post('https://forgetful-elephant.herokuapp.com/events')
		.send(sampleEvent)
		.end(() => console.log('Sample Event Added!'));
});
