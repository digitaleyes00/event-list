const React       = require('react');
const createClass = require('create-react-class');
const _           = require('lodash');
const request     = require('superagent');

const EventList    = require('../event/eventList.jsx');
const EventDetails = require('../event/eventDetails.jsx');
const EventFilters = require('../event/eventFilters.jsx');

const Home = createClass({
	getDefaultProps() {
		return {};
	},

	getInitialState() {
		return {
			events        : [],
			loaded        : false,
			selectedEvent : {},
			filters       : {
				eventTypes : [],
			}
		};
	},

	componentDidMount() {
		this.getEvents();
	},

	setSelectedEvent(selectedEvent) {
		this.setState({ selectedEvent });
	},

	filteredEvents() {
		const { filters, events } = this.state;
		if(_.isEmpty(filters['eventTypes'])) return events;

		return events.filter((event) => {
			return filters.eventTypes.includes(event.type);
		});
	},

	filterEventType(eventType) {
		let eventTypes = [...this.state.filters.eventTypes, eventType];

		if(this.state.filters.eventTypes.includes(eventType)) {
			eventTypes = this.state.filters.eventTypes.filter((type) => {
				return type !== eventType;
			});
		}

		this.setState({
			filters : { eventTypes }
		});
	},

	clearFilters() {
		this.setState({
			filters : { eventTypes: [] }
		});
	},

	renderIcon(type) {
		const icons = {
			movie    : 'film',
			birthday : 'birthday-cake',
			concert  : 'music',
			wedding  : 'heart',
			sports   : 'futbol-o',
			default  : 'cube',
		};
		return type ? icons[type] : icons['default'];
	},
	getEvents() {
		request.get('https://forgetful-elephant.herokuapp.com/events')
			.end((err, res) => {
				this.setState({
					events        : res.body,
					loaded        : true,
					selectedEvent : {},
				});
			});
	},

	renderFilters() {
		if(_.isEmpty(this.state.events)) return;
		return <EventFilters
			events={this.state.events}
			filters={this.state.filters}
			filterEventType={this.filterEventType}
			clearFilters={this.clearFilters}
			renderIcon={this.renderIcon} />;
	},

	renderMain() {
		if(!this.state.loaded) {
			return <div className='main-container centered'>
				<h1> Loading... </h1>
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
				<EventList
					events={this.filteredEvents()}
					getEvents={this.getEvents}
					renderIcon={this.renderIcon}
					setSelectedEvent={this.setSelectedEvent}
					selectedEventId={_.isEmpty(this.state.selectedEvent) ? null : this.state.selectedEvent.id} />
			</section>
			<aside>
				<EventDetails
					selectedEvent={this.state.selectedEvent}
					renderIcon={this.renderIcon} />
			</aside>
		</div>;
	},

	render() {
		return <div className='home'>
			<div className='fancybar'/>
			<div className='container'>
				<h1 className='app-title'>Event Thingie 9000</h1>
				<nav>
					{this.renderFilters()}
				</nav>
				{this.renderMain()}
			</div>
		</div>;
	}
});

module.exports = Home;
