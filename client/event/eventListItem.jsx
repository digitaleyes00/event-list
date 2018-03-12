const React       = require('react');
const createClass = require('create-react-class');
const request     = require('superagent');
const _           = require('lodash');

const EventListItem = createClass({
	getDefaultProps() {
		return {
			event    : {},
			isActive : false
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
		if(_.isEmpty(this.props.event)) return;

		return <p>{this.props.renderIcon(this.props.event.type)} {this.props.event.type}</p>;
	},

	render() {
		const itemClasses = (this.props.isActive) ? 'event-list-item active' : 'event-list-item';

		return <li className={ itemClasses } onClick={() => this.props.setSelectedEvent(this.props.event) }>
			<div className='event-list-item--inner'>
				<div className='event-list-item--icon'>
					<img src={this.props.event.icon} alt={this.props.event.title} title={this.props.event.title} />
				</div>
				<div className='event-list-item--title'>
					<h1 className='truncate'>{this.props.event.title}</h1>
					{ this.renderEventType() }
				</div>
	      <button className='event-list-item--delete delete' onClick={(e) => this.delete(e)}> <i className='fa fa-close' /> </button>
			</div>
		</li>;
	}
});

module.exports = EventListItem;
