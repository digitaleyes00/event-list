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

	renderClearButton() {
		if(_.isEmpty(this.props.filters.eventTypes)) {
			return;
		}

		return <button className='cancel' onClick={this.props.clearFilters}> Clear filters </button>;
	},

	render() {
		const filters = _.uniqBy(this.props.events, 'type').map((ev) => {
			const isActive = this.props.filters.eventTypes.includes(ev.type);
			return <button
				key={ev.id}
				className={isActive ? 'active' : ''}
				onClick={() => this.props.filterEventType(ev.type)}>
				{isActive ? <i className='fa fa-check' /> : this.props.renderIcon(ev.type)} {ev.type}
			</button>;
		});

		return <div className='main-container filters'>
			{filters}
			{this.renderClearButton()}
		</div>;
	}
});

module.exports = EventFilters;
