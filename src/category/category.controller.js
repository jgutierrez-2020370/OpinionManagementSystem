import Category from "../category/category.model.js" 

export const defaultCategory = async () => {
    try {
        const defaultCategory = await Category.findOne({ name: 'default' })

        if (!defaultCategory) {
            const newCategory = new Category(
                {
                    name: 'default',
                    description: 'Default category for unclassified commentaries'
                }
            )
            await newCategory.save() 
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error whit default category',
                err
            }
        )
    }
}

export const createCategory = async(req, res) =>{
    try {
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error creating a category',
                err
            }
        )
    }
}