-'use strict';
 
var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;
var SearchResults = require('./SearchResults');
var AudioPlayer = require('react-native-audioplayer');

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
	flowRight: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  alignSelf: 'stretch'
	},
	buttonText: {
	  fontSize: 18,
	  color: 'white',
	  alignSelf: 'center'
	},
	button: {
	  height: 36,
	  flex: 1,
	  flexDirection: 'row',
	  backgroundColor: '#48BBEC',
	  borderColor: '#48BBEC',
	  borderWidth: 1,
	  borderRadius: 8,
	  marginBottom: 10,
	  alignSelf: 'stretch',
	  justifyContent: 'center'
	},
	searchInput: {
	  height: 36,
	  padding: 4,
	  marginRight: 5,
	  flex: 5,
	  fontSize: 18,
	  borderWidth: 1,
	  borderColor: '#48BBEC',
	  borderRadius: 8,
	  color: '#48BBEC'
	},
    image: {
      width: 217,
      height: 138
    }
});

function urlForQueryAndPage(key, value, pageNumber) {
	var data = {
		//key: value,
		country: 'uk',
		pretty: '1',
		encoding: 'json',
		listing_type: 'buy',
		action: 'search_listings',
		//page: pageNumber
	};
	data[key] = value;

	// ["country", "pretty", "encoding", "listing_type", "action"]
	var arrayOfKeys = Object.keys(data); 
	var queryString = arrayOfKeys.map(key => key + '=' + encodeURIComponent(data[key])).join('&');

	return 'http://api.nestoria.co.uk/api?' + queryString;
};

class AudioPlayerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london',
            isLoading: false, 
            message: '',
            isPlaying: false
        };
    } 

    onSearchTextChanged(event) {
        this.setState({searchString: event.nativeEvent.text});
    }

    onPlayPressed() {
        // var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        // this._executeQuery(query);
    
        // if (this.state.isPlaying) {
            
        // } else {
            // AudioPlayer.play('music/adorn_by_miguel.mp3');
        // }
    }
    // https://github.com/zmxv/react-native-sound
    // https://github.com/brentvatne/react-native-video - video

    render() {
        return (
            <View style={styles.container}>
                    <TouchableHighlight style={styles.button}
                        onPress={this.onPlayPressed.bind(this)}
                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Play</Text>
                    </TouchableHighlight>
            </View>
        );
    } 

	_executeQuery(query) {
        console.log('query', query);
        this.setState({ isLoading: true });

        fetch(query)
        	.then(response => response.json())
        	.then(json => this._handleResponse(json.response))
        	.catch(error =>
        		this.setState({
        			isLoading: false,
        			message: 'Victor crushed your pussy ' + error
        		}));
    }

    _handleResponse(response) {
    	this.setState({ 
    		isLoading: false,
    		message: ''
    	});

    	if (response.application_response_code.substr(0, 1) === '1') {
            this.props.navigator.push({
                title: 'Results',
                component: SearchResults,
                passProps: {listings: response.listings}
            });
    	} else {
    		this.setState({ message: 'Location not recognized; please try again.'});
    	}
    }
}

module.exports = AudioPlayerPage;