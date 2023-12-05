
 export const initialState = {

    basket : [],
    user : null,
};


const reducer= (state , action)=>{
    console.log(action);
    switch(action.type){

        case "SET_USER":
            return{
                ...state,
                user : action.user,
            }

      case "ADD_TO_BASKET" : 
       return {
           ...state,
           
           basket :[...state.basket , action.item]
        
       }
       case "REMOVE_FROM_BASKET":
        const index = state.basket.findIndex((element)=>
            element.id===action.id);
            let newBasket =[ ...state.basket]
            if (index >= 0){

                newBasket.splice(index,1)

            }
   


        return{
            ...state,
             basket: newBasket

        }
       
        case "EMPTY_BASKET" :
         
            return {

                ...state, 
             basket:[]
            }
       }
       
}

export default reducer ;