require('./app')
require('./mocks/mockCatApi')

require('./services/*')
// require('./services/catsService')

require('./directives/allowEnter.directive')
require('./directives/ccFocus.directive')
require('./directives/imagePreview/imagePreview.controller')
require('./directives/imagePreview/imagePreview.directive')
require('./directives/validateCatUrl.directive')
require('./directives/validateUpvote.directive')
require('./directives/voteSpinner/voteSpinner.controller')
require('./directives/voteSpinner/voteSpinner.directive');

require('./controllers/catDetailsController');
require('./controllers/catsController');
