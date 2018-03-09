const React       = require('react');
const createClass = require('create-react-class');

const EventList = require('../event/eventList.jsx');

const Home = createClass({
	getDefaultProps() {
		return {};
	},
	render() {
		return <div className='home'>
			<div className='fancybar'/>
			<h1>Event Thingie 9000</h1>
			<div className='container'>
				<section>
					<EventList />
				</section>
				<section>
					Details here.
				</section>
			</div>
		</div>;
	}
});

module.exports = Home;
