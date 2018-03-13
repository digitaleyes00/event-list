const React       = require('react');
const createClass = require('create-react-class');
const request     = require('superagent');
const cx          = require('classnames');
const _           = require('lodash');

const EventListItem = createClass({
	getDefaultProps() {
		return {
			event : {},
		};
	},

	delete(e) {
		e.stopPropagation();
		request.delete(`https://forgetful-elephant.herokuapp.com/events/${this.props.event.id}`)
			.end((err, res) => {
				this.props.getEvents();
			});
	},

	renderEventType() {
		const { event, renderIcon } = this.props;
		if(_.isEmpty(event)) return;
		return <p><i className={`fa fa-${renderIcon(event.type)}`}/>{event.type}</p>;
	},

	render() {
		console.log(this.props);
		const { event, selectedEventId, setSelectedEvent } = this.props;

		const itemClasses = cx('event-list-item', { active: (event.id === selectedEventId) });

		return <li className={itemClasses} onClick={() => setSelectedEvent(this.props.event) }>
			<div className='event-list-item--inner'>
				<div className='event-list-item--icon'>
					<img src={event.icon} alt={event.title} title={event.title} />
				</div>
				<div className='event-list-item--title'>
					<h1 className='truncate'>{event.title}</h1>
					{ this.renderEventType() }
				</div>
				<button className='event-list-item--delete delete' onClick={(e) => this.delete(e)}>
					<i className='fa fa-close'/>
				</button>
			</div>
		</li>;
	}
});

module.exports = EventListItem;
