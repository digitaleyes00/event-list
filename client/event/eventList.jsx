const React         = require('react');
const createClass	  = require('create-react-class');
const EventListItem = require('./eventListItem.jsx');

const EventList = createClass({
	getDefaultProps() {
		return {
			events : []
		};
	},

	render() {
		const events = this.props.events.map((event) => {
			const isActive = this.props.selectedEventId === event.id;
			return <EventListItem
				key={event.id}
				event={event}
				getEvents={this.props.getEvents}
				renderIcon={this.props.renderIcon}
				isActive={isActive}
				setSelectedEvent={this.props.setSelectedEvent}
				selectedEventId={this.props.selectedEventId} />;
		});

		return <ul className='event-list'>
			{ events }
		</ul>;
	}
});

module.exports = EventList;
