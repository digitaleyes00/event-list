const React       	= require('react');
const createClass 	= require('create-react-class');
const _           	= require('lodash');
const request     	= require('superagent');

const EventList 		= require('../event/eventList.jsx');
const EventDetails 	= require('../event/eventDetails.jsx');
const EventFilters 	= require('../event/eventFilters.jsx');

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
				eventTypes : []
			}
		};
	},

	setSelectedEvent(selectedEvent) {
		this.setState({ selectedEvent });
	},

	filteredEvents() {
		if(_.isEmpty(this.state.filters['eventTypes'])) return this.state.events;

		return this.state.events.filter((event) => {
			return this.state.filters.eventTypes.includes(event.type);
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
	    'movie' : function () {
	      return <i className='fa fa-film' />;
	    },
			'birthday' : function () {
	      return <i className='fa fa-birthday-cake' />;
	    },
			'music' : function () {
	      return <i className='fa fa-music' />;
	    },
			'wedding' : function () {
	      return <i className='fa fa-heart' />;
	    },
	    'default' : function () {
	      return 'Click an item to view details.';
	    }
  	};
  	return (icons[type] || icons['default'])();
	},

	getEvents() {
		request.get('https://forgetful-elephant.herokuapp.com/events')
    	.end((err, res) => {
				console.log(err);
				this.setState({
					events : res.body,
					loaded : true
				});
			});
	},

	componentDidMount() {
		this.getEvents();
	},

	renderClearButton() {
		if(_.isEmpty(this.state.filters.eventTypes)) {
			return;
		}

		return <button className='clear' onClick={this.clearFilters}> Clear filters </button>;
	},

	renderFilters() {
		if(_.isEmpty(this.state.events)) return;

		return <EventFilters
			events={this.state.events}
			filters={this.state.filters}
			filterEventType={this.filterEventType}
			clearFilters={this.clearFilters} />;
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
