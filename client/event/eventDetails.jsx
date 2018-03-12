const React       = require('react');
const createClass = require('create-react-class');
const _           = require('lodash');

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

const EventDetails = createClass({
	getDefaultProps() {
		return { selectedEvent: {} };
	},

	componentDidMount() {
		console.log(this.props.selectedEvent);
	},

	render() {
		return <div className='event-details'>
			{ this.props.renderIcon(this.props.selectedEvent.type) }
			<h1>{this.props.selectedEvent.title}</h1>
		</div>;
	}
});

module.exports = EventDetails;
