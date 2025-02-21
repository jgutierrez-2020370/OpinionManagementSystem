import Category from '../category/category.model.js'
import Publication from './publication.model.js'

export const createPublication = async (req, res) => {
    try {
        let { category, ...data } = req.body
        
        if (!category) {
            const categoryDefault = await Category.findOne({ name: "default" })
            category = categoryDefault.id
        }

        const categoryData = await Category.findOne({ _id: category })

        if (!categoryData) {
            return res.status(404).send(
                {
                    success: false,
                    message: "Category not found"
                }  
            )
        }

        const publication = new Publication(
            {
                ...data,
                category: [categoryData.id],
                creator: [req.user.uid]
            }
        )

        await publication.save()

        const populatedPublication = await Publication.findById(publication.id)
            .populate('category', 'name')
            .populate('creator', 'userName')

        return res.status(200).send(
            {
                success: true,
                message: "Publication added successfully",
                publication: populatedPublication
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send({
                success: false,
                message: "General error creating a publication",
                err
            }
        )
    }
}



export const updatePublication = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const publication = await Publication.findById(id)
        if (!publication) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found'
                }
            )
        }

        if(publication.status == false){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found'
                }
            )
        }
        
        if (publication.creator.toString() !== req.user.uid) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'You are not allowed to update this publication'
                }
            )
        }

        if (data.category) {
            const categoryData = await Category.findById(data.category)
            if (!categoryData) {
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Category not found'
                    }
                )
            }
        }

        if (data.creator) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'Creator cannot be updated'
                }
            )
        }

        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )

        return res.send(
            {
                success: true,
                message: 'Publication updated successfully',
                updatedPublication
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updating publication',
                err
            }
        )
    }
}

export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params
        const publication = await Publication.findById(id)
        if (!publication) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found'
                }
            )
        }

        if (publication.status == false){
            return res.status(404).send(
                {
                    success: false,
                    message: 'The publication does not exist'
                }
            )
        }

        await Publication.findByIdAndUpdate(id, { status: false }, { new: true })
        return res.status(200).send(
            {
                success: true,
                message: 'Publication was deleted successfully'
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleting publication',
                err
            }
        )
    }
}

export const getPublications = async (req, res) => {
    try {
        
        const { limit = 20, skip = 0 } = req.query
        const publications = await Publication.find({status: true})
            .skip(skip)
            .limit(limit)
            .populate('category', 'name')
            .populate('creator', 'userName')
            .populate('commentaries', 'title description creator')

        if(publications.length == 0) return res.status(404).send(
            {
                success: false,
                message: 'Publications not found'
            }
        )

        return res.status(200).send(
            {
                success: true,
                publications,
                total: publications.length
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when getting publication',
                err
            }
        )
    }
}