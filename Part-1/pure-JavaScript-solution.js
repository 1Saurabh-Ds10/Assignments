/*
	Note:
		1) There will be 1.5 secs delay before displaying the result (to avoid frequent callbacks, after every 'single digit' input)
		2) Newly entered unique values are not getting concatenated with existing predefined Array.
		   Eg: If the predefined array has values like 1000, 1001 & if the user enters 1002 then 1002 will not get concatenated
		       with existing 1000, 1001. So in the next iteration if the user again enters 1002, it will display the same result
               as before.			   
		3) This program will throw an error for improper range.
*/

(function() {
	
	'use strict';	
	
	// This function returns an Array i.e. predefined array, to check with.	
	function getPredefinedArrayToCheck() {
		
		return [7000,7001,7002,7003,7004,7005, 8000, 8001, 6000];
	}
	
	console.log(getDuplicateAndUniqueArrayValues(' 7000 , 6000 , 8000 - 8005 ' ));
	
	/* This function takes the user entered numbers i.e. in string form.
	   It passes the string & calls 'splitStringToNumberArray' function to get the actual number array.
	   It also calls 'getPredefinedArrayToCheck' function to get the predefined array.
	   It then performs the processing and returns an output object with 4 arrays i.e.
	   predefined values array, unique values array, duplicate values array, all unique 
	   values array
	*/
	function getDuplicateAndUniqueArrayValues(userEnteredNumbersInStringForm) {
		
		// get the actual number array from the user entered string
		var numberArray = splitStringToNumberArray(userEnteredNumbersInStringForm);
		
		// get the predefined array
		var arrayToCheck = getPredefinedArrayToCheck();
		
		var objWrapper = {
			predefinedValsArr: arrayToCheck,
			duplicateValsArr: [],
			uniqueValsArr: []
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
		objWrapper.allUniqueValsArr = objWrapper.allUniqueValsArr.concat(objWrapper.predefinedValsArr, objWrapper.uniqueValsArr);
		return objWrapper;
	}
	
	/* This function takes user entered input string & converts it to a number array.
	   If the string contains range, then it includes all the numbers from the range.
	   It returns the number array.
	*/
	function splitStringToNumberArray(stringToSplit) {
		
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
	
		
})();
