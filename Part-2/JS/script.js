/*
	Note:
	
	1) This program is case sensitive i.e. 'JavaScript' & its rotated counterpart 'scriptjava' will return false.
	2) If the values passed are falsy then program will throw an error.
	3) If the values entered are other then string, it will convert the values to string.
		i.e. '12345' & 51234 will return true.
	4) This program doesn't trim the string with extra leading or trailing space.
	5) If the string & rotatedString both are equal i.e. 0 rotation, it will return false.

*/

'use strict';

$(function(){
	
	var wrapper = {
		
		/* This function binds jQuery object wrapped DOM elements with this object's properties for caching.
		   It also binds click event to the button.
		   This function doesn't return anything.
		*/
		init: function() {
			
			// cache jQuery Obj wrapped DOM
			this.$actualInput =  $('#actualString');
			this.$rotatedInput = $('#rotatedString');
			this.$resultBox = $('#result').val('');
				
			$('#btnResult').on('click', this.checkIfStringRotated.bind(this));
		},
		
		/* This function checks if 'rotatedString' is actually a rotation of 'originalString' or not.
		   It calls 'displayResult' function with true or false parameter to finally display the
		   result.
		   This function also returns either true or false after finding rotation to stop the further execution.
		*/
		checkIfStringRotated: function(e, originalString, rotatedString) {
			
			e.preventDefault();
			
			originalString = originalString || this.$actualInput.val();
			rotatedString = rotatedString || this.$rotatedInput.val();
			
			if ((originalString) && (rotatedString)) {
			
				// if its not a string, convert it to a string & extra spaces not trimmed
				var originalTempStr = (typeof originalString === 'string' || (originalString instanceof String))
						      ? originalString /*.toLowerCase() */ : originalString.toString(); 
			
				var rotatedTempString = (typeof rotatedString === 'string' || (rotatedString instanceof String))
						        ? rotatedString /*.toLowerCase() */ : rotatedString.toString();
			
				// if both strings are of different length or both strings are Same
				if ((originalTempStr.length !== rotatedTempString.length) 
						|| 	(originalTempStr === rotatedTempString)) {
					// then its not a rotation		
					this.displayResult(false);	
					return false;
				
				}
				for (var i = 0, l = originalTempStr.length; i < l; i++) {
					
					var isRotated = false;
					
					// start with the position of first matched character 
					if (originalTempStr.charAt(0) === rotatedTempString.charAt(i)) {
						
						var temp = i;
						for (var j = 0; j < l; j++ ) {
							
							/* if all other characters of 2nd string match with the first string - in chain
							   i.e. one after another - by continuing till end and again starting from beginning, 
							   then the 2nd string is a rotation of first string
							*/
							isRotated = (originalTempStr.charAt(j) === rotatedTempString.charAt(temp))
									? true : false;
													
							if (temp < l-1) {
								temp++;
							} else {
								temp = 0;
							}
						
							// optimized
							if (!(isRotated)) {
								break;
							}
						}
						
						// string is rotated
						if (isRotated) {
							this.displayResult(true);
							return true;
						} 
					}
				}
				
				this.displayResult(false); 		
				return false;
			
			// for falsy values, throw an error 
			} else {
				throw new Error('passed parameter is not a string');
			
			}
		},
		/* This function takes 'result' parameter i.e. either true or false & accordingly displays the result.
		   This function does not return anything.
		*/
		displayResult: function(result) {
			var self = this;
			if (result) {
				// animate the result field 
				this.$resultBox.removeClass().val('').fadeOut('fast').delay('300').fadeIn('fast', function(){
					// 'Success' class to display success result in green
					self.$resultBox.addClass('success').val('Its a rotation');
					
				});
				
			} else {
				
				this.$resultBox.removeClass().val('').fadeOut('fast').delay('300').fadeIn('fast', function(){
					// 'notSuccess' class to display non-success result in red
					self.$resultBox.addClass('notSuccess').val('NOT a rotation')
				});
			}
			
		}
		
	}
	
	// Execution starts here
	wrapper.init();
});
