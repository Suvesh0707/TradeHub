import fs from 'fs'

export const deleteFile = async(filePath) =>{
    try {
        await fs.unlinkSync(filePath)
    } catch (error) {
        await fs.unlinkSync(filePath)
        return null;
    }
}