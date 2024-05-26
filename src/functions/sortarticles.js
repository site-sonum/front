export const sortArticles = (articles, exclude) => {

    let datesList = []
    let mostRecentArticles = []

    articles.forEach((category,index)=>{
        category.data.forEach(data=>{
            if (exclude.indexOf(index)==-1) datesList.push(data.attributes.updatedAt)
        })
    })

    datesList = datesList.sort((a,b)=> new Date(b) - new Date(a))

    for(let i = 0 ; i < datesList.length ; i++){
        articles.forEach(category=>{
            category.data.forEach(data=>{
                if (data.attributes.updatedAt === datesList[i])
                    mostRecentArticles.push(data.attributes)
            })
        })
    }


    return mostRecentArticles
} 