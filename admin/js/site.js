/**
 * Copyright (c) 2011 Dimitar Jilanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * Date: 03 12 2013
 *
 */
 // activated on flag click of the navigation
 function onFlagClick() {
 	debugger;
 }
 function implementClickEvents(){
 	$('.flag').click(onFlagClick);
 }
// sort the array and remove undefined elements
function sortAndClear(array) {
	// we sort the array
	array.sort();
	// we clear undefined elements from the array
	for(var elementCounter = array.length - 1; elementCounter >= 0; elementCounter--) {
		if(array[elementCounter] === undefined){
			array.pop();
		} else {
			break;
		}
	}
}
