import Publication from '../publication/publication.model.js'
import Commentary from './commentary.model.js'

export const createCommentary = async (req, res) => {
    try {
        const { ...data } =  req.body
        const { id } = req.params
        
        const publication = await Publication.findById(id)

        if (!publication) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not found',
                }
            )
        }
        
        const commentary = new Commentary(
            {
                ...data,
                creator: req.user.uid
            }
        )
        await commentary.save()
        
        const updatePublication = await Publication.findByIdAndUpdate(        
            id,
            { $push: { commentaries: commentary._id } },
            { new: true }
        ).populate('category', 'name -_id')
        .populate({
            path: 'commentaries',
            select: 'title description creator',
            populate: {
                path: 'creator',
                select: 'userName -_id'
            }
        })
        .populate('creator', 'userName -_id')



        return res.status(200).send(
            {
                success: true,
                message: 'Commentary created successfully',
                updatePublication
            }
        )


    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when creating commentary',
                err
            }
        )
    }
}

export const updateCommentary = async(req,res)=>{
    try {
        const { id } = req.params
        const data = req.body

        const commentary = await Commentary.findById(id)
        if(!commentary) {
            res.status(404).send(
                {
                    succes: false,
                    message: 'Commentary not found'
                }
            )
        }

        if (commentary.creator.toString() !== req.user.uid) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'You are not allowed to update this commentary'
                }
            )
        }
        
        const updatedCommentary = await Commentary.findByIdAndUpdate(
            id,
            data,
            { new : true }
        ).populate('creator', 'userName')
        

        return res.status(200).send(
            {
                success: true,
                message: 'Commentary updated successfully',
                updatedCommentary
            }
        )
         
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when editing commentary',
                err
            }
        )
    }
}

export const getMyCommentaries = async (req, res) => {
    try {
        
        const { limit = 20, skip = 0 } = req.query
        const Commentaries = await Commentary.find(
            {
                status: true,
                creator: req.user.uid
            }
        )
            .skip(skip)
            .limit(limit)
            .populate('creator', 'userName -_id')

        if(Commentaries.length == 0) return res.status(404).send(
            {
                success: false,
                message: 'Commentaries not found'
            }
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Your Commentaries:',
                Commentaries,
                total: Commentaries.length
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when getting Commentaries',
                err
            }
        )
    }
}

export const deleteCommentary = async (req, res) => {
    try {
        const { id } = req.params

        const commentary = await Commentary.findById(id)
        if (!commentary) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Commentary not found'
                }
            )
        }

        if (commentary.status === false) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Commentary not found'
                }
            )
        }

        if (commentary.creator.toString() !== req.user.uid) {
            return res.status(403).send(
                {
                    success: false,
                    message: 'You are not allowed to delete this commentary'
                }
            )
        }

        const updatedCommentary = await Commentary.findByIdAndUpdate(
            id,
            { status: false },
            { new: true }
        )

        await Publication.updateMany(
            { commentaries: id },
            { $pull: { commentaries: id } }
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Commentary was deleted successfully',
                updatedCommentary
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleting commentary',
                err
            }
        )
    }
}
