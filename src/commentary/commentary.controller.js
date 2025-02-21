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
        )



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