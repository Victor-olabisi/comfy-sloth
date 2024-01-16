export const formatPrice = () => {}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])
    if (type == "colors") {
        unique = unique.flat();
    
    }
    unique = ['all', ... new Set(unique)]
   
    return unique
}
