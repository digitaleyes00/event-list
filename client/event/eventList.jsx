const React       = require('react');
const createClass = require('create-react-class');

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
const EventListItem = require('./eventListItem.jsx');

const EventList = createClass({
	getDefaultProps() {
		return {
			events : []
		};
	},

	render() {
		const events = this.props.events.map((event) => {
			console.log(`eeeevent -- ${JSON.stringify(event)}`);
			return <EventListItem
				key={event.id}
				event={event}
				getEvents={this.props.getEvents}
				renderIcon={this.props.renderIcon}
				setSelectedEvent={this.props.setSelectedEvent}
				selectedEventId={this.props.selectedEventId} />;
		});

		return <ul className='event-list'>
			{ events }
		</ul>;
	}
});

module.exports = EventList;
