fi = function(){
	return {
		each: function(list, iteratee, context) {

			if (context) {
				const callback = iteratee.bind(context)
			} else {
				const callback = iteratee
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

			if (context) {
				const callback = iteratee.bind(context)
			} else {
				const callback = iteratee
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

			if (context) {
				const callback = iteratee.bind(context)
			} else {
				const callback = iteratee
			}

			if (memo) {
				const newList = [memo].concat(list)
			} else {
				const newList = list
			}

			if (Array.isArray(newList)) {
				let number = newList[0]

				for (let i = 1; i < newList.length; i ++) {
					number = callback(number, newList[i], i, newList)
				}
			} else if (typeof newList === 'object') {

				let keys = Object.keys(newList)
				let values = Object.values(newList)
				let number = values[0]

				for (let i = 1; i < values.length; i++) {
					number = callback(number, values[i], keys[i], newList)
				}
			}

			return number

		},

		find: function(list, predicate, context) {
			
			if (context) {
				const callback = predicate.bind(context)
			} else {
				const callback = predicate
			}

			if (Array.isArray(list)) {
				let newList = list
			} else if (typeof list === 'object') {
				let newList = Object.values(list)
			}

			for (i = 0; i < newList.length; i++) {
				if (predicate(newList[i])) {
					return newList[i]
				}
			}
		},

		filter: function(list, predicate, context) {

			if (context) {
				const callback = predicate.bind(context)
			} else {
				const callback = predicate
			}

			if (Array.isArray(list)) {
				let newList = list
			} else if (typeof list === 'object') {
				let newList = Object.values(list)
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

			if (typeof iteratee === 'string') {

			let selectedValues = []
			let keys = Object.keys(list)
			let values = Object.values(list)
			let finalValues

				for (let i = 0; i < list.length; i++) {
					selectedValues.push(list[i][iteratee])
				}

				let sortedValues = selectedValues.sort()

				for (let i = 0; i < sortedValues.length; i++) {
					
					for (let j = 0; i < selectedValues.length; i++) {

						if (sortedValues[i] === list[j][iteratee]) {

							finalValues.push(list[j])
							break
						}
					}
				}

			} else {
				
				if (context) {
			 		const callback = iteratee.bind(context)
			 	} else {
			 		const callback = iteratee
			 	}
			 	
			 	const mutatedValues = list.map(callback(element, i, list))

			 	// let pairedValues = []
			 	let finalValues = []

			 	// for (let i = 0; i < list.length; i++) {
			 	// 	pairedValues.push({index: i, mutatedValue: mutatedValues[i]})
			 	// }

			 	let sortedMv = mutatedValues.sort()
			 	let sortedIndex

			 	for (let i = 0; i < sortedMv.length; i++) {
			 		
			 		for (let j = 0; j < list.length; j++) {

			 			if (sortedMv[i] === list[j].mutatedValue) {
			 				
			 				finalValues.push(list[j])
			 				break
			 			} 
			 		}
			 	}

			}

			return finalValues
		},

		size: function(list) {

			return list.length
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

				return array[-1]
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

		// flatten: function(array, shallow) {

		// },

		uniq: function(array, isSorted, iteratee) {

			let finalResult = []

			if (isSorted) {

				for (let i = 0; i < array.length; i++) {

					if (finalResult[-1] !== array[i]) {

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

		// bind: function(func, object) {

		// object.func = func
		// return object.func

		// },

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

