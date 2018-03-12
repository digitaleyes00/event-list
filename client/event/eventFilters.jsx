const React       = require('react');
const createClass = require('create-react-class');
const _           = require('lodash');

const EventFilters = createClass({
	getDefaultProps() {
		return {
			events  : [],
			filters : {
				eventTypes : []
			}
		};
	},

	componentDidMount() {
		console.log(this.props.selectedEvent);
	},

	renderClearButton() {
		if(_.isEmpty(this.props.filters.eventTypes)) {
			return;
		}

		return <button className='cancel' onClick={this.props.clearFilters}> Clear filters </button>;
	},

	render() {
		const filters = _.uniqBy(this.props.events, 'type').map((ev) => {
			return <button
				key={ev.id}
				className={this.props.filters.eventTypes.includes(ev.type) ? 'active' : ''}
				onClick={() => this.props.filterEventType(ev.type)}>
				{ev.type}
			</button>;
		});

		return <div className='main-container filters'>
			{filters}
			{this.renderClearButton()}
		</div>;
	}
});

module.exports = EventFilters;
