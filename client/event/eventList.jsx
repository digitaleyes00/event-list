const React       = require('react');
const createClass = require('create-react-class');
const request     = require('superagent');

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
		return {};
	},

  getInitialState() {
    return {
      events: []
    };
  },

  getEvents() {
    request.get('https://forgetful-elephant.herokuapp.com/events')
    	.end((err, res) => {
        console.log(res)
        this.setState({
          events: res.body
        });
      });
  },

  componentDidMount() {
    console.log*('yup');
    this.getEvents();
  },

	render() {
    const events = this.state.events.map(event => {
      console.log(`eeeevent -- ${JSON.stringify(event)}`);
      return <EventListItem key={event.title} event={event} getEvents={this.getEvents} />;
    });

		return <ul className='event-list'>
      { events }
		</ul>;
	}
});

module.exports = EventList;
