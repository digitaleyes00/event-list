const React       = require('react');
const createClass = require('create-react-class');
const _           = require('lodash');
const request     = require('superagent');

const EventList = require('../event/eventList.jsx');
const EventDetails = require('../event/eventDetails.jsx');

const Home = createClass({
	LOADING_DURATION: 1000,

	getDefaultProps() {
		return {};
	},

	getInitialState() {
		return {
			events: [],
			loaded: false,
			selectedEvent: {},
			filters: {
				eventType: ''
			}
		}
	},

	setSelectedEvent(selectedEvent) {
		this.setState({ selectedEvent });
	},

	filteredEvents() {
		if(_.isEmpty(this.state.filters['eventType'])) return this.state.events;
		console.log(_.filter(this.state.events, ['type', 'movie']));
		return _.filter(this.state.events, ['type', this.state.filters.eventType]);
	},

	filterEventType(eventType) {
		this.setState({
			filters: { eventType }
		});
	},

	getEvents() {
    request.get('https://forgetful-elephant.herokuapp.com/events')
    	.end((err, res) => {
        setTimeout(() => {
					this.setState({
						events: res.body,
						loaded: true
					});
				}, this.LOADING_DURATION)
      });
  },

	componentDidMount() {
		this.getEvents();
	},

	renderFilters() {
		let filters = _.uniqBy(this.state.events, 'type').map(ev => {
										return <button onClick={this.filterEventType.bind(null, ev.type)}>{ev.type}</button>
									});
		return <div className='filters'>
					   {filters}
		       </div>;
	},

	renderMain() {
		if(!this.state.loaded) {
			return <div className='main-container centered'>
				<h1> Fake Loading... </h1>
				<i className='fa fa-circle-o-notch fa-spin' />
			</div>;
		}

		if(_.isEmpty(this.state.events)) {
			return <div className='main-container centered'>
				<h1>There are no events. How boring.</h1>
			</div>;
		}

		return <div className='flex-container main-container'>
			<section>
				<EventList events={this.filteredEvents()} setSelectedEvent={this.setSelectedEvent} selectedEventId={_.isEmpty(this.state.selectedEvent) ? null : this.state.selectedEvent.id} />
			</section>
			<aside>
				<EventDetails selectedEvent={this.state.selectedEvent} />
			</aside>
		</div>;
	},

	render() {
		return <div className='home'>
			<div className='fancybar'/>
			<h1>Event Thingie 9000</h1>
			<div className='container'>
				<nav>
					{this.renderFilters()}
				</nav>
				{this.renderMain()}
			</div>
		</div>;
	}
});

module.exports = Home;
