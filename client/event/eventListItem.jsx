const React       = require('react');
const createClass = require('create-react-class');
const request     = require('superagent');
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

const EventListItem = createClass({
	getDefaultProps() {
		return {
			event: {},
			isActive: false
		};
	},

  // getInitialState() {
  //   return {
  //     events: []
  //   };
  // },

  delete() {
    request.delete(`https://forgetful-elephant.herokuapp.com/events/${this.props.event.id}`)
    	.end((err, res) => {
        console.log(res); this.props.getEvents();
      });
  },

  componentDidMount() {
    console.log('yupokj');
  },

	renderIcon() {
    switch(this.props.event.type) {
      case 'movie':
       return <i className='fa fa-film' />;
			case 'birthday':
        return <i className='fa fa-birthday-cake' />;
			case 'music':
        return <i className='fa fa-music' />;
			case 'wedding':
        return <i className='fa fa-heart' />;
      default:
       return;
    }
  },

	renderEventType() {
		if(_.isEmpty(this.props.event)) return;

		return <p>{this.renderIcon()} {this.props.event.type}</p>;
	},

	render() {
		let itemClasses = (this.props.selectedEventId === this.props.event.id) ? 'event-list--item active' : 'event-list--item';

		return <li className={ itemClasses } onClick={ this.props.setSelectedEvent.bind(null, this.props.event) }>
			<div className='event-list--item__inner'>
				<div className='event-list--item__icon'>
					<img src='https://loremflickr.com/100/100' />
				</div>
				<div className='event-list--item__title'>
					<h1 className='truncate'>{this.props.event.title}</h1>
					{ this.renderEventType() }
				</div>
	      <button className='event-list--item__delete delete' onClick={this.delete.bind(null, this.props.id)}> <i className='fa fa-close' /> </button>
			</div>
		</li>;
	}
});

module.exports = EventListItem;
