/*
	Note:
		1) There will be 1.5 secs delay before displaying the result (to avoid frequent callbacks, after every 'single digit' input)
		2) Newly entered unique values are not getting concatenated with existing predefined Array.
		   Eg: If the predefined array has values like 1000, 1001 & if the user enters 1002 then 1002 will not get concatenated
		       with existing 1000, 1001. So in the next iteration if the user again enters 1002, it will display the same result
               as before.	
		3) This program will throw an error for improper range.

*/

($(function() {
	
	var timer;
	
	// for animation
	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;	
	
	
	/* Data Component to store predefined data
	   It can be extendible to write functions to set or remove additional values in array
	*/
	var dataComponent = {
		
		// This function returns an Array i.e. predefined array, to check with.
		getPredefinedArrayToCheck: function() {
			return [7000,7001,7002,7003,7004,7005, 8000, 8001, 6000];
			
		}
		
	};
		
	// TextBox React component
	var TextBox = React.createClass({
		
		render: function() {
			return (
				<input type="text" placeholder="Enter comma separated numbers or range" className="input" onKeyUp={this.props.localHandleKeyUp} />
			)
		}
				
	});
	
	// Notification Box React component
	var Notification = React.createClass({
		getInitialState: function() {
			return {};
		},
		render : function() {
			
			// output will contain an object with 4 Arrays i.e. duplicate, unique, predefined & all unique values
			var output = this.props.updateNotification;
			
			// random number to specify different keys for animation i.e. to get different state
			var key = Math.random(100).toString();
			
			return (
			 <ReactCSSTransitionGroup transitionName="example" transitionAppear={true}>
				<div className="notification-wrapper" id="notificationBox" key={key}>
					<p> Predefined Array : </p><span id="current">{output.predefinedValsArr.join(', ')}</span><br /><hr />
					<p> Duplicate elements : </p><span id="duplicate">{output.duplicateValsArr.join(', ')}</span><br />
					<p> The new additions that were not present before : </p><span id="unique">{output.uniqueValsArr.join(', ')}</span><br />
					<p> All the unique numbers including new additions : </p><span id="allUnique">{output.allUniqueValsArr.join(', ')}</span><br />
				</div>
			 </ReactCSSTransitionGroup>
			)
		}
				
	});
	
	// Main React Component to bind TextBox & Notification React components
	var Main = React.createClass({
		
		getInitialState: function() {
			return {output:{
				predefinedValsArr: dataComponent.getPredefinedArrayToCheck(),
				duplicateValsArr: [],
				uniqueValsArr: [],
				allUniqueValsArr: []
			}};
		},
		/* This function is a callback handler of keyUp event.
		   It takes the values entered in the textbox by the user, passes & calls 'getDuplicateAndUniqueArrayValues'
		   function of logic Component(where all the processing gets performed).
		   And finally sets State with the values returned from the above function.
		
		*/
		handleKeyUp: function(e) {
			
			clearTimeout(timer);
			var val = e.target.value,
				self = this;
			var output;	
			
			// Timeout to hold the callback for 1500 ms.
			timer = setTimeout(function() {
				// output object contatining 4 Arrays gets returned from the function of logicComponent
				output = logicComponent.getDuplicateAndUniqueArrayValues(val);
				self.setState({output: output});
				
            }, 1500);
			
		},
		render : function() {
			return (
				<div>
					<TextBox localHandleKeyUp={this.handleKeyUp} />
					<Notification updateNotification={this.state.output} />
				</div>
			)
		}
			
	});
	
	// Execution starts here
	React.render(<Main/>, $('#inputWrapper').get(0));

	
	/* Logic Component to perform the processing of data.
	   It can be extendible to write other functions related to data processing or business logic.
	*/
	var logicComponent = {
		/* This function takes the user entered numbers i.e. in string form from input box.
		   It passes the string & calls 'splitStringToNumberArray' function to get the actual number array.
		   It also calls 'getPredefinedArrayToCheck' function of dataComponent to get the predefined
		   array.
		   It then performs the processing and returns an output object with 4 arrays i.e.
		   predefined values array, unique values array, duplicate values array, all unique 
		   values array
		*/
		getDuplicateAndUniqueArrayValues: function(userEnteredNumbersInStringForm) {
			
			// get the actual number array from the user entered string
			var numberArray = this.splitStringToNumberArray(userEnteredNumbersInStringForm);
			
			// get the predefined array
			var arrayToCheck = dataComponent.getPredefinedArrayToCheck();
		
			var objWrapper = {
				predefinedValsArr: arrayToCheck,
				duplicateValsArr: [],
				uniqueValsArr: [],
				allUniqueValsArr: []
			};
			
			/* It loops through each user entered elements, if it finds the element in predefined array it 
			   adds the element to 'duplicateValsArr' array or else to 'uniqueValsArr' array.
			*/
			numberArray.forEach(function(element, index){
			
				for (var i = 0, l = arrayToCheck.length; i < l; i++) {
					
					// it it finds the match in predefined array
					if (element === arrayToCheck[i]) {
						objWrapper.duplicateValsArr.push(element);
						break;
					} 
					
					// if it doesn't find the match in predefined array
					if (i === l-1) {
						objWrapper.uniqueValsArr.push(element);
					}
				}
			});
			
			/* 'allUniqueValsArr' array is the combination of predefined array & unique user entered elements,
				which were not there in predefined array.
			*/
			objWrapper.allUniqueValsArr = objWrapper.allUniqueValsArr.concat(arrayToCheck, objWrapper.uniqueValsArr);
			return objWrapper;
			
		},
		
		/* This function takes user entered input string & converts it to a number array.
		   If the string contains range, then it includes all the numbers from the range.
		   It returns the number array.
		*/
		splitStringToNumberArray: function (stringToSplit) {
			var numberArrayFromOriginalString = [];
			
			// for each comma separated element i.e. number 
			stringToSplit.split(',').forEach(function(element, index, array) {
				
				element = element.trim();
				
				// if its not a range, then add directly to the array
				if (element.indexOf('-') === -1) {
					
					var numberElement = Number(element);
					if (!(isNaN(numberElement))) {
						numberArrayFromOriginalString.push(numberElement);
						
					} else {
						throw new Error('Not a number');
					}
									
				// if its a range
				} else {
				
					var range1 = Number(element.split('-')[0]),
						range2 = Number(element.split('-')[1]);
						
					if (!(isNaN(range1)) && !(isNaN(range2))) {
						
						if (range1 < range2) {
							// parse through the range and add numbers
							for (var i = range1; i <= range2; i++ ) {
								numberArrayFromOriginalString.push(range1++);
							}
						
						// if the range is not proper, throw an error
						} else {
							throw new Error('Incorrect range');
						}	
						
					}  else {
						throw new Error('Improper range');
					}
								
				}
			});
			return numberArrayFromOriginalString;
		}
		
	};
		
}));
	


