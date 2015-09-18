/*
	Note:
	
	1) This program is case sensitive i.e. 'JavaScript' & its rotated counterpart 'scriptjava' will return false.
	2) If the values passed are falsy then program will throw an error.
	3) If the values entered are other then string, it will convert the values to string.
		i.e. '12345' & 51234 will return true.
	4) This program doesn't trim the string with extra leading or trailing space.
	5) If the string & rotatedString both are equal i.e. 0 rotation, it will return false.

*/

(function() {
	
	'use strict';	
	
	/* Testing Parameters */

	var string1 = 'Stringsz zoos';
	var rotatedString = 'sz zoosString';
	
	
	console.log(checkIfStringRotated(string1, rotatedString));
	
	/* This function checks if 'rotatedString' is actually a rotation of 'originalString' or not.
	   This function also returns either true or false after finding rotation to stop the further execution.
	*/
	function checkIfStringRotated(originalString, rotatedString) {
		
		if ((originalString) && (rotatedString)) {
			
			// if its not a string, convert it to a string & extra spaces not trimmed
			var originalTempStr = (typeof originalString === 'string' || (originalString instanceof String))
								? originalString /*.toLowerCase() */ : originalString.toString(); 
			
			var rotatedTempString = (typeof rotatedString === 'string' || (rotatedString instanceof String))
								? rotatedString /*.toLowerCase() */ : rotatedString.toString();  // no string space trimming
			
			// if both strings are of different length or both strings are Same
			if ((originalTempStr.length !== rotatedTempString.length) 
				|| 	(originalTempStr === rotatedTempString)) {
				// then its not a rotation
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
						return true;
					
					} 
				}
			}
			 		
			return false;
		
		// for falsy values, throw an error 	
		} else {
			throw new Error('passed parameter is not a string');
		
		}
		
	}

})();

