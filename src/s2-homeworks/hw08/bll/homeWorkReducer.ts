import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            const sortByName = (a: UserType, b: UserType) => {
                if (a.name > b.name) {
                    return 123
                } else {
                    return -123
                }
            }
            const newState: UserType[] = [...state]
            if (action.payload === 'up') {
                return newState.sort(sortByName) // need to fix
            } else {
                return newState.sort(sortByName).reverse()
            }
        }
        case 'check': {
            // const sortByAge = (a: UserType, b: UserType) => {
            //     return a.age > b.age ? 1 : -1
            // }
            const newState: UserType[] = state.filter(u => {
               return  u.age >= 18
            })
            // return newState.sort(sortByAge) // need to fix
            return newState
        }

        default:
            return state
    }
}
