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
        ).populate('category', 'name -_id').populate('commentaries', 'title description creator')



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

        const updatedCommentary = Commentary.findByIdAndUpdate(

            id,
            data,
            { new: true }
        )

        return res.send(
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