var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var Main = require('../components/Main');
var Home = require('../components/Home');
var PromptContainer = require('../containers/PromptContainer');
var ConfirmBattleContainer = require('../containers/ConfirmBattleContainer');
var ResultsContainer = require('../containers/ResultsContainer');

var routes = (
	<Router history={ hashHistory }>
		<Route path="/" component={ Main }>
			<IndexRoute component={ Home } />
			<Route path='playerOne' header="Player One" component={ PromptContainer } />
			<Router path='playerTwo/:playerOne' header="Player Two" component={ PromptContainer } />
			<Router path='battle' component={ ConfirmBattleContainer } />
			<Router path='results' component={ ResultsContainer } />
		</Route>
	</Router>
);

module.exports = routes;