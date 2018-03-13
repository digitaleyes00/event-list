
const React  = require('react');
const moment = require('moment');
const _      = require('lodash');

module.exports = EventDetails = ({
	selectedEvent = {},
	renderIcon = () => {},
}) => {
	if(_.isEmpty(selectedEvent)) {
		return <p>Click an event to view details.</p>;
	}
	return <div className='event-details'>
		<h1>{selectedEvent.title}</h1>
		<img src={selectedEvent.icon} alt={selectedEvent.title} title={selectedEvent.title} />
		<h2>{ moment.unix(selectedEvent.timestamp).format('MMMM Do YYYY')}</h2>
		<h3>{ moment.unix(selectedEvent.timestamp).format('h:mm a')}</h3>
		<i className={`fa fa-2x fa-${renderIcon(selectedEvent.type)}`}/>
	</div>;
};
