export const getSearchSuggestion = async (value:string) =>{
    try{
        const response = await fetch(`/api/get/getUsersuggestions?search=${value}`)
        const data = await response.json()
        if(data.status==="success"){
            return data.message
        }
        else{
            return []
        }
    }catch(err){
        console.error(err)
    }
}