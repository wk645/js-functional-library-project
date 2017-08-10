fi = function(){
	return {
		each: function(list, iteratee, context) {
			let callback = null

			if (context) {
				callback = iteratee.bind(context)
			} else {
				callback = iteratee
			}

			if (Array.isArray(list)) {
				for (let i = 0; i < list.length; i++) {
					callback(list[i], i, list)
			}} else if (typeof list === 'object') {
				for (const key in list) {
					const value = list[key]
					callback(value, key, list)
				}
			}
		
		},

		map: function(list, iteratee, context) {

			let callback = null
			if (context) {
				callback = iteratee.bind(context)
			} else {
				callback = iteratee
			}

			const newArray = []

			if (Array.isArray(list)) {
				for (let i = 0; i < list.length; i++) {
					newArray.push(callback(list[i], i, list))

				}} else if (typeof list === 'object') {

					for (const key in list) {
						const value = list[key]

					newArray.push(callback(value, key, list))

				}
			}

			return newArray
		},

		reduce: function(list, iteratee, memo, context) {
			let callback = null
			let newList = null
			let number = null 
			if (context) {
				callback = iteratee.bind(context)
			} else {
				callback = iteratee
			}

			if (memo) {
				newList = [memo].concat(list)
			} else {
				newList = list
			}

			if (Array.isArray(newList)) {
				number = newList[0]

				for (let i = 1; i < newList.length; i ++) {
					number = callback(number, newList[i], i, newList)
				}
			} else if (typeof newList === 'object') {

				let keys = Object.keys(newList)
				let values = Object.values(newList)
				number = values[0]

				for (let i = 1; i < values.length; i++) {
					number = callback(number, values[i], keys[i], newList)
				}
			}

			return number

		},

		find: function(list, predicate, context) {
			let callback = null
			let newList = null

			if (context) {
				callback = predicate.bind(context)
			} else {
				callback = predicate
			}

			if (Array.isArray(list)) {
				newList = list
			} else if (typeof list === 'object') {
				newList = Object.values(list)
			}

			for (i = 0; i < newList.length; i++) {
				if (predicate(newList[i])) {
					return newList[i]
				}
			}
		},

		filter: function(list, predicate, context) {


			let callback = null
			let newList = null

			if (context) {
				callback = predicate.bind(context)
			} else {
				callback = predicate
			}

			if (Array.isArray(list)) {
				newList = list
			} else if (typeof list === 'object') {
				newList = Object.values(list)
			}

			let newValues = []

			for (let i = 0; i < newList.length; i++) {
				if (predicate(newList[i])) {
					newValues.push(newList[i])
				}
			} 

			return newValues
		},

		sortBy: function(list, iteratee, context) {
			let callback = null
			let finalValues = []


			if (typeof iteratee === 'string') {

				let selectedValues = []
				let keys = Object.keys(list)
				let values = Object.values(list)
			

				for (let i = 0; i < list.length; i++) {
					selectedValues.push(list[i][iteratee])
				}

				let sortedValues = selectedValues.slice().sort()

				for (let i = 0; i < sortedValues.length; i++) {
					
					for (let j = 0; j < selectedValues.length; j++) {

						if (sortedValues[i] === selectedValues[j]) {

							finalValues.push(list[j])
							break
						}
					}
				}

			} else {
				
				if (context) {
			 		callback = iteratee.bind(context)
			 	} else {
			 		callback = iteratee
			 	}
			 	
			 	const mutatedValues = list.map(callback)

			 	// let pairedValues = []
			 	

			 	// for (let i = 0; i < list.length; i++) {
			 	// 	pairedValues.push({index: i, mutatedValue: mutatedValues[i]})
			 	// }

			 	let sortedMv = mutatedValues.slice().sort((a,b)=> (a-b))

			 	for (let i = 0; i < sortedMv.length; i++) {
			 		
			 		for (let j = 0; j < list.length; j++) {

			 			if (sortedMv[i] === mutatedValues[j]) {
			 				
			 				finalValues.push(list[j])
			 				break
			 			} 
			 		}
			 	}

			}

			return finalValues
		},

		size: function(list) {

			if (Array.isArray(list)) {
				return list.length
			} else {
				return Object.keys(list).length
			}
		},

		first: function(array, n) {

			if (n) {

				return array.slice(0, n)

			} else {
				
				return array[0]

			}
		},

		last: function(array, n) {

			if (n) {

				return array.slice(array.length - n)

			} else {

				return array[array.length-1]
			}
		},

		compact: function(array) {

			let finalArray = []

			for (let i = 0; i < array.length; i++) {

				if (array[i]) {

					finalArray.push(array[i])

				}
			}

			return finalArray
		},

		flatten: function(array, shallow) {
			let firstHalf = null
			let lastHalf = null
			let final = []
			let flattened = null
			let index = null

			if (shallow) {
				final = array

				foundArrays = final.filter((element) => Array.isArray(element))

				foundArrays.forEach( (element) => {
					index = final.findIndex( (e) => e === element)
					if ((index+1) === final.length) {
						final = final.slice(0, final.length-1).concat(final[index])
					} else {
						firstHalf = final.slice(0, index)
						lastHalf = final.slice(index+1)
						final = firstHalf.concat(final[index]).concat(lastHalf)
					}
				})

				return final
			} else {
				index = array.findIndex( (element) => Array.isArray(element))
				if (index >= 0){
					if ((index+1) === array.length) {
						final = array.slice(0, array.length-1).concat(array[index])
					} else {
						firstHalf = array.slice(0, index)
						lastHalf = array.slice(index+1)
						final = firstHalf.concat(array[index]).concat(lastHalf)
					}

					return this.flatten(final)
				} else {
					return array
				}
			}
		},

		uniq: function(array, isSorted, iteratee) {

			let finalResult = []

			if (isSorted) {

				for (let i = 0; i < array.length; i++) {

					if (finalResult[finalResult.length-1] !== array[i]) {
						finalResult.push(array[i])
					}
				}

			} else {

				for (let i = 0; i < array.length; i++) {

					if (!finalResult.includes(array[i])) {

						finalResult.push(array[i])

					}

				}

			}

			return finalResult

		},

		bind: function(func, object, n) {
			 var finalMethod = null

			object.func = func

			if (n){
				finalMethod = () => object.func(n);
			} else {
				finalMethod = val => object.func(val);
			}

			return finalMethod

		},

		keys: function(object) {

		let keyArray = []

			for (const key in object) {

				keyArray.push(key)

			}

			return keyArray

		},

		values: function(object) {

			let valueArray = []

			for (const key in object) {

				valueArray.push(object[key])

			}

			return valueArray
		},

		functions: function(fi) {

			return Object.getOwnPropertyNames(fi).sort()

		}

	}

}()

