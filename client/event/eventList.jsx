
const React         = require('react');
const EventListItem = require('./eventListItem.jsx');

module.exports = EventList = ({
	events = [],
	...props,
}) => {
	const mappedEvents = events.map((event) => {
		return <EventListItem
			key={event.id}
			event={event}
			{...props}
		/>;
	});
	return <ul className='event-list'>
		{ mappedEvents }
	</ul>;

};
