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

const EventListItem = createClass({
	getDefaultProps() {
		return { event: {} };
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

  showDetails() {
    console.log('clicked!');
  },

  componentDidMount() {
    console.log('yupokj');
  },

	render() {
		return <li className='event-list--item' onClick={ this.showDetails }>
			<h1>{this.props.event.title}</h1>
      <button onClick={this.delete.bind(null, this.props.id)}> Delete <i className='fa fa-close fa-spin' /> </button>
		</li>;
	}
});

module.exports = EventListItem;
