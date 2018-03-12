const React       = require('react');
const createClass = require('create-react-class');
const _           = require('lodash');
const moment      = require('moment');

const EventDetails = createClass({
	getDefaultProps() {
		return { selectedEvent: {} };
	},

	render() {
		if(_.isEmpty(this.props.selectedEvent)) {
			return <p>Click an event to view details.</p>;
		}

		return <div className='event-details'>
			<h1>{this.props.selectedEvent.title}</h1>
			<img src={this.props.selectedEvent.icon} alt={this.props.selectedEvent.title} title={this.props.selectedEvent.title} />
			<h2>{ moment.unix(this.props.selectedEvent.timestamp).format('MMMM Do YYYY')}</h2>
			<h3>{ moment.unix(this.props.selectedEvent.timestamp).format('h:mm a')}</h3>
			{ this.props.renderIcon(this.props.selectedEvent.type) }
		</div>;
	}
});

module.exports = EventDetails;
