import UploadImageService from '../uploadImageService'

describe('Upload Image', () => {
    test('holds an object', () => {
        expect(UploadImageService).toBeDefined()
    })

    test('uploads an image', () => {
        expect.assertions(2)
        
        const file = 'C:/Coding/_drafts/Garibaldi/src/utils/services/__test__/IMG_1561.JPG'

        return UploadImageService.uploadFile(file)
            .then(result => {
                expect(result).toBeDefined()
                expect(result.secure_url).toMatch(/https/)
            })
    })
})
